import { useTranslation } from "react-i18next";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Numbers.module.css";

export default function Numbers() {
  const { t } = useTranslation();
  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>{t("home.numbers.title")}</h3>

        <div className={css.content}>
          <div className={css.item}>
            <h4 className={css.itemTitle}>50</h4>
            <p className={css.itemDescription}>{t("home.numbers.people")}</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>65</h4>
            <p className={css.itemDescription}>{t("home.numbers.stories")}</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>28</h4>
            <p className={css.itemDescription}>{t("home.numbers.places")}</p>
          </div>
        </div>

        <div className={css.buttonContainer}>
          <OutlineButton to="/garden">{t("home.numbers.cta")}</OutlineButton>
        </div>
      </div>
    </>
  );
}
