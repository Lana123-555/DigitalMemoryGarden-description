// components/gallery/MediaItems/PhotoItem.tsx
import type { GalleryStory } from "../../../types/Gallery";
import css from "./PhotoItem.module.css";

type Props = {
  story: GalleryStory;
  index: number;
  onPhotoClick?: (story: GalleryStory) => void;
};

export default function PhotoItem({ story, index, onPhotoClick }: Props) {
  const photoUrl = story.media.photo ? `${story.media.photo}` : "";

  const handlePhotoClick = () => {
    if (photoUrl && onPhotoClick) {
      onPhotoClick(story);
    }
  };

  return (
    <div
      className={css.photoItem}
      data-index={index}
      onClick={handlePhotoClick}
    >
      {photoUrl && (
        <img
          src={photoUrl}
          alt={story.title || "Story photo"}
          className={css.photo}
          loading="lazy"
        />
      )}
      <div className={css.overlay}>
        <div className={css.info}>
          <div className={css.col}>
            {story.title && <h3 className={css.title}>{story.title}</h3>}
          </div>
          <div className={css.col}>
            <p className={css.category}>{story.category.name}</p>
            {story.name && <p className={css.author}>by {story.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
