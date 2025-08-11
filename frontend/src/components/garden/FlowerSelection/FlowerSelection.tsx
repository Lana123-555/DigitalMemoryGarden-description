import SelectionSlider from "../../common/SelectionSlider/SelectionSlider";
import css from "./FlowerSelection.module.css";

type Category = {
  _id: string;
  name: string;
  description?: string;
  flowerImage: string;
};

type Props = {
  categories?: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function FlowerSelection({
  categories = [],
  selectedId,
  onSelect,
}: Props) {
  const current =
    categories.length && selectedId
      ? categories.find((cat) => cat._id === selectedId)
      : undefined;

  return (
    <div className={css.container}>
      {current && (current.name || current.description) && (
        <div className={css.titleWrapper}>
          {current.name && <h2 className={css.title}>{current.name}</h2>}
          {current.description && (
            <p className={css.subtitle}>{current.description}</p>
          )}
        </div>
      )}

      <div className={css.sliderWrapper}>
        <SelectionSlider
          items={categories.map((cat) => ({
            id: cat._id,
            name: cat.name,
            image: cat.flowerImage,
            description: cat.description,
          }))}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
