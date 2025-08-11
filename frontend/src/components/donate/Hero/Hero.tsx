import { useTranslation } from "react-i18next";
import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import css from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle
          title={t("donate.hero.title")}
        ></HeroTitleAndSubtitle>

        <div className={css.content}>
          <h2 className={css.title}> {t("donate.hero.subtitle")}</h2>
          <div className={css.row}>
            <a href="https://savelife.in.ua/en/" className={css.option}>
              <div className={css.card}>
                <img
                  src="/donate-drone.png"
                  alt="Drone"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>Come Back Alive Foundation</h3>
              </div>
              <div className={css.label}>{t("donate.initiatives.0")}</div>
            </a>
            <a href="https://u24.gov.ua" className={css.option}>
              <div className={css.card}>
                <img
                  src="/donate-united.png"
                  alt="United24"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>UNITED24</h3>
                <p className={css.cardSubtitle}>
                  The Initiative of the President of Ukraine
                </p>
              </div>
              <div className={css.label}>{t("donate.initiatives.1")}</div>
            </a>
            <a
              href="https://www.unicef.org.uk/donate/donate-now-to-protect-children-in-ukraine/"
              className={css.option}
            >
              <div className={css.card}>
                <img
                  src="/donate-unicef.png"
                  alt="UNICEF UK"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>UNICEF UK – Emergency Appeal:</h3>
                <p className={css.cardSubtitle}>Protect Children in Ukraine</p>
              </div>
              <div className={css.label}>{t("donate.initiatives.2")}</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
