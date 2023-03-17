import React, { useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import uuid from "react-uuid";
import styles from "./BurgerConstructor.module.css";
import { PropTypesDataObject } from "../../utils/types.js";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import Modal from '../ModalWindow/Modal/Modal'
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import {
  IngredientsContext,
  ConstructorContext,
  OrderContext,
} from "../../services/appContext.js";

const initialSummPrice = 0;
const reducerSummPrice = (state, ingredients) => {
  let score = ingredients.items.reduce(function (a, b) {
    return a + (b ? b.price : 0);
  }, 0);
  return score;
};

const BurgerConstructor = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { constructorData, setConstructorData } =
    useContext(ConstructorContext);
  const { order, setOrder } = useContext(OrderContext);
  const [bunSelected, setBunSelected] = React.useState(null);
  const [ingredientsSelected, setIngredientsSelected] = React.useState([]);
  // const [summPrice, setSummPrice] = React.useState(0);

  const [summPrice, setSummPrice] = useReducer(
    reducerSummPrice,
    initialSummPrice
  );

  const [loadingOrder, setLoadingOrder] = React.useState(false);

  useEffect(() => {
    setBunSelected(constructorData.find((el) => el.type === "bun"));
    setIngredientsSelected(constructorData.filter((el) => el.type !== "bun"));
  }, [constructorData]);

  useEffect(() => {
    let ingr = ingredientsSelected.map((el) => el);
    ingr.push(bunSelected,bunSelected);
    setSummPrice({ items: ingr });
  }, [ingredientsSelected, bunSelected]);

  const postOrder = async () => {
    const url = "https://norma.nomoreparties.space/api/orders";
    let ids = ingredientsSelected.map((el) => el._id);
    if (bunSelected) {
      ids.push(bunSelected._id, bunSelected._id);
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ids }),
    };
    setLoadingOrder(true);
    let response = await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data.order.number);
        setLoadingOrder(false);
      });
  };

  const handleOpenModal = (el) => {
    if (constructorData.length > 0) {
      postOrder();
      setModalVisible(true);
    } else {
      alert("Выберите ингредиенты.");
    }
  };

  const handleClickCloseModal = useCallback(() => {
    setModalVisible(false);
    setOrder(null);
  }, []);

  return (
    <div className={styles.content}>
      <div className={[styles.items, "text text_type_main-default"].join(" ")}>
        <div className={[styles.item, styles.item_bun].join(" ")}>
          {bunSelected && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunSelected.name + " (верх)"}
              price={bunSelected.price}
              thumbnail={bunSelected.image}
            />
          )}
        </div>
        <div className={styles.item_middle}>
          {ingredientsSelected &&
            ingredientsSelected.map((el, index) => (
              <div key={uuid()} id={el._id} className={styles.item}>
                <DragIcon type="primary" />
                <ConstructorElement
                  type=""
                  isLocked={false}
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </div>
            ))}
        </div>
        <div className={[styles.item, styles.item_bun].join(" ")}>
          {bunSelected && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunSelected.name + " (низ)"}
              price={bunSelected.price}
              thumbnail={bunSelected.image}
            />
          )}
        </div>
      </div>
      <div className={styles.order}>
        <div
          className={[
            styles.summ_price,
            "text text_type_main-default mr-10",
          ].join(" ")}
        >
          <p className="text text_type_digits-medium mr-3">{summPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => handleOpenModal()}
        >
          Оформить заказ
        </Button>
      </div>
      {modalVisible && (
        <Modal onClose={handleClickCloseModal}>
          <OrderDetails loading={loadingOrder} orderId={order} />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypesDataObject.isRequired),
};

export default BurgerConstructor;
