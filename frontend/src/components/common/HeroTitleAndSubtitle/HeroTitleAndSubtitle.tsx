import clsx from "clsx";
import css from "./HeroTitleAndSubtitle.module.css";

type Props = {
  title?: string;
  children?: string;
  color?: string;
};

export default function HeroTitleAndSubtitle({
  title,
  children,
  color = "dark",
}: Props) {
  return (
    <>
      <div className={css.container}>
        <h1 className={clsx(css.title, css[`${color}Title`])}>{title}</h1>
        <p className={clsx(css.subtitle, css[`${color}Subtitle`])}>
          {children}
        </p>
      </div>
    </>
  );
}
