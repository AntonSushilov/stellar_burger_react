import React, { useMemo } from "react";
import { useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PreLoader from "../PreLoader/PreLoader";
import Error from "../Error/Error";
import Ingredients from "./Ingredients/Ingredients";
import styles from "./BurgerIngredients.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getIngredients } from "../../services/BurgerIngredients/action";
const BurgerIngredients = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getIngredients());
  }, []);

  const { ingredientsData, ingredientsRequest, ingredientsFailed } =
    useSelector(
      (store) => ({
        ingredientsData: store.ingredientsReducer.ingredients,
        ingredientsRequest: store.ingredientsReducer.ingredientsRequest,
        ingredientsFailed: store.ingredientsReducer.ingredientsFailed,
      }),
      shallowEqual
    );

  const [currentTab, setCurrentTab] = React.useState("buns");

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const buns = useMemo(
    () => ingredientsData.filter((el) => el.type === "bun"),
    [ingredientsData]
  );

  const sauces = useMemo(
    () => ingredientsData.filter((el) => el.type === "sauce"),
    [ingredientsData]
  );

  const mains = useMemo(
    () => ingredientsData.filter((el) => el.type === "main"),
    [ingredientsData]
  );

  return (
    <section>
      {ingredientsRequest ? (
        <PreLoader />
      ) : ingredientsFailed ? (
        <Error />
      ) : (
        <>
          <div className={[styles.tabs].join(" ")}>
            <Tab
              value="buns"
              active={currentTab === "buns"}
              onClick={onTabClick}
            >
              Булки
            </Tab>
            <Tab
              value="sauces"
              active={currentTab === "sauces"}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
            <Tab
              value="mains"
              active={currentTab === "mains"}
              onClick={onTabClick}
            >
              Начинки
            </Tab>
          </div>
          {ingredientsData && (
            <div className={styles.content}>
              <Ingredients title="Булки" titleId="buns" ingredients={buns} />
              <Ingredients
                title="Соусы"
                titleId="sauces"
                ingredients={sauces}
              />
              <Ingredients
                title="Начинки"
                titleId="mains"
                ingredients={mains}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
