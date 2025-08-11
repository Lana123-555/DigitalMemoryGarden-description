import { useTranslation } from "react-i18next";
import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import type { MediaType } from "../../../types/Gallery";
import css from "./Hero.module.css";

type Props = {
  selectedMediaType: MediaType;
  onMediaTypeChange: (mediaType: MediaType) => void;
};

export default function Hero({ selectedMediaType, onMediaTypeChange }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title={t("gallery.hero.title")}>
          {t("gallery.hero.subtitle")}
        </HeroTitleAndSubtitle>

        <div className={css.content}>
          <div className={css.row}>
            <div className={css.imageWrapper}>
              <div className={css.imageBorder}>
                <img
                  className={css.image}
                  src="/galleryImage.png"
                  alt="Image description"
                />
              </div>
            </div>
            <div className={css.btnsWrapper}>
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "photo" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("photo")}
              >
                {t("gallery.hero.filters.photo")}
              </button>
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "video" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("video")}
              >
                {t("gallery.hero.filters.video")}
              </button>
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "audio" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("audio")}
              >
                {t("gallery.hero.filters.audio")}
              </button>
            </div>
          </div>
          <div className={css.blueSection}></div>
        </div>
      </div>
    </>
  );
}
