import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import type { Story } from "../../../types/story";
import css from "./Hero.module.css";
import { useTranslation } from "react-i18next";
import { useAlphaVideoSupport } from "../../../hooks/useAlphaVideoSupport";

type Props = {
  onSearch?: () => void;
  lastAddedCandle?: Story | null;
  onDetails?: () => void;
};

export default function Hero({ onSearch, lastAddedCandle, onDetails }: Props) {
  const { t } = useTranslation();
  const alphaVideoSupported = useAlphaVideoSupport();

  const handleLightNewCandle = () => {
    window.scrollTo({
      top: document.getElementById("light-new-memory-candle")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title={t("candles.hero.title")} color="light">
          {t("candles.hero.subtitle")}
        </HeroTitleAndSubtitle>

        <div className={css.heroContent}>
          <div className={css.btnsWrapper}>
            <OutlineButton color="light" onClick={onSearch}>
              {t("candles.hero.findCandle")}
            </OutlineButton>
            <OutlineButton color="light" onClick={handleLightNewCandle}>
              {t("candles.hero.lightCandle")}
            </OutlineButton>
          </div>
          <div className={css.candlesWrapper}>
            <div className={css.leftCandles}>
              <div className={css.commonCandle}>
                <img
                  src="/1-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/2-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/3-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/4-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/5-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
            </div>
            <div className={css.mainCandleWrapper}>
              <div className={css.mainCandle}>
                <div className={css.candleImageContainer}>
                  <img
                    src={
                      lastAddedCandle &&
                      typeof lastAddedCandle.candleType === "object" &&
                      lastAddedCandle.candleType?.image
                        ? `${lastAddedCandle.candleType.image}`
                        : "/main-candle.png"
                    }
                    alt={
                      lastAddedCandle
                        ? `Candle for ${lastAddedCandle.name || "Unknown"}`
                        : "Main candle"
                    }
                    className={css.mainCandleImage}
                    onError={(e) => {
                      console.log("Failed to load image:", e.currentTarget.src);
                      e.currentTarget.src = "/main-candle.png";
                    }}
                    onLoad={(e) => {
                      // Position fire animation above the candle image
                      const img = e.currentTarget;
                      const fire = img.parentElement?.querySelector(
                        `.${css.fire}`
                      ) as HTMLVideoElement;
                      if (fire && lastAddedCandle) {
                        // Position fire exactly above the candle top
                        fire.style.top = `-${fire.offsetHeight - 15}px`;
                      }
                    }}
                  />
                  {lastAddedCandle && alphaVideoSupported && (
                    <video
                      src="/Fire.webm"
                      className={css.fire}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                  {lastAddedCandle && !alphaVideoSupported && (
                    <img
                      src="/candle-fire.png"
                      alt="Candle flame"
                      className={css.fire}
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              <div className={css.mainCandleBottom}>
                <button
                  className={css.candleButton}
                  onClick={
                    lastAddedCandle && onDetails
                      ? onDetails
                      : handleLightNewCandle
                  }
                >
                  <img
                    src={
                      lastAddedCandle ? "/action-info.png" : "/candle-plus.png"
                    }
                    alt={
                      lastAddedCandle ? "View candle details" : "Add new candle"
                    }
                    className={css.candleIcon}
                  />
                </button>
                <img
                  src="/candle-bottom.png"
                  alt="Candle bottom"
                  className={css.candleBottomImage}
                />
              </div>
            </div>
            <div className={css.rightCandles}>
              <div className={css.commonCandle}>
                <img
                  src="/6-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/7-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/8-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/9-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/10-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
