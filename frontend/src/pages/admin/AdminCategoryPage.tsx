import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";
import type {
  AddCategoryPayload,
  UpdateCategoryPayload,
} from "../../services/category";
import {
  FormField,
  ActionButtons,
  SubmitButton,
} from "../../components/admin/FormComponents";
import {
  showSuccessToast,
  createErrorHandler,
} from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";
import type { Category } from "../../types/category";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_CATEGORIES)(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      showSuccessToast(MESSAGES.SUCCESS.CATEGORY_DELETED);
      fetchCategories();
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.DELETE_CATEGORY)(error);
    }
  };

  const initialValues = {
    name: "",
    description: "",
    flowerImage: null as File | null,
    flowerAnimation: null as File | null,
    miniatureImage: null as File | null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_CATEGORY_NAME),
    description: Yup.string(),
    flowerImage: Yup.mixed().nullable(),
    flowerAnimation: Yup.mixed().nullable(),
    miniatureImage: Yup.mixed().nullable(),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    try {
      if (editingCategory) {
        const payload: UpdateCategoryPayload = {
          name: values.name,
          description: values.description,
          flowerImage: values.flowerImage || undefined,
          flowerAnimation: values.flowerAnimation || undefined,
          miniatureImage: values.miniatureImage || undefined,
        };
        await updateCategory(editingCategory._id, payload);
        showSuccessToast(MESSAGES.SUCCESS.CATEGORY_UPDATED);
      } else {
        const payload: AddCategoryPayload = {
          name: values.name,
          description: values.description,
          flowerImage: values.flowerImage || undefined,
          flowerAnimation: values.flowerAnimation || undefined,
          miniatureImage: values.miniatureImage || undefined,
        };
        await addCategory(payload);
        showSuccessToast(MESSAGES.SUCCESS.CATEGORY_ADDED);
      }
      fetchCategories();
      resetForm();
      setEditingCategory(null);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.SAVE_CATEGORY)(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Керування категоріями</h1>

      <Formik
        initialValues={
          editingCategory
            ? {
                name: editingCategory.name,
                description: editingCategory.description || "",
                flowerImage: null,
                flowerAnimation: null,
                miniatureImage: null,
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="mb-6">
            <FormField name="name" label="Назва категорії" type="text" />
            <FormField name="description" label="Опис (subtitle)" type="text" />
            <div className="mb-4">
              <label className="block mb-1 font-medium">Картинка квітки</label>
              <input
                name="flowerImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue(
                    "flowerImage",
                    e.currentTarget.files?.[0] || null
                  )
                }
              />
              {editingCategory?.flowerImage && (
                <div className="mt-2">
                  <img
                    src={editingCategory.flowerImage}
                    alt="flower"
                    style={{ maxWidth: 120, maxHeight: 80 }}
                  />
                </div>
              )}
              <ErrorMessage
                name="flowerImage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Анімація квітки (відео)
              </label>
              <input
                name="flowerAnimation"
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFieldValue(
                    "flowerAnimation",
                    e.currentTarget.files?.[0] || null
                  )
                }
              />
              {editingCategory?.flowerAnimation && (
                <div className="mt-2">
                  <video
                    src={editingCategory.flowerAnimation}
                    controls
                    style={{ maxWidth: 120, maxHeight: 80 }}
                  />
                </div>
              )}
              <ErrorMessage
                name="flowerAnimation"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Мініатюра квіточки (для мапи)
              </label>
              <input
                name="miniatureImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue(
                    "miniatureImage",
                    e.currentTarget.files?.[0] || null
                  )
                }
              />
              {editingCategory?.miniatureImage && (
                <div className="mt-2">
                  <img
                    src={editingCategory.miniatureImage}
                    alt="miniature"
                    style={{ maxWidth: 60, maxHeight: 40 }}
                  />
                </div>
              )}
              <ErrorMessage
                name="miniatureImage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <SubmitButton isEditing={!!editingCategory} />
          </Form>
        )}
      </Formik>

      <div>
        {categories.map((category) => (
          <div key={category._id} className={CSS_CLASSES.CARD}>
            <div className="flex flex-col gap-1">
              <span>
                <b>Назва:</b> {category.name}
              </span>
              {category.description && (
                <span>
                  <b>Опис:</b> {category.description}
                </span>
              )}
              {category.flowerImage && (
                <span>
                  <b>Картинка:</b>{" "}
                  <img
                    src={category.flowerImage}
                    alt="flower"
                    style={{
                      maxWidth: 80,
                      maxHeight: 50,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              )}
              {category.miniatureImage && (
                <span>
                  <b>Мініатюра:</b>{" "}
                  <img
                    src={category.miniatureImage}
                    alt="miniature"
                    style={{
                      maxWidth: 40,
                      maxHeight: 30,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              )}
              {category.flowerAnimation && (
                <span>
                  <b>Анімація:</b>{" "}
                  <video
                    src={category.flowerAnimation}
                    controls
                    style={{
                      maxWidth: 80,
                      maxHeight: 50,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              )}
            </div>
            <ActionButtons
              onEdit={() => setEditingCategory(category)}
              onDelete={() => handleDelete(category._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
