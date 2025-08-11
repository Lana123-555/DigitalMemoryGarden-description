import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import PhotoItem from "../MediaItems/PhotoItem";
import VideoItem from "../MediaItems/VideoItem";
import AudioItem from "../MediaItems/AudioItem";
import { getGalleryStories } from "../../../services/gallery";
import type { MediaType, GalleryStory } from "../../../types/Gallery";
import css from "./Gallery.module.css";

type Props = {
  selectedMediaType: MediaType;
  onMediaTypeChange: (mediaType: MediaType) => void;
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onPhotoClick?: (story: GalleryStory) => void;
};

export default function Gallery({
  selectedMediaType,
  onMediaTypeChange,
  selectedCategoryId,
  onCategoryChange,
  onPhotoClick,
}: Props) {
  const { t } = useTranslation();
  const [stories, setStories] = useState<GalleryStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Поточний номер сторінки зберігаємо лише у ref (не тригерить ререндери)
  const pageRef = useRef(1);
  // Використовуємо ref щоб відкидати застарілі відповіді (гонки між запитами)
  const lastRequestIdRef = useRef(0);
  const loadingRef = useRef(false);

  const fetchPage = useCallback(
    async (pageToFetch: number, { append }: { append: boolean }) => {
      if (loadingRef.current) return; // запобігаємо паралельним запитам
      loadingRef.current = true;
      setLoading(true);
      const requestId = ++lastRequestIdRef.current;
      try {
        const response = await getGalleryStories({
          mediaType: selectedMediaType,
          // empty string -> undefined
          categoryId: selectedCategoryId || undefined,
          page: pageToFetch,
          limit: 12,
        });
        // Ігноруємо відповідь, якщо прийшла не останньою
        if (requestId !== lastRequestIdRef.current) return;

        setHasMore(response.hasMore);
        if (append) {
          setStories((prev) => [...prev, ...response.stories]);
        } else {
          setStories(response.stories);
        }
      } catch (error) {
        console.error("Failed to load gallery stories:", error);
      } finally {
        if (requestId === lastRequestIdRef.current) {
          setLoading(false);
          loadingRef.current = false;
        }
      }
    },
    [selectedMediaType, selectedCategoryId]
  );

  // Коли змінюються фільтри – ресет сторінки до 1 та перезавантаження
  useEffect(() => {
    pageRef.current = 1;
    setStories([]);
    setHasMore(true);
    fetchPage(1, { append: false });
  }, [selectedMediaType, selectedCategoryId, fetchPage]);

  const handleShowMore = () => {
    if (loading || !hasMore) return;
    const next = pageRef.current + 1;
    pageRef.current = next;
    fetchPage(next, { append: true });
  };

  const renderMediaItem = (story: GalleryStory, index: number) => {
    switch (selectedMediaType) {
      case "photo":
        return (
          <PhotoItem
            key={story._id}
            story={story}
            index={index}
            onPhotoClick={onPhotoClick}
          />
        );
      case "video":
        return <VideoItem key={story._id} story={story} />;
      case "audio":
        return <AudioItem key={story._id} story={story} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.filterWrapper}>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "photo" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("photo")}
          >
            {t("gallery.hero.filters.photo")}
          </button>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "video" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("video")}
          >
            {t("gallery.hero.filters.video")}
          </button>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "audio" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("audio")}
          >
            {t("gallery.hero.filters.audio")}
          </button>
          <CategoryDropdown
            value={selectedCategoryId}
            onChange={onCategoryChange}
          />
        </div>

        <div className={`${css.grid} ${css[selectedMediaType + "Grid"]}`}>
          {stories.map((story, index) => renderMediaItem(story, index))}
        </div>

        {loading && <LoadingSpinner />}

        {!loading && stories.length === 0 && (
          <div className={css.empty}>
            {t("gallery.gallery.noMedia", {
              mediaType: t(`gallery.hero.filters.${selectedMediaType}`),
            })}
          </div>
        )}

        {!loading && hasMore && stories.length > 0 && (
          <OutlineButton onClick={handleShowMore}>
            {t("gallery.gallery.loadMore")}
          </OutlineButton>
        )}
      </div>
    </>
  );
}
