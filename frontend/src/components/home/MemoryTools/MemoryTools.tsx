import { useTranslation } from "react-i18next";
import css from "./MemoryTools.module.css";

type Props = {
  onToolClick: (tool: "a" | "b" | "c") => void;
};

export default function MemoryTools({ onToolClick }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>{t("home.memoryTools.title")}</h2>
        <div className={css.tools}>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-flower.png"
                alt="Flower image"
                className={css.toolImage}
              />
              <button
                className={css.toolButton}
                onClick={() => onToolClick("a")}
              >
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>
              {t("home.memoryTools.flower.title")}
            </h3>
          </div>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-candle.png"
                alt="Candle image"
                className={css.toolImage}
              />
              <button
                className={css.toolButton}
                onClick={() => onToolClick("b")}
              >
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>
              {t("home.memoryTools.candle.title")}
            </h3>
          </div>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-books.png"
                alt="Books image"
                className={css.toolImage}
              />
              <button
                className={css.toolButton}
                onClick={() => onToolClick("c")}
              >
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>
              {t("home.memoryTools.archive.title")}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
