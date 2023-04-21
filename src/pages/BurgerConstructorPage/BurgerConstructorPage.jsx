import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from "./BurgerConstructorPage.module.css";

export const BurgerConstructorPage = () => {
  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </>
  );
};

export default BurgerConstructorPage;
