// components/common/LoadingSpinner/LoadingSpinner.tsx
import css from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={css.spinner}>
      <div className={css.circle}></div>
    </div>
  );
}
