import { useTranslation } from "react-i18next";
import css from "./Information.module.css";

export default function Information() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>{t("donate.information.title")}</h2>
        <div className={css.content}>
          <p className={css.description}>{t("donate.information.subtitle")}</p>
          <div className={css.option}>
            <img
              src="/donate-alive-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>Come Back Alive Foundation</h3>
              <p className={css.optionText}>
                {t("donate.information.funds.0")}
              </p>
            </div>
          </div>
          <div className={css.option}>
            <img
              src="/donate-united-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>UNITED24</h3>
              <p className={css.optionText}>
                {t("donate.information.funds.1")}
              </p>
            </div>
          </div>
          <div className={css.option}>
            <img
              src="/donate-unicef-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>UNICEF UK</h3>
              <p className={css.optionText}>
                {t("donate.information.funds.2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
