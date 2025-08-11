import PopupOverlay from "../../common/PopupOverlay/PopupOverlay";
import css from "./PhotoModal.module.css";

type Props = {
  photoUrl: string;
  title?: string;
  author?: string;
  category?: string;
  onClose: () => void;
};

export default function PhotoModal({ photoUrl, title, onClose }: Props) {
  return (
    <PopupOverlay onClose={onClose}>
      <div className={css.container}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close photo"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={css.photoWrapper}>
          <img
            src={photoUrl}
            alt={title || "Full size photo"}
            className={css.photo}
          />
        </div>
      </div>
    </PopupOverlay>
  );
}
