import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import css from "./Header.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import clsx from "clsx";
import { useState } from "react";

export default function Header() {
  const { t } = useTranslation();
  const currentRoute = useLocation().pathname.replace(/\/$/, "");
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    if (currentRoute == "/candles" || currentRoute == "/about") {
      return clsx(css.link, css.lightLink, isActive && css.linkActive);
    } else {
      return clsx(css.link, isActive && css.linkActive);
    }
  };

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.mobileLink, isActive && css.mobileLinkActive);
  };

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={css.header}>
        <Link to="/" className={css.logoLink}>
          {currentRoute == "/candles" || currentRoute == "/about" ? (
            <img src="/logo-yellow.png" alt="Logo" className={css.logo} />
          ) : (
            <img src="/logo-blue.png" alt="Logo" className={css.logo} />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className={css.nav}>
          <NavLink className={linkClass} to="/garden">
            {t("navigation.garden")}
          </NavLink>
          <NavLink className={linkClass} to="/candles">
            {t("navigation.candles")}
          </NavLink>
          <NavLink className={linkClass} to="/archives">
            {t("navigation.archives")}
          </NavLink>
          <NavLink className={linkClass} to="/gallery">
            {t("navigation.gallery")}
          </NavLink>
          <NavLink className={linkClass} to="/donate">
            {t("navigation.donate")}
          </NavLink>
          <NavLink className={linkClass} to="/about">
            {t("navigation.about")}
          </NavLink>
        </nav>

        <LanguageSwitch />

        {/* Burger button */}
        <button
          className={clsx(
            css.burger,
            menuOpen && css.burgerOpen,
            (currentRoute === "/candles" || currentRoute === "/about") &&
              css.burgerLight
          )}
          aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile menu */}
        <div className={clsx(css.mobileMenu, menuOpen && css.mobileMenuOpen)}>
          <nav className={css.mobileNav}>
            <NavLink
              className={mobileLinkClass}
              to="/"
              onClick={handleNavClick}
            >
              {t("navigation.home")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/garden"
              onClick={handleNavClick}
            >
              {t("navigation.garden")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/candles"
              onClick={handleNavClick}
            >
              {t("navigation.candles")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/archives"
              onClick={handleNavClick}
            >
              {t("navigation.archives")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/gallery"
              onClick={handleNavClick}
            >
              {t("navigation.gallery")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/donate"
              onClick={handleNavClick}
            >
              {t("navigation.donate")}
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/about"
              onClick={handleNavClick}
            >
              {t("navigation.about")}
            </NavLink>
          </nav>
          <img
            src="/burger-flower.png"
            alt="Flower decoration"
            className={css.menuFlower}
          />
        </div>
        {/* overlay */}
        {menuOpen && <div className={css.overlay} onClick={handleNavClick} />}
      </header>
    </>
  );
}
