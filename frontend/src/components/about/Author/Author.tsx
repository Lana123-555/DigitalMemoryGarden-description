import { useTranslation } from "react-i18next";
import css from "./Author.module.css";

export default function Author() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.container}>
        <h1 className={css.titleMobile}>{t("about.author.title")}</h1>
        <div className={css.imageWrapper}>
          <div className={css.imageBorder}>
            <div className={css.image}>
              <img src="/author-image.png" alt="Lana Sokoliuk" />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2 className={css.title}>{t("about.author.title")}</h2>
            <div className={css.headerCol}>
              <p className={css.authorName}>{t("about.author.name")}</p>
              <p className={css.authorRole}>{t("about.author.subtitle")}</p>
            </div>
          </div>
          <p className={css.authorText}>
            <span className={css.authorTextBold}>
              {t("about.author.descriptionTitle")}
            </span>
            <br />
            <br />
            {t("about.author.description")}
          </p>
          <p className={css.authorQuote}>"{t("about.author.quote")}"</p>
        </div>
      </div>
    </>
  );
}
