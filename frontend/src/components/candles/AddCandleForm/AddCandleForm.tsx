import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddCandleForm.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import { useTranslation } from "react-i18next";

type AddCandleFormValues = {
  name: string;
  dateOfBirth: string;
  dateOfDeath: string;
  comment: string;
  audio: File | null;
  photo: File | null;
  video: File | null;
  consent: boolean;
};

type Props = {
  onSubmit: (
    values: AddCandleFormValues,
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => void | Promise<void>;
  storyId: string;
  initialValues?: {
    name: string;
    dateOfBirth: string;
    dateOfDeath: string;
  };
};

export default function AddCandleForm({
  onSubmit,
  storyId,
  initialValues,
}: Props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().max(100, t("candles.candleForm.validation.nameMax")),
    dateOfBirth: Yup.date().required(
      t("candles.candleForm.validation.dateOfBirthRequired")
    ),
    dateOfDeath: Yup.date().required(
      t("candles.candleForm.validation.dateOfDeathRequired")
    ),
    comment: Yup.string().max(
      2000,
      t("candles.candleForm.validation.commentMax")
    ),
    audio: Yup.mixed().nullable(),
    photo: Yup.mixed().nullable(),
    video: Yup.mixed().nullable(),
    consent: Yup.boolean().oneOf(
      [true],
      t("candles.candleForm.validation.consentRequired")
    ),
  });

  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={{
            name: initialValues?.name || "",
            dateOfBirth: initialValues?.dateOfBirth || "",
            dateOfDeath: initialValues?.dateOfDeath || "",
            comment: "",
            audio: null,
            photo: null,
            video: null,
            consent: false,
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, {
              audio: values.audio,
              photo: values.photo,
              video: values.video,
            });
            resetForm();
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className={css.formWrapper}>
              <h2 className={css.title}>{t("candles.candleForm.title")}</h2>
              <div className={css.form}>
                <Field
                  name="name"
                  placeholder={t("candles.candleForm.name")}
                  className={css.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />

                <div className={css.row}>
                  <div className={css.dateField}>
                    <label htmlFor="dateOfBirth" className={css.dateLabel}>
                      {t("candles.candleForm.dateOfBirth")}
                    </label>
                    <Field
                      name="dateOfBirth"
                      type="date"
                      className={css.input}
                    />
                  </div>
                  <div className={css.dateField}>
                    <label htmlFor="dateOfDeath" className={css.dateLabel}>
                      {t("candles.candleForm.dateOfDeath")}
                    </label>
                    <Field
                      name="dateOfDeath"
                      type="date"
                      className={css.input}
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className={css.error}
                />
                <ErrorMessage
                  name="dateOfDeath"
                  component="div"
                  className={css.error}
                />

                <Field
                  name="comment"
                  placeholder={t("candles.candleForm.comment")}
                  className={css.input}
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
                  {t("candles.candleForm.consent")}*
                </label>
                <ErrorMessage
                  name="consent"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.footerRow}>
                <div className={css.flowerId}>#{storyId}</div>
                <OutlineButton
                  color="light"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("candles.candleForm.loading")
                    : t("candles.candleForm.submit")}
                </OutlineButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
