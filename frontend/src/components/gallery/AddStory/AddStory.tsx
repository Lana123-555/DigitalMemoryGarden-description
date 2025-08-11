import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import css from "./AddStory.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import CategoryDropdown from "../../archives/CategoryDropdown/CategoryDropdown";
import { addStory } from "../../../services/story";
import { generateStoryId } from "../../../utils/storyId";
import type { Category } from "../../../types/category";

type AddStoryProps = {
  categories: Category[];
  onStoryAdded: () => void;
};

export default function AddStory({ categories, onStoryAdded }: AddStoryProps) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().max(100, t("gallery.addStory.validation.nameMax")),
    age: Yup.number()
      .min(0, t("gallery.addStory.validation.ageMin"))
      .max(120, t("gallery.addStory.validation.ageMax"))
      .integer(t("gallery.addStory.validation.ageInteger"))
      .nullable(),
    location: Yup.string().max(
      200,
      t("gallery.addStory.validation.locationMax")
    ),
    title: Yup.string()
      .required(t("gallery.addStory.validation.titleRequired"))
      .min(3, t("gallery.addStory.validation.titleMin"))
      .max(100, t("gallery.addStory.validation.titleMax")),
    category: Yup.string().required(
      t("gallery.addStory.validation.categoryRequired")
    ),
    comment: Yup.string().max(
      2000,
      t("gallery.addStory.validation.commentMax")
    ),
    consent: Yup.boolean().oneOf(
      [true],
      t("gallery.addStory.validation.consentRequired")
    ),
    sensitive: Yup.boolean(),
    audio: Yup.mixed().nullable(),
    photo: Yup.mixed().nullable(),
    video: Yup.mixed().nullable(),
  }).test(
    "at-least-one-media",
    t("gallery.addStory.validation.mediaRequired"),
    function (values) {
      const { audio, photo, video } = values;
      if (!audio && !photo && !video) {
        return this.createError({
          message: t("gallery.addStory.validation.mediaRequired"),
          path: "audio",
        });
      }
      return true;
    }
  );
  return (
    <div className={css.container} id="add-story">
      <Formik
        initialValues={{
          name: "",
          age: "",
          location: "",
          title: "",
          category: "",
          comment: "",
          consent: false,
          sensitive: false,
          audio: null as File | null,
          photo: null as File | null,
          video: null as File | null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await addStory({
              storyId: generateStoryId("gallery"),
              title: values.title,
              comment: values.comment,
              name: values.name,
              age: values.age,
              location: values.location,
              category: values.category,
              source: "gallery",
              photo: values.photo || undefined,
              audio: values.audio || undefined,
              video: values.video || undefined,
            });
            resetForm();
            onStoryAdded();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={css.formWrapper}>
            <div className={css.col}>
              <h2 className={css.title}>{t("gallery.addStory.title")}</h2>
              <div className={css.form}>
                <div className={css.row}>
                  <Field
                    name="name"
                    placeholder={t("gallery.addStory.name")}
                    className={css.input}
                  />
                  <Field
                    name="age"
                    type="number"
                    placeholder={t("gallery.addStory.age")}
                    className={css.input}
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
                  placeholder={t("gallery.addStory.location")}
                  className={css.input}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className={css.error}
                />

                <div className={css.row}>
                  <div>
                    <Field
                      name="title"
                      placeholder={t("gallery.addStory.storyTitle")}
                      className={css.input}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div>
                    <CategoryDropdown
                      value={values.category}
                      onChange={(val) => setFieldValue("category", val)}
                      options={categories.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      }))}
                      name="category"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className={css.error}
                    />
                  </div>
                </div>

                <Field
                  name="comment"
                  as="textarea"
                  placeholder={t("gallery.addStory.comment")}
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
                      : t("gallery.addStory.audio")}
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
                      : t("gallery.addStory.photo")}
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
                      : t("gallery.addStory.video")}
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
                <ErrorMessage
                  name="audio"
                  component="div"
                  className={css.error}
                />
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
                  {t("gallery.addStory.consent")}
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
                  {t("gallery.addStory.sensitive")}
                </label>
              </div>
            </div>
            <div className={css.col}>
              <OutlineButton type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("gallery.addStory.loading")
                  : t("gallery.addStory.submit")}
              </OutlineButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
