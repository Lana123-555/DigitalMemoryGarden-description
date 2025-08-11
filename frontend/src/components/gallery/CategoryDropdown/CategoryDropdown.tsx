import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllCategories } from "../../../services/category";
import type { Category } from "../../../types/category";
import css from "./CategoryDropdown.module.css";

export default function CategoryDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Load categories from API
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedCategory = categories.find((cat) => cat._id === value);

  return (
    <div className={css.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={css.dropdownButton}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>
          {selectedCategory?.name || t("gallery.gallery.filters.mediaType")}
        </span>
        <img
          src="/dropdown-arrow-down.png"
          alt="Dropdown arrow down"
          className={css.icon}
        />
      </button>
      {open && (
        <ul className={css.dropdownList}>
          <li
            className={css.dropdownItem}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            {t("gallery.gallery.filters.all")}
          </li>
          {categories.map((cat) => (
            <li
              key={cat._id}
              className={css.dropdownItem}
              onClick={() => {
                onChange(cat._id);
                setOpen(false);
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
