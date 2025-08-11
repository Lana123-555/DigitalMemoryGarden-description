import clsx from "clsx";
import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/category";
import type { Category } from "../../../types/category";
import { useTranslation } from "react-i18next";

type Props = {
  onSearch?: () => void;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
};

export default function Hero({
  onSearch,
  selectedCategoryId,
  onCategoryChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleAddStory = () => {
    window.scrollTo({
      top: document.getElementById("add-story")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title={t("archives.hero.title")}>
          {t("archives.hero.subtitle")}
        </HeroTitleAndSubtitle>

        <div className={css.content}>
          <div className={css.row}>
            <div className={css.booksWrapper}>
              {typeof window !== "undefined" && window.innerWidth <= 768
                ? categories.map((category) => (
                    <div
                      key={category._id}
                      className={clsx(
                        css.book,
                        category._id === selectedCategoryId && css.selectedBook
                      )}
                      onClick={() => onCategoryChange(category._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={css.bookTitle}>{category.name}</p>
                    </div>
                  ))
                : Array.from({ length: 9 }).map((_, i) => {
                    const category = categories[i];
                    return (
                      <div
                        key={category ? category._id : `empty-${i}`}
                        className={clsx(
                          css.book,
                          category &&
                            category._id === selectedCategoryId &&
                            css.selectedBook
                        )}
                        onClick={() =>
                          category && onCategoryChange(category._id)
                        }
                        style={{ cursor: category ? "pointer" : "default" }}
                      >
                        {category && (
                          <p className={css.bookTitle}>{category.name}</p>
                        )}
                      </div>
                    );
                  })}
            </div>
            <div className={css.btnsWrapper}>
              <OutlineButton onClick={onSearch}>
                {t("archives.hero.findStory")}
              </OutlineButton>
              <OutlineButton onClick={handleAddStory}>
                {t("archives.hero.addStory")}
              </OutlineButton>
            </div>
          </div>
          <div className={css.blueSection}></div>
        </div>
      </div>
    </>
  );
}
