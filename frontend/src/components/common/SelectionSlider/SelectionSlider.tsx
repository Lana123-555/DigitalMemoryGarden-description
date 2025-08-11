import OutlineButton from "../OutlineButton/OutlineButton";
import css from "./SelectionSlider.module.css";

type SelectionItem = {
  id: string;
  name?: string;
  image: string;
  description?: string;
};

type Props = {
  items: SelectionItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  maxImageWidth?: number;
  buttonColor?: "light" | "dark";
};

export default function SelectionSlider({
  items,
  selectedId,
  onSelect,
  maxImageWidth,
  buttonColor = "dark",
}: Props) {
  const currentIdx = items.findIndex((item) => item.id === selectedId);

  const handlePrev = () => {
    if (!items.length) return;
    const prevIdx = (currentIdx - 1 + items.length) % items.length;
    onSelect(items[prevIdx].id);
  };

  const handleNext = () => {
    if (!items.length) return;
    const nextIdx = (currentIdx + 1) % items.length;
    onSelect(items[nextIdx].id);
  };

  const current = items[currentIdx];

  if (!current) {
    return null;
  }

  return (
    <div className={css.slider}>
      {current.image && (
        <img
          src={current.image}
          alt={current.name || "item"}
          className={css.flower}
          style={maxImageWidth ? { maxWidth: `${maxImageWidth}px` } : {}}
        />
      )}
      <div className={css.btnsWrapper}>
        <OutlineButton onClick={handlePrev} color={buttonColor}>
          <img
            src={`/small-left-arrow-${buttonColor}.png`}
            alt="Left arrow"
            className={css.arrow}
          />
        </OutlineButton>
        <OutlineButton onClick={handleNext} color={buttonColor}>
          <img
            src={`/small-right-arrow-${buttonColor}.png`}
            alt="Right arrow"
            className={css.arrow}
          />
        </OutlineButton>
      </div>
    </div>
  );
}
