import css from "./Map.module.css";
import InteractiveMap from "../../common/InteractiveMap";
import { useTranslation } from "react-i18next";

export default function Map() {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h3 className={css.title}>{t("home.map.title")}</h3>
        <p className={css.description}>{t("home.map.description")}</p>
      </div>
      <InteractiveMap mapImage="/home-map.png" className={css.mapContainer} />
    </div>
  );
}
