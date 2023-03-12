import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App = (props) => {
  const mainUrl = "https://norma.nomoreparties.space";
  const [productsData, setProductData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${mainUrl}/api/ingredients`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const actualData = await response.json();
        setProductData(actualData.data);
        setError(false);
      } catch {
        setError(true);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };
    getProductsData();
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.container}>
          <p className="text text_type_main-large mt-10 mb-5">
            {loading
              ? "Идет загрузка данных..."
              : error
              ? "Возникла ошибка"
              : "Соберите бургер"}
          </p>
          {productsData && (
            <div className={styles.content}>
              <BurgerIngredients data={productsData} />
              <BurgerConstructor data={productsData} />
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
