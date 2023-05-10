import React from "react";
import styles from "./PlaceHolderCard.module.css";
type TPlaceHolderCardProps = {
  type?: string;
  text?: string;
};

const PlaceHolderCard = ({ type, text }: TPlaceHolderCardProps): JSX.Element => {
  const extraClass =
    type === "top"
      ? "card_pos_top"
      : type === "bottom"
      ? "card_pos_bottom"
      : "card_pos_middle";
  return (
    <div className={styles.item}>
      <div className={`${styles.card} ${styles[extraClass]}`}>
        <div className={styles.card_content}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceHolderCard;
