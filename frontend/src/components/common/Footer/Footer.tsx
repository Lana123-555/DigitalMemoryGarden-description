import { Link, NavLink } from "react-router-dom";
import css from "./Footer.module.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className={css.footer}>
        <div className={css.navWrapper}>
          <nav className={css.nav}>
            <NavLink to="/garden" className={css.navLink}>
              {t("navigation.garden")}
            </NavLink>
            <NavLink to="/candles" className={css.navLink}>
              {t("navigation.candles")}
            </NavLink>
            <NavLink to="/archives" className={css.navLink}>
              {t("navigation.archives")}
            </NavLink>
            <NavLink to="/gallery" className={css.navLink}>
              {t("navigation.gallery")}
            </NavLink>
            <NavLink to="/donate" className={css.navLink}>
              {t("navigation.donate")}
            </NavLink>
            <NavLink to="/about" className={css.navLink}>
              {t("navigation.about")}
            </NavLink>
          </nav>
          <div className={css.socialsWrapper}>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-instagram.png"
                alt="Instagram"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-facebook.png"
                alt="Facebook"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-telegram.png"
                alt="Telegram"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-email.png"
                alt="Email"
              />
            </a>
          </div>
        </div>
        <div className={css.logoWrapper}>
          <Link to="/">
            <img src="/logo-blue.png" alt="Logo" className={css.logo} />
          </Link>
        </div>
        <div className={css.rightsWrapper}>
          <p className={css.rightsText}>© THE.DIGITAL.MEMORY.GARDEN</p>
          <p className={css.rightsText}>All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
