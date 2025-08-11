import CloseCross from "../CloseCross/CloseCross";
import css from "./SearchBar.module.css";

import { useState, useRef } from "react";
import { searchStories } from "../../../services/story";
import type { Story } from "../../../types/story";
type Props = {
  onClose?: () => void;
  onSearch?: (query: string | Story) => void;
  error?: string;
  source?: "flower" | "candle" | "archive";
  placeholder?: string;
};

export default function SearchBar({
  onClose,
  onSearch,
  error,
  source,
  placeholder = "Enter a name, title, or number",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Story[]>([]);
  const [, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(!!val);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await searchStories(val.trim(), source);
        setResults(res.slice(0, 3));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleSelect = (story: Story) => {
    if (onSearch) onSearch(story);
    setShowDropdown(false);
    setQuery(story.title || story.name || "");
  };

  return (
    <div className={css.container} style={{ position: "relative" }}>
      <form onSubmit={handleSubmit} autoComplete="off" className={css.form}>
        <input
          type="text"
          className={css.input}
          placeholder={placeholder}
          value={query}
          onChange={handleInput}
          onFocus={() => setShowDropdown(!!query)}
          autoComplete="off"
        />
      </form>
      {showDropdown && results.length > 0 && (
        <ul className={css.dropdownList}>
          {results.map((story) => (
            <li
              key={story._id}
              className={css.dropdownItem}
              onMouseDown={() => handleSelect(story)}
            >
              <span className={css.dropdownTitle}>
                {story.title || story.name || "Untitled"}
              </span>
              {story.name && story.title && (
                <span className={css.dropdownAuthor}>by {story.name}</span>
              )}
              {story.storyId && (
                <span className={css.dropdownId}>#{story.storyId}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className={css.cross} onClick={onClose}>
        <CloseCross color="dark" />
      </div>
      {error && <div style={{ color: "#b00", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
