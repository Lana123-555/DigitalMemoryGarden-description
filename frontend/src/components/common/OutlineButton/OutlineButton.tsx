import clsx from "clsx";
import css from "./OutlineButton.module.css";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
  to?: string; // Optional prop for navigation
  disabled?: boolean; // Optional prop for disabled state
};

export default function OutlineButton({
  children,
  onClick,
  color = "dark",
  type = "button",
  to,
  disabled = false,
}: Props) {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={clsx(css.button, css[color], disabled && css.disabled)}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {children}
        </Link>
      ) : (
        <button
          className={clsx(css.button, css[color], disabled && css.disabled)}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
}
