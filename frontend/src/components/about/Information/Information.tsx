import { useTranslation } from "react-i18next";
import css from "./Information.module.css";

export default function Information() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.container}>
        <div className={css.videoWrapper}>
          <iframe
            id="kaltura_player"
            src='https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_pllbvj4i&config[provider]={"widgetId":"1_r8l45si2"}'
            allowFullScreen
            allow="autoplay *; fullscreen *; encrypted-media *"
            sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
            title="Kaltura Player"
            className={css.video}
          />
          <div className={css.videoRow}>
            <div className={css.videoCol}>
              <p className={css.videoTitle}>{t("about.information.title")}</p>
            </div>
            <p className={css.videoDescription}>
              {t("about.information.subtitle")}
            </p>
          </div>
        </div>
        <div className={css.professorWrapper}>
          <img
            src="/about-professor.png"
            alt="About Professor"
            className={css.professorImage}
          />
          <p className={css.professorText}>
            <b>Rachel Granger</b>
          </p>
          <p className={css.professorText}>
            {t("about.information.proffessorJob")}
          </p>
          <p className={css.professorText}>
            {t("about.information.proffessorUniversity")}
          </p>
        </div>
      </div>
    </>
  );
}
