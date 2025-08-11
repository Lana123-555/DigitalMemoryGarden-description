import { useState, useRef, useEffect } from "react";
import css from "./CategoryDropdown.module.css";
import { useTranslation } from "react-i18next";

type Category = { value: string; label: string };

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Category[];
  name?: string;
}

export default function CategoryDropdown({
  value,
  onChange,
  options,
  name,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  const { t } = useTranslation();

  return (
    <div ref={ref} className={css.dropdownWrapper}>
      <button
        type="button"
        className={css.input}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        name={name}
      >
        <span style={{ color: value ? "#0F1A2C" : "#50667B" }}>
          {selected ? selected.label : t("archives.addStory.category")}
        </span>
        <svg
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="#50667B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul className={css.dropdownList} role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={css.dropdownItem}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              aria-selected={opt.value === value}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
