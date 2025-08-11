import { useTranslation } from "react-i18next";
import css from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={css.container}>
      <button
        className={`${css.langButton} ${
          i18n.language === "en" ? css.active : ""
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </button>
      <button
        className={`${css.langButton} ${
          i18n.language === "uk" ? css.active : ""
        }`}
        onClick={() => handleLanguageChange("uk")}
      >
        УК
      </button>
    </div>
  );
}
