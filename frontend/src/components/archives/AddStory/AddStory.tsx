import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddStory.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { addStory } from "../../../services/story";
import { generateStoryId } from "../../../utils/storyId";
import type { Category } from "../../../types/category";
import { useTranslation } from "react-i18next";

type AddStoryProps = {
  categories: Category[];
  onStoryAdded: () => void;
};

export default function AddStory({ categories, onStoryAdded }: AddStoryProps) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().max(100, t("archives.addStory.validation.nameMax")),
    age: Yup.number()
      .min(0, t("archives.addStory.validation.ageMin"))
      .max(120, t("archives.addStory.validation.ageMax"))
      .integer(t("archives.addStory.validation.ageInteger"))
      .nullable(),
    location: Yup.string().max(
      200,
      t("archives.addStory.validation.locationMax")
    ),
    title: Yup.string()
      .required(t("archives.addStory.validation.titleRequired"))
      .min(3, t("archives.addStory.validation.titleMin"))
      .max(100, t("archives.addStory.validation.titleMax")),
    category: Yup.string().required(
      t("archives.addStory.validation.categoryRequired")
    ),
    comment: Yup.string().max(
      2000,
      t("archives.addStory.validation.commentMax")
    ),
    consent: Yup.boolean().oneOf(
      [true],
      t("archives.addStory.validation.consentRequired")
    ),
    sensitive: Yup.boolean(),
  });

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
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await addStory({
              storyId: generateStoryId("archive"),
              title: values.title,
              comment: values.comment,
              name: values.name,
              age: values.age,
              location: values.location,
              category: values.category,
              source: "archive",
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
              <div className={css.form}>
                <div className={css.row}>
                  <Field
                    name="name"
                    placeholder={t("archives.addStory.name")}
                    className={css.input}
                  />
                  <Field
                    name="age"
                    type="number"
                    placeholder={t("archives.addStory.age")}
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
                  placeholder={t("archives.addStory.location")}
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
                      placeholder={`${t("archives.addStory.storyTitle")} *`}
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
                  placeholder={t("archives.addStory.comment")}
                  className={css.input}
                />
                <ErrorMessage
                  name="comment"
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
                  {t("archives.addStory.consent")}
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
                  {t("archives.addStory.sensitive")}
                </label>
              </div>
            </div>
            <div className={css.col}>
              <OutlineButton type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("archives.addStory.loading")
                  : t("archives.addStory.submit")}
              </OutlineButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
