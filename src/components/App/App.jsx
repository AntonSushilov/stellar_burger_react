import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PreLoader from "../PreLoader/PreLoader";
import Error from "../Error/Error";
import {
  IngredientsContext,
  ConstructorContext,
  OrderContext,
} from "../../services/appContext.js";
import { requestApi } from "../../utils/requestApi";

const App = (props) => {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [constructorData, setConstructorData] = useState([]);
  const [order, setOrder] = React.useState(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestApi("/ingredients")
      .then((res) => {
        setIngredientsData(res.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setIngredientsData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <IngredientsContext.Provider
      value={{ ingredientsData, setIngredientsData }}
    >
      <ConstructorContext.Provider
        value={{ constructorData, setConstructorData }}
      >
        <OrderContext.Provider value={{ order, setOrder }}>
          <div className={styles.app}>
            <AppHeader />
            <main className={styles.container}>
              {loading ? (
                <PreLoader />
              ) : error ? (
                <Error />
              ) : (
                <>
                  <p className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                  </p>
                  {ingredientsData && (
                    <div className={styles.content}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </OrderContext.Provider>
      </ConstructorContext.Provider>
    </IngredientsContext.Provider>
  );
};

export default App;
