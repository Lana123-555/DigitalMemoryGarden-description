import { useTranslation } from "react-i18next";
import css from "./Statistics.module.css";

export default function Statistics() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>{t("about.statistics.title")}</h2>

        <div className={css.content}>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              2 <span>million</span>
            </h4>
            <p className={css.itemDescription}>
              {t("about.statistics.memoriesPreserved")}
            </p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>100+</h4>
            <p className={css.itemDescription}>
              {t("about.statistics.communitiesConnected")}
            </p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              3.7 <span>million</span>
            </h4>
            <p className={css.itemDescription}>
              {t("about.statistics.countriesReached")}
            </p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              5 <span>million</span>
            </h4>
            <p className={css.itemDescription}>
              {t("about.statistics.refugeesInEurope")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
