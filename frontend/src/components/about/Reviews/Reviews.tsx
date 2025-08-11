import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import reviewsData from "../../../data/reviews.json";
import css from "./Reviews.module.css";

type Review = {
  id: number;
  author: string;
  date: string;
  text: string;
  icon: string;
};

export default function Reviews() {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [usedReviews, setUsedReviews] = useState<number[]>([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * reviewsData.length);
    const initialReview = reviewsData[randomIndex];
    setCurrentReview(initialReview);
    setUsedReviews([initialReview.id]);
  }, []);

  const getRandomReview = () => {
    const availableReviews = reviewsData.filter(
      (review) => !usedReviews.includes(review.id)
    );

    const reviewsToChooseFrom =
      availableReviews.length > 0 ? availableReviews : reviewsData;

    if (availableReviews.length === 0) {
      setUsedReviews([]);
    }

    const randomIndex = Math.floor(Math.random() * reviewsToChooseFrom.length);
    const selectedReview = reviewsToChooseFrom[randomIndex];

    setUsedReviews((prev) => [...prev, selectedReview.id]);
    setCurrentReview(selectedReview);
  };
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>{t("about.reviews.title")}</h2>
        <div className={css.content}>
          <div className={css.col}>
            <img
              src="/glass-jar.png"
              alt="Glass jar with reviews"
              className={css.image}
            />
          </div>
          <div className={css.col}>
            <AnimatePresence mode="wait">
              {currentReview && (
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={css.review}
                >
                  <p className={css.reviewText}>{currentReview.text}</p>
                  <div className={css.reviewRow}>
                    <span className={css.reviewAuthor}>
                      {currentReview.author}{" "}
                      <span className={css.reviewIcon}>
                        {currentReview.icon}
                      </span>
                    </span>
                    <span className={css.reviewDate}>{currentReview.date}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <OutlineButton onClick={getRandomReview}>
              {t("about.reviews.button")}
            </OutlineButton>
          </div>
        </div>
        <div className={css.blueSection}></div>
      </div>
    </>
  );
}
