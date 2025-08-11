import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getAllCandleTypesForAdmin,
  addCandleType,
  updateCandleType,
  deleteCandleType,
} from "../../services/candleType";
import { FormField, FormButtons } from "../../components/admin/FormComponents";
import SingleFileUploadField from "../../components/admin/SingleFileUploadField";
import {
  showSuccessToast,
  createErrorHandler,
} from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";
import type { CandleType } from "../../types/candleType";

const validationSchema = Yup.object({
  name: Yup.string().min(1).max(100).required("Name is required"),
  image: Yup.mixed(),
  isActive: Yup.boolean(),
});

export default function AdminCandleTypePage() {
  const [candleTypes, setCandleTypes] = useState<CandleType[]>([]);
  const [editingCandleType, setEditingCandleType] = useState<CandleType | null>(
    null
  );

  useEffect(() => {
    loadCandleTypes();
  }, []);

  const loadCandleTypes = async () => {
    try {
      const data = await getAllCandleTypesForAdmin();
      setCandleTypes(data);
    } catch (error) {
      console.error("Failed to load candle types:", error);
    }
  };

  const handleSubmit = async (
    values: { name: string; image?: File; isActive: boolean },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (editingCandleType) {
        const payload: { name: string; isActive: boolean; image?: File } = {
          name: values.name,
          isActive: values.isActive,
        };
        if (values.image) payload.image = values.image;

        await updateCandleType(editingCandleType._id, payload);
        showSuccessToast(MESSAGES.SUCCESS.UPDATE_SUCCESS);
        setEditingCandleType(null);
      } else {
        if (!values.image) {
          throw new Error("Image is required for new candle type");
        }
        await addCandleType({
          name: values.name,
          image: values.image,
          isActive: values.isActive,
        });
        showSuccessToast(MESSAGES.SUCCESS.CREATE_SUCCESS);
      }
      resetForm();
      loadCandleTypes();
    } catch (error) {
      createErrorHandler("Failed to save candle type")(error);
    }
  };

  const handleEdit = (candleType: CandleType) => {
    setEditingCandleType(candleType);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this candle type?")) {
      try {
        await deleteCandleType(id);
        showSuccessToast(MESSAGES.SUCCESS.DELETE_SUCCESS);
        loadCandleTypes();
      } catch (error) {
        createErrorHandler("Failed to delete candle type")(error);
      }
    }
  };

  const handleCancel = () => {
    setEditingCandleType(null);
  };

  return (
    <div className={CSS_CLASSES.CONTAINER}>
      <h1 className={CSS_CLASSES.TITLE}>Candle Types Management</h1>

      <Formik
        initialValues={{
          name: editingCandleType?.name || "",
          image: undefined as File | undefined,
          isActive: editingCandleType?.isActive ?? true,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={CSS_CLASSES.FORM}>
            <FormField
              name="name"
              label="Name"
              placeholder="Enter candle type name"
            />

            <SingleFileUploadField
              name="image"
              label="Image"
              accept="image/*"
              required={!editingCandleType}
              onFileChange={(file: File | null) => setFieldValue("image", file)}
            />

            <div className={CSS_CLASSES.CHECKBOX_CONTAINER}>
              <label className={CSS_CLASSES.CHECKBOX_LABEL}>
                <input
                  type="checkbox"
                  checked={values.isActive}
                  onChange={(e) => setFieldValue("isActive", e.target.checked)}
                  className={CSS_CLASSES.CHECKBOX}
                />
                Active
              </label>
            </div>

            <FormButtons
              isEditing={!!editingCandleType}
              onCancel={handleCancel}
            />
          </Form>
        )}
      </Formik>

      <div className={CSS_CLASSES.LIST_CONTAINER}>
        <h2 className={CSS_CLASSES.SUBTITLE}>Existing Candle Types</h2>
        {candleTypes.length === 0 ? (
          <p className={CSS_CLASSES.NO_DATA}>No candle types found.</p>
        ) : (
          <div className={CSS_CLASSES.GRID}>
            {candleTypes.map((candleType) => (
              <div key={candleType._id} className={CSS_CLASSES.CARD}>
                <div className={CSS_CLASSES.CARD_IMAGE_CONTAINER}>
                  <img
                    src={candleType.image}
                    alt={candleType.name}
                    className={CSS_CLASSES.CARD_IMAGE}
                  />
                </div>
                <div className={CSS_CLASSES.CARD_CONTENT}>
                  <h3 className={CSS_CLASSES.CARD_TITLE}>{candleType.name}</h3>
                  <p className={CSS_CLASSES.CARD_STATUS}>
                    Status: {candleType.isActive ? "Active" : "Inactive"}
                  </p>
                  <div className={CSS_CLASSES.CARD_ACTIONS}>
                    <button
                      onClick={() => handleEdit(candleType)}
                      className={CSS_CLASSES.BUTTON_EDIT}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(candleType._id)}
                      className={CSS_CLASSES.BUTTON_DELETE}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
