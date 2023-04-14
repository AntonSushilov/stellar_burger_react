import React, { useEffect, useReducer, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { deleteOrderDetails } from "../../services/OrderDetails/action";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { useDrop } from "react-dnd";
import uuid from "react-uuid";
import {
  addIngredientConstructor,
  addBunConstructor,
  sortIngredientConstructor,
} from "../../services/BurgerConstructor/action";
import { openModal } from "../../services/Modal/action";
import { IngredientCard } from "./IngredientCard/IngredientCard";
import PlaceHolderCard from "./PlaceHolderCard/PlaceHolderCard";
const initialSummPrice = 0;
const reducerSummPrice = (state, ingredients) => {
  let score = ingredients.items.reduce(function (a, b) {
    return a + (b ? b.price : 0);
  }, 0);
  return score;
};

const BurgerConstructor = () => {
  const location = useLocation();


  const dispatch = useDispatch();

  const { ingredientsData, ingredientsConstructorData, bunConstructor } =
    useSelector(
      (store) => ({
        ingredientsData: store.ingredientsReducer.ingredients,
        ingredientsConstructorData:
          store.ingredientsConstructorReducer.ingredientsConstructor,
        bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
      }),
      shallowEqual
    );

  const onDropHandler = (id) => {
    const el = ingredientsData.find((el) => el._id === id._id);
    if (el.type === "bun") {
      dispatch(addBunConstructor({ ...el, key: uuid() }));
    } else {
      dispatch(addIngredientConstructor({ ...el, key: uuid() }));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(id) {
      onDropHandler(id);
    },
  });

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
    // e.preventDefault();
    if (bunConstructor && ingredientsConstructorData.length) {
      // setModalVisible(true);
      dispatch(openModal());
    } else {
      alert("Добавьте булку и ингредиенты");
    }
  };


  const moveCard = (dragIndex, hoverIndex) => {
    const dragIngredient = ingredientsConstructorData[dragIndex];
    const newIngredients = [...ingredientsConstructorData];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    dispatch(sortIngredientConstructor(newIngredients));
  };

  return (
    <div className={styles.content}>
      <div
        className={[styles.items, "text text_type_main-default"].join(" ")}
        ref={dropTarget}
      >
        <div className={[styles.item, styles.item_bun].join(" ")}>
          {bunConstructor ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunConstructor.name + " (верх)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
            />
          ) : (
            <PlaceHolderCard type="top" text="Перетащите булку" />
          )}
        </div>
        <div className={styles.item_middle}>
          {ingredientsConstructorData.length ? (
            ingredientsConstructorData.map((el, index) => (
              <IngredientCard key={el.key} data={el} moveCard={moveCard} />
            ))
          ) : (
            <PlaceHolderCard text="Перетащите ингредиент" />
          )}
        </div>
        <div className={[styles.item, styles.item_bun].join(" ")}>
          {bunConstructor ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunConstructor.name + " (низ)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
            />
          ) : (
            <PlaceHolderCard type="bottom" text="Перетащите булку" />
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
        <Link to={`/order-details`} state={{ background: location }}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleOpenModal}
          >
            Оформить заказ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BurgerConstructor;
