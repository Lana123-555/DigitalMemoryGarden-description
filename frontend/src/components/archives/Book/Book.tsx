import clsx from "clsx";
import css from "./Book.module.css";
import type { Story } from "../../../types/story";
import type { Category } from "../../../types/category";
import { useTranslation } from "react-i18next";

type BookProps = {
  stories: Story[];
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
  categories: Category[];
  selectedCategoryId: string;
  isSearching: boolean;
};

export default function Book({
  stories,
  totalCount,
  page,
  onPageChange,
  categories,
  selectedCategoryId,
  isSearching,
}: BookProps) {
  const currentCategory = categories.find((c) => c._id === selectedCategoryId);
  const maxPage = Math.max(1, Math.ceil(totalCount / 4));

  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {t("archives.book.title")}
        {currentCategory && (
          <span className={css.categoryName}> {currentCategory.name}</span>
        )}
      </h2>
      <div className={css.sliderWrapper}>
        <button
          type="button"
          className={clsx(css.arrowBtn, css.arrowLeft)}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isSearching}
        >
          <img
            src="/small-left-arrow-dark.png"
            alt="Left arrow"
            className={css.arrowIcon}
          />
        </button>
        <div className={css.bookBg}>
          <div className={css.bookContent}>
            <img
              src="/pattern.png"
              alt="Pattern image"
              className={css.pattern}
            />
            <div className={css.middleLine}></div>
            {Array.from({ length: 4 }).map((_, i) => {
              const story = stories[i];
              return (
                <div
                  key={story ? story._id : `empty-${i}`}
                  className={css.record}
                >
                  <div className={css.recordTop}>
                    <h3 className={css.recordTitle}>
                      {story ? story.title : ""}
                    </h3>
                    <span className={css.recordTitle}>
                      {story
                        ? new Date(story.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <p className={css.recordText}>
                    {story ? story.comment || "" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className={clsx(css.arrowBtn, css.arrowRight)}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= maxPage || isSearching}
        >
          <img
            src="/small-right-arrow-dark.png"
            alt="Right arrow"
            className={css.arrowIcon}
          />
        </button>
      </div>
    </div>
  );
}
