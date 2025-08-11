import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import css from "./PlantFlowerForm.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import { useTranslation } from "react-i18next";

function FormSyncComponent({
  onFormChange,
}: {
  onFormChange: (values: {
    name: string;
    age: string;
    location: string;
    title: string;
    comment: string;
    audio: File | null;
    photo: File | null;
    video: File | null;
    consent: boolean;
    sensitive: boolean;
  }) => void;
}) {
  const { values } = useFormikContext<PlantFlowerFormValues>();

  useEffect(() => {
    onFormChange({
      name: values.name,
      age: values.age,
      location: values.location,
      title: values.title,
      comment: values.comment,
      audio: values.audio,
      photo: values.photo,
      video: values.video,
      consent: values.consent,
      sensitive: values.sensitive,
    });
  }, [values, onFormChange]);

  return null;
}

type PlantFlowerFormValues = {
  name: string;
  age: string;
  location: string;
  title: string;
  comment: string;
  audio: File | null;
  photo: File | null;
  video: File | null;
  consent: boolean;
  sensitive: boolean;
  category: string;
};

type Props = {
  selectedCategoryId: string;
  storyId: string;
  initialValues: {
    name: string;
    age: string;
    location: string;
    title: string;
    comment: string;
    audio: File | null;
    photo: File | null;
    video: File | null;
    consent: boolean;
    sensitive: boolean;
  };
  onFormChange: (values: {
    name: string;
    age: string;
    location: string;
    title: string;
    comment: string;
    audio: File | null;
    photo: File | null;
    video: File | null;
    consent: boolean;
    sensitive: boolean;
  }) => void;
  onSubmit: (
    values: PlantFlowerFormValues,
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => void | Promise<void>;
};

export default function PlantFlowerForm({
  selectedCategoryId,
  storyId,
  initialValues,
  onFormChange,
  onSubmit,
}: Props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().max(100, t("garden.plantForm.validation.nameMax")),
    age: Yup.number()
      .min(0, t("garden.plantForm.validation.ageMin"))
      .max(120, t("garden.plantForm.validation.ageMax"))
      .integer(t("garden.plantForm.validation.ageInteger"))
      .nullable(),
    location: Yup.string().max(
      200,
      t("garden.plantForm.validation.locationMax")
    ),
    title: Yup.string()
      .required(t("garden.plantForm.validation.titleRequired"))
      .min(3, t("garden.plantForm.validation.titleMin"))
      .max(100, t("garden.plantForm.validation.titleMax")),
    comment: Yup.string().max(
      2000,
      t("garden.plantForm.validation.commentMax")
    ),
    audio: Yup.mixed().nullable(),
    photo: Yup.mixed().nullable(),
    video: Yup.mixed().nullable(),
    consent: Yup.boolean().oneOf(
      [true],
      t("garden.plantForm.validation.consentRequired")
    ),
    sensitive: Yup.boolean(),
    category: Yup.string().required(
      t("garden.plantForm.validation.categoryRequired")
    ),
  });

  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={{
            ...initialValues,
            category: selectedCategoryId,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values, {
              audio: values.audio,
              photo: values.photo,
              video: values.video,
            });
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => {
            return (
              <Form className={css.formWrapper}>
                <FormSyncComponent onFormChange={onFormChange} />
                <h2 className={css.title}>{t("garden.plantForm.title")}</h2>
                <div className={css.form}>
                  <div className={css.row}>
                    <Field
                      name="name"
                      placeholder={t("garden.plantForm.name")}
                      className={css.input}
                    />
                    <Field
                      name="age"
                      type="number"
                      placeholder={t("garden.plantForm.age")}
                      className={css.input}
                      value={undefined}
                      // Let Formik handle value, but ensure never null
                      // If you want to control, use render prop or custom input
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.error}
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className={css.error}
                  />

                  <Field
                    name="location"
                    placeholder={t("garden.plantForm.location")}
                    className={css.input}
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className={css.error}
                  />

                  <Field
                    name="title"
                    placeholder={`${t("garden.plantForm.storyTitle")} *`}
                    className={css.input}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={css.error}
                  />

                  <Field
                    name="comment"
                    as="textarea"
                    placeholder={t("garden.plantForm.comment")}
                    className={css.textarea}
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className={css.error}
                  />

                  <div className={css.mediaRow}>
                    <label
                      className={`${css.mediaBtn} ${
                        values.audio ? css.mediaBtnAdded : ""
                      }`}
                    >
                      {values.audio
                        ? t("mediaUpload.audioAdded")
                        : t("mediaUpload.audio")}
                      <img
                        src="/plus-media.png"
                        alt="Add file"
                        className={css.mediaIcon}
                      />
                      <input
                        type="file"
                        accept="audio/*"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setFieldValue(
                            "audio",
                            e.currentTarget.files?.[0] || null
                          )
                        }
                      />
                    </label>
                    <label
                      className={`${css.mediaBtn} ${
                        values.photo ? css.mediaBtnAdded : ""
                      }`}
                    >
                      {values.photo
                        ? t("mediaUpload.photoAdded")
                        : t("mediaUpload.photo")}
                      <img
                        src="/plus-media.png"
                        alt="Add file"
                        className={css.mediaIcon}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setFieldValue(
                            "photo",
                            e.currentTarget.files?.[0] || null
                          )
                        }
                      />
                    </label>
                    <label
                      className={`${css.mediaBtn} ${
                        values.video ? css.mediaBtnAdded : ""
                      }`}
                    >
                      {values.video
                        ? t("mediaUpload.videoAdded")
                        : t("mediaUpload.video")}
                      <img
                        src="/plus-media.png"
                        alt="Add file"
                        className={css.mediaIcon}
                      />
                      <input
                        type="file"
                        accept="video/*"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setFieldValue(
                            "video",
                            e.currentTarget.files?.[0] || null
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className={css.checkboxRow}>
                  <label className={css.checkboxLabel} htmlFor="consent">
                    <Field
                      id="consent"
                      type="checkbox"
                      name="consent"
                      className={css.checkboxInput}
                    />
                    <div className={css.customCheckbox}></div>
                    {t("garden.plantForm.consent")}
                  </label>
                  <ErrorMessage
                    name="consent"
                    component="div"
                    className={css.error}
                  />
                  <label className={css.checkboxLabel} htmlFor="sensitive">
                    <Field
                      id="sensitive"
                      type="checkbox"
                      name="sensitive"
                      className={css.checkboxInput}
                    />
                    <div className={css.customCheckbox}></div>
                    {t("garden.plantForm.sensitive")}
                  </label>
                </div>

                <Field
                  type="hidden"
                  name="category"
                  value={selectedCategoryId}
                />

                <div className={css.footerRow}>
                  <div className={css.flowerId}>#{storyId}</div>
                  <OutlineButton type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? t("garden.plantForm.loading")
                      : t("garden.plantForm.submit")}
                  </OutlineButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
