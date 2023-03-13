import React from "react";
import PropTypes from "prop-types";
import { PropTypesDataObject } from "../../../../utils/types.js";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CardIngredient.module.css";

const CardIngredient = (props) => {
  return (
    <div className={styles.card}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.data.image} alt={props.data.name} className="mb-1" />
      <div className={[styles.price, "mb-1"].join(" ")}>
        <CurrencyIcon type="primary" />
        <p className="text text_type_main-default ml-2">{props.data.price}</p>
      </div>
      <p className={[styles.name, "text text_type_main-default"].join(" ")}>
        {props.data.name}
      </p>
    </div>
  );
};

CardIngredient.propTypes = {
  data: PropTypesDataObject.isRequired,
};

export default CardIngredient;
