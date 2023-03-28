import React from "react";
import PropTypes from "prop-types";
import styles from "./PlaceHolderCard.module.css";
const PlaceHolderCard = ({ type, text }) => {
  const extraClass = type === 'top' ? 'card_pos_top' : type === 'bottom'? 'card_pos_bottom': 'card_pos_middle'
  console.log(extraClass)
  return (
    <div className={styles.item}>
      <div
        className={`${styles.card} ${
          styles[extraClass]
        }`}
      >
        <div className={styles.card_content}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

PlaceHolderCard.propTypes = {};

export default PlaceHolderCard;
