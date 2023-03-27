import React, { useMemo, useRef } from "react";
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

  const ref_tabs = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  
  const handleScroll = () => {
    let max = [ref1, ref2, ref3].reduce((acc, curr) =>
      Math.abs(
        ref_tabs.current.getBoundingClientRect().bottom -
          acc.current.getBoundingClientRect().y
      ) <
      Math.abs(
        ref_tabs.current.getBoundingClientRect().bottom -
          curr.current.getBoundingClientRect().y
      )
        ? acc
        : curr
    );
    setCurrentTab(max.current.id)
  };

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
          <div className={[styles.tabs].join(" ")} ref={ref_tabs}>
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
            <div className={styles.content} onScroll={handleScroll}>
              <Ingredients
                title="Булки"
                titleId="buns"
                ingredients={buns}
                refs={ref1}
              />
              <Ingredients
                title="Соусы"
                titleId="sauces"
                ingredients={sauces}
                refs={ref2}
              />
              <Ingredients
                title="Начинки"
                titleId="mains"
                ingredients={mains}
                refs={ref3}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
