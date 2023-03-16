import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { PropTypesDataObject } from "../../utils/types.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./Ingredients/Ingredients";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = React.useState("buns");

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: "smooth" })

  }

  const buns = useMemo(
    () => ingredients.filter((el) => el.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((el) => el.type === "sauce"),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((el) => el.type === "main"),
    [ingredients]
  );

  return (
    <section>
      <div className={[styles.tabs].join(" ")}>
        <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <Ingredients title="Булки" titleId="buns" ingredients={buns} />
        <Ingredients title="Соусы" titleId="sauces" ingredients={sauces} />
        <Ingredients title="Начинки" titleId="mains" ingredients={mains} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypesDataObject.isRequired).isRequired,
};

export default BurgerIngredients;
