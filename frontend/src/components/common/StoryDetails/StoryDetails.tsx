import { useState } from "react";
import clsx from "clsx";
import CloseCross from "../CloseCross/CloseCross";
import css from "./StoryDetails.module.css";
import type { Story } from "../../../types/story";
import { useTranslation } from "react-i18next";

type Props = {
  story?: Story;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function StoryDetails({
  story,
  onClose,
  onNext,
  onPrev,
}: Props) {
  const isCandle = story?.source === "candle";

  // category name
  const categoryName =
    typeof story?.category === "object" && story?.category?.name
      ? story.category.name
      : "";

  // date
  const date = story?.createdAt
    ? new Date(story.createdAt).toLocaleDateString()
    : "";

  // For flowers: location and age
  const location = story?.location || "";
  const age = story?.age !== undefined && story?.age !== null ? story.age : "";

  // For candles: birth and death dates
  const dateOfBirth = story?.dateOfBirth
    ? new Date(story.dateOfBirth).toLocaleDateString()
    : "";
  const dateOfDeath = story?.dateOfDeath
    ? new Date(story.dateOfDeath).toLocaleDateString()
    : "";

  // Story ID
  const storyId = story?.storyId ? `#${story.storyId}` : "";

  // title (for flowers) or name (for candles)
  const title = story?.title || story?.name || "";

  // author (for flowers) or empty for candles
  const author = isCandle ? "" : story?.name || "";

  // comment
  const comment = story?.comment || "";

  // media
  const photo = story?.media?.photo || "";
  const video = story?.media?.video || "";

  // state: what to show (photo/video)
  const [mediaMode, setMediaMode] = useState<"photo" | "video">(
    photo ? "photo" : video ? "video" : "photo"
  );

  // logic for what to show
  let mediaContent = null;
  if (photo && (mediaMode === "photo" || !video)) {
    mediaContent = (
      <img src={photo} alt="Image of the story" className={css.imageWrapper} />
    );
  } else if (video && mediaMode === "video") {
    mediaContent = (
      <video
        src={video}
        className={css.imageWrapper}
        controls
        style={{ background: "#bcc6d2" }}
      />
    );
  }

  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.cross} onClick={onClose}>
        <CloseCross />
      </div>
      <div className={css.content}>
        {mediaContent !== null && <div className={css.col}>{mediaContent}</div>}
        <div className={clsx(css.col, mediaContent == null && css.colWide)}>
          <div className={css.header}>
            <div className={css.row}>
              <span className={css.headerText}>
                {t("storyDetails.category")}: {categoryName}
              </span>
              <span className={css.headerText}>{date}</span>
            </div>
            {isCandle ? (
              <>
                {dateOfBirth && (
                  <div className={css.row}>
                    <span className={css.headerText}>
                      {t("storyDetails.dateOfBirth")}: {dateOfBirth}
                    </span>
                  </div>
                )}
                {dateOfDeath && (
                  <div className={css.row}>
                    <span className={css.headerText}>
                      {t("storyDetails.dateOfDeath")}: {dateOfDeath}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className={css.row}>
                <span className={css.headerText}>
                  {t("storyDetails.location")}: {location}
                </span>
                <span className={css.headerText}>
                  {t("storyDetails.age")}: {age}
                </span>
              </div>
            )}
            <div className={css.row}>
              <span className={css.headerText}>
                {t("storyDetails.number")}: {storyId}
              </span>
            </div>
          </div>
          <div className={clsx(css.body, mediaContent == null && css.bodyWide)}>
            <p
              className={clsx(
                css.bodyTitle,
                mediaContent == null && css.bodyTitleWide
              )}
            >
              {title}
              {author && !isCandle && (
                <>
                  <br />
                  {t("storyDetails.author")} {author}
                </>
              )}
            </p>
            <p
              className={clsx(
                css.bodyText,
                mediaContent == null && css.bodyTextWide
              )}
            >
              {comment}
            </p>
          </div>
        </div>
      </div>

      <div className={css.actionsWrapper}>
        <div
          className={clsx(
            css.actionsCol,
            mediaContent == null && css.actionsColWide
          )}
        >
          {onPrev && (
            <button className={css.mediaBtn} onClick={onPrev}>
              <img
                src="/small-left-arrow-dark.png"
                alt="Arrow left"
                className={css.arrow}
              />
            </button>
          )}
          <div className={css.mediaBtnsWrapper}>
            {story?.media?.audio && (
              <button className={css.mediaBtn}>
                <img
                  src="/action-audio-dark.png"
                  alt="Audio button"
                  className={css.mediaIcon}
                />
              </button>
            )}
            {photo && (
              <button
                className={
                  mediaMode === "photo"
                    ? `${css.mediaBtn} ${css.activeMediaBtn}`
                    : css.mediaBtn
                }
                onClick={() => setMediaMode("photo")}
              >
                <img
                  src="/action-photo-dark.png"
                  alt="Photo button"
                  className={css.mediaIcon}
                />
              </button>
            )}
            {video && (
              <button
                className={
                  mediaMode === "video"
                    ? `${css.mediaBtn} ${css.activeMediaBtn}`
                    : css.mediaBtn
                }
                onClick={() => setMediaMode("video")}
              >
                <img
                  src="/action-video-dark.png"
                  alt="Video button"
                  className={css.mediaIcon}
                />
              </button>
            )}
          </div>
          {onNext && (
            <button className={css.mediaBtn} onClick={onNext}>
              <img
                src="/small-right-arrow-dark.png"
                alt="Arrow right"
                className={css.arrow}
              />
            </button>
          )}
        </div>
        <div className={css.actionsCol}>
          <button className={css.mediaBtn}>
            <img
              src="/action-book-dark.png"
              alt="Book button"
              className={css.mediaIcon}
            />
          </button>
          <button className={css.mediaBtn}>
            <img
              src="/action-email-dark.png"
              alt="Email button"
              className={css.mediaIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
