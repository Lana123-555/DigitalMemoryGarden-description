import clsx from "clsx";
import css from "./CloseCross.module.css";

export default function CloseCross({ color = "dark" }: { color?: string }) {
  return (
    <>
      <div className={css.container}>
        <span className={clsx(css.line, css[color])}></span>
        <span className={clsx(css.line, css[color])}></span>
      </div>
    </>
  );
}
