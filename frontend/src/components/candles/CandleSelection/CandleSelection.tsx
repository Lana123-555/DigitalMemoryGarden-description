import SelectionSlider from "../../common/SelectionSlider/SelectionSlider";
import type { CandleType } from "../../../types/candleType";
import css from "./CandleSelection.module.css";

type Props = {
  candleTypes: CandleType[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function CandleSelection({
  candleTypes = [],
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className={css.container}>
      <div className={css.sliderWrapper}>
        <SelectionSlider
          items={candleTypes.map((candleType) => ({
            id: candleType._id,
            image: candleType.image,
            name: candleType.name,
          }))}
          selectedId={selectedId}
          onSelect={onSelect}
          maxImageWidth={200}
          buttonColor="light"
        />
      </div>
    </div>
  );
}
