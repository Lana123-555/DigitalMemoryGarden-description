// components/gallery/MediaItems/VideoItem.tsx
import { useState } from "react";
import type { GalleryStory } from "../../../types/Gallery";
import css from "./VideoItem.module.css";

type Props = {
  story: GalleryStory;
};

export default function VideoItem({ story }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = story.media.video ? `${story.media.video}` : "";

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={css.videoItem}>
      {videoUrl && (
        <div className={css.videoWrapper}>
          <video
            src={videoUrl}
            className={css.video}
            controls={isPlaying}
            poster=""
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {!isPlaying && (
            <div className={css.playOverlay} onClick={handlePlayPause}>
              <div className={css.playButton}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="20"
                    r="20"
                    fill="rgba(255, 255, 255, 0.9)"
                  />
                  <path d="M16 12L28 20L16 28V12Z" fill="rgba(15, 26, 44, 1)" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={css.info}>
        <div className={css.col}>
          {story.title && <h3 className={css.title}>{story.title}</h3>}
        </div>
        <div className={css.col}>
          {story.name && <p className={css.author}>by {story.name}</p>}
          <p className={css.category}>{story.category.name}</p>
        </div>
      </div>
    </div>
  );
}
