import React, { useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PreLoader from "../PreLoader/PreLoader";
import Error from "../Error/Error";
import Ingredients from "./Ingredients/Ingredients";
import styles from "./BurgerIngredients.module.css";
import { shallowEqual } from "react-redux";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { TIngredient, TIngredientsList } from "../../utils/types";
const BurgerIngredients = (): JSX.Element => {
  const { ingredientsData, ingredientsRequest, ingredientsFailed } =
    useRootSelector(
      (store) => ({
        ingredientsData: store.ingredientsReducer.ingredients,
        ingredientsRequest: store.ingredientsReducer.ingredientsRequest,
        ingredientsFailed: store.ingredientsReducer.ingredientsFailed,
      })
      // shallowEqual
    );

  const [currentTab, setCurrentTab] = React.useState("buns");

  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollBoxBottom =
      scrollBoxRef.current?.getBoundingClientRect().bottom;
    const bunsTop = bunsRef.current?.getBoundingClientRect().top;
    const saucesTop = saucesRef.current?.getBoundingClientRect().top;
    const mainsTop = mainsRef.current?.getBoundingClientRect().top;
    if (scrollBoxBottom && bunsTop && saucesTop && mainsTop) {
      const bunsActive = bunsTop - scrollBoxBottom;
      const saucesActive = saucesTop - scrollBoxBottom;
      const mainsActive = mainsTop - scrollBoxBottom;
      if (bunsActive <= 0 && saucesActive > 0 && mainsActive > 0) {
        setCurrentTab("buns");
      }
      if (bunsActive < 0 && saucesActive <= 0 && mainsActive > 0) {
        setCurrentTab("sauces");
      }
      if (bunsActive < 0 && saucesActive < 0 && mainsActive <= 0) {
        setCurrentTab("mains");
      }
    }
  };

  const onTabClick = (tab: string) => {
    console.log(tab);
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const buns: TIngredientsList = useMemo(
    () => ingredientsData.filter((el: TIngredient) => el.type === "bun"),
    [ingredientsData]
  );

  const sauces: TIngredientsList = useMemo(
    () => ingredientsData?.filter((el: TIngredient) => el.type === "sauce"),
    [ingredientsData]
  );

  const mains: TIngredientsList = useMemo(
    () => ingredientsData?.filter((el: TIngredient) => el.type === "main"),
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
          <div className={[styles.tabs].join(" ")} ref={scrollBoxRef}>
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
            <div
              data-cy="ingredients-container"
              className={styles.content}
              onScroll={handleScroll}
            >
              <Ingredients
                title="Булки"
                titleId="buns"
                ingredients={buns}
                ref={bunsRef}
              />
              <Ingredients
                title="Соусы"
                titleId="sauces"
                ingredients={sauces}
                ref={saucesRef}
              />
              <Ingredients
                title="Начинки"
                titleId="mains"
                ingredients={mains}
                ref={mainsRef}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
