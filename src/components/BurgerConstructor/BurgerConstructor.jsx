import React, {
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { useSelector, shallowEqual } from "react-redux";

import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";

const initialSummPrice = 0;
const reducerSummPrice = (state, ingredients) => {
  let score = ingredients.items.reduce(function (a, b) {
    return a + (b ? b.price : 0);
  }, 0);
  return score;
};

const BurgerConstructor = () => {
  const {
    ingredientsConstructorData,
    bunConstructor,
    ingredientsConstructorRequest,
    ingredientsConstructorFailed,
  } = useSelector(
    (store) => ({
      ingredientsConstructorData:
        store.ingredientsConstructorReducer.ingredientsConstructor,
      bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
      ingredientsConstructorRequest:
        store.ingredientsConstructorReducer.ingredientsConstructorRequest,
      ingredientsConstructorFailed:
        store.ingredientsConstructorReducer.ingredientsConstructorFailed,
    }),
    shallowEqual
  );

  // console.log(useSelector((store) => store.ingredientsConstructorReducer));

  const [modalVisible, setModalVisible] = React.useState(false);

  const [summPrice, setSummPrice] = useReducer(
    reducerSummPrice,
    initialSummPrice
  );

  useEffect(() => {
    let ingr = ingredientsConstructorData.map((el) => el);
    ingr.push(bunConstructor, bunConstructor);
    setSummPrice({ items: ingr });
  }, [ingredientsConstructorData, bunConstructor]);

  const handleOpenModal = (e) => {
    e.preventDefault()
    setModalVisible(true);
  };

  const handleClickCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <div className={styles.content}>
      <div className={[styles.items, "text text_type_main-default"].join(" ")}>
        <div className={[styles.item, styles.item_bun].join(" ")}>
          {bunConstructor && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunConstructor.name + " (верх)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
            />
          )}
        </div>
        <div className={styles.item_middle}>
          {ingredientsConstructorData &&
            ingredientsConstructorData.map((el, index) => (
              <div key={el.key} id={el._id} className={styles.item}>
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
          {bunConstructor && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunConstructor.name + " (низ)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
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
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
      {modalVisible && (
        <Modal onClose={handleClickCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
