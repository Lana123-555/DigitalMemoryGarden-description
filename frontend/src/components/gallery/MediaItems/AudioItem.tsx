// components/gallery/MediaItems/AudioItem.tsx
import { useState, useRef, useEffect } from "react";
import type { GalleryStory } from "../../../types/Gallery";
import css from "./AudioItem.module.css";

type Props = {
  story: GalleryStory;
};

export default function AudioItem({ story }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = story.media.audio ? `${story.media.audio}` : "";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={css.audioItem}>
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className={css.playerSection}>
        <button
          className={css.playButton}
          onClick={handlePlayPause}
          disabled={!audioUrl}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="6" y="4" width="2" height="12" fill="currentColor" />
              <rect x="12" y="4" width="2" height="12" fill="currentColor" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4L16 10L6 16V4Z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div className={css.progressSection}>
          <span className={css.time}>{formatTime(currentTime)}</span>
          <div className={css.progressContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent}
              onChange={handleSeek}
              className={css.progressBar}
              disabled={!audioUrl}
            />
          </div>
          <span className={css.time}>{formatTime(duration)}</span>
        </div>

        <button
          className={css.muteButton}
          onClick={handleMute}
          disabled={!audioUrl}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 7H6L10 3V17L6 13H3V7Z" fill="currentColor" />
              <path
                d="M14 9L16 11M16 9L14 11"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 7H6L10 3V17L6 13H3V7Z" fill="currentColor" />
              <path
                d="M13 6C14.1 7.1 14.1 8.9 13 10M15 4C17.2 6.2 17.2 9.8 15 12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>

      <div className={css.infoSection}>
        <div className={css.trackInfo}>
          {story.title && <h3 className={css.title}>{story.title}</h3>}
          {story.name && <p className={css.artist}>by {story.name}</p>}
        </div>
        <p className={css.category}>{story.category.name}</p>
      </div>
    </div>
  );
}
