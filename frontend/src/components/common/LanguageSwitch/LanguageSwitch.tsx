import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import css from "./LanguageSwitch.module.css";

export default function LanguageSwitch() {
  const currentRoute = useLocation().pathname.replace(/\/$/, "");
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "en" ? "uk" : "en";
    i18n.changeLanguage(nextLanguage);
  };

  const getCurrentLanguageDisplay = () => {
    return i18n.language === "en" ? "ENG" : "УКР";
  };

  return (
    <>
      <button className={css.container} onClick={toggleLanguage}>
        {currentRoute == "/candles" || currentRoute == "/about" ? (
          <>
            <img
              src="/language-switch-light.png"
              alt="Language Switcher"
              className={css.icon}
            />
            <span className={css.currentLanguageLight}>
              {getCurrentLanguageDisplay()}
            </span>
          </>
        ) : (
          <>
            <img
              src="/language-switch.png"
              alt="Language Switcher"
              className={css.icon}
            />
            <span className={css.currentLanguage}>
              {getCurrentLanguageDisplay()}
            </span>
          </>
        )}
      </button>
    </>
  );
}
