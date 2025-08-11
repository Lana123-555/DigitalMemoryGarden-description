import css from "./MapWrapper.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import InteractiveMap from "../../common/InteractiveMap";
import type { Category } from "../../../types/category";
import { useTranslation } from "react-i18next";

type MapWrapperProps = {
  categories: Category[];
};

export default function MapWrapper({ categories }: MapWrapperProps) {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.content}>
        <p className={css.titleMobile}>{t("garden.map.title")}</p>
        <div className={css.mapContainerMobile}>
          <InteractiveMap
            mapImage="/garden-map.png"
            className={css.interactiveMap}
          />
        </div>
        <p className={css.title}>{t("garden.map.title")}</p>
        <ul className={css.list}>
          {categories.map((cat) => (
            <li key={cat._id} className={css.listItem}>
              {cat.miniatureImage && (
                <img
                  src={cat.miniatureImage}
                  alt={cat.name}
                  className={css.itemIcon}
                />
              )}
              <span className={css.itemText}>{cat.name}</span>
            </li>
          ))}
        </ul>
        <div className={css.btnsWrapper}>
          <OutlineButton to="/archives" color="light">
            {t("garden.map.readAll")}
          </OutlineButton>
          <OutlineButton to="/gallery" color="light">
            {t("garden.map.viewAll")}
          </OutlineButton>
        </div>
      </div>

      <div className={css.mapContainer}>
        <InteractiveMap
          mapImage="/garden-map.png"
          className={css.interactiveMap}
        />
      </div>
    </div>
  );
}
