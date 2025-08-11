import { Link } from "react-router-dom";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const handleArrowClick = () => {
    window.scrollTo({
      top: innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={css.hero}>
        <div className={css.heroContent}>
          <h1 className={css.title}>
            {t("home.hero.title.0")} <br />
            <span>{t("home.hero.title.1")}</span>
          </h1>
          <p className={css.subtitle}>{t("home.hero.subtitle")}</p>
          <div className={css.btnsWrapper}>
            <OutlineButton to="/garden">{t("home.hero.cta")}</OutlineButton>
            <OutlineButton onClick={handleArrowClick}>
              <img
                src="/btn-arrow-right.png"
                alt="Arrow Right"
                className={css.arrowIcon}
              />
            </OutlineButton>
          </div>
        </div>

        <div className={css.flowerWrapper}>
          <img
            src="/hero-flower.png"
            alt="Flower"
            className={css.flowerImage}
          />
          <img
            src="/hero-flower-text.png"
            alt="Flower Text"
            className={css.flowerText}
          />
          <Link to="/about" className={css.flowerPlayButton}>
            <img
              src="/hero-flower-play.png"
              alt="Flower Play Button"
              className={css.flowerPlayImage}
            />
          </Link>
        </div>
        <div className={css.btnMobile}>
          <OutlineButton to="/garden">{t("home.hero.cta")}</OutlineButton>
        </div>
      </div>
    </>
  );
}
