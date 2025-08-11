import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";
import { useRef, useEffect } from "react";
import type { Story } from "../../../types/story";
import { useTranslation } from "react-i18next";
import { useAlphaVideoSupport } from "../../../hooks/useAlphaVideoSupport";

type VideoLoopSectionProps = {
  src: string;
  className?: string;
  loopStart: number;
  loopEnd: number;
};
function VideoLoopSection({
  src,
  className,
  loopStart,
  loopEnd,
}: VideoLoopSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let frame: number | null = null;
    const onLoaded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const tick = () => {
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart + 0.01;
        video.play().catch(() => {});
      }
      frame = requestAnimationFrame(tick);
    };
    video.addEventListener("loadedmetadata", onLoaded);
    frame = requestAnimationFrame(tick);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [src, loopStart, loopEnd]);
  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
      style={{
        objectFit: "contain",
        border: 0,
        outline: 0,
        background: "transparent",
      }}
    />
  );
}

type Props = {
  onSearch: () => void;
  onDetails: () => void;
  flower?: Story | null;
};

export default function Hero({ onSearch, onDetails, flower }: Props) {
  const { t } = useTranslation();
  const alphaVideoSupported = useAlphaVideoSupport();

  const handlePlantNewFlower = () => {
    window.scrollTo({
      top: document.getElementById("plant-new-memory-flower")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={css.hero}>
      <HeroTitleAndSubtitle title={t("garden.hero.title")}>
        {t("garden.hero.subtitle")}
      </HeroTitleAndSubtitle>
      <div className={css.heroContent}>
        <div className={css.btnsWrapper}>
          <OutlineButton onClick={onSearch}>
            {t("garden.hero.findFlower")}
          </OutlineButton>
          <OutlineButton onClick={handlePlantNewFlower}>
            {t("garden.hero.plantFlower")}
          </OutlineButton>
        </div>
        <div className={css.blueContainer}>
          <div className={css.storyDescription}>
            <p className={css.storyName}>{flower?.title || "Name of story"}</p>
            <p className={css.storyAuthor}>{flower?.name || ""}</p>
          </div>
          {alphaVideoSupported &&
          typeof flower?.category === "object" &&
          flower.category.flowerAnimation ? (
            <VideoLoopSection
              src={flower.category.flowerAnimation}
              className={css.flower}
              loopStart={3}
              loopEnd={15}
            />
          ) : (
            <img
              src={
                typeof flower?.category === "object" &&
                "flowerImage" in flower.category &&
                flower.category.flowerImage
                  ? flower.category.flowerImage
                  : "/garden-flower.png"
              }
              alt="Garden Flower"
              className={css.flower}
            />
          )}
          <div className={css.actionsWrapper}>
            <button className={css.actionButton} onClick={onDetails}>
              <img
                src="/action-info.png"
                alt="Read story"
                className={css.actionIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
