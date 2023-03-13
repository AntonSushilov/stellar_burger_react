import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { PropTypesDataObject } from "../../utils/types.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./Ingredients/Ingredients";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section>
      <div className={[styles.tabs, "mb-10"].join(" ")}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <Ingredients
          title="Булки"
          data={props.data.filter((el) => el.type === "bun")}
        />
        <Ingredients
          title="Соусы"
          data={props.data.filter((el) => el.type === "sauce")}
        />
        <Ingredients
          title="Начинки"
          data={props.data.filter((el) => el.type === "main")}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypesDataObject),
};

export default BurgerIngredients;
