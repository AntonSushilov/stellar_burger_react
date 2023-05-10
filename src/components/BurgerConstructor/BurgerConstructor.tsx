import React, { useEffect, useReducer } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import IngredientCard from "./IngredientCard/IngredientCard";
import PlaceHolderCard from "./PlaceHolderCard/PlaceHolderCard";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { TIngredient, TIngredientConstructor, TIngredientConstructorList } from "../../utils/types";
const initialSummPrice = 0;
const reducerSummPrice = (state: number, ingredients: TIngredientConstructorList): number => {
  let score = ingredients.reduce(function (a: number, b: TIngredientConstructor) {
    return a + (b ? b.price : 0);
  }, 0);
  return score;
};

const BurgerConstructor = (): JSX.Element => {
  const location = useLocation();

  const dispatch = useDispatch();

  const { user, ingredientsData, ingredientsConstructorData, bunConstructor } =
    useRootSelector(
      (store) => ({
        user: store.userReducer.user,
        ingredientsData: store.ingredientsReducer.ingredients,
        ingredientsConstructorData:
          store.ingredientsConstructorReducer.ingredientsConstructor,
        bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
      }),
      // shallowEqual
    );

  const onDropHandler = (ingr: TIngredient) => {
    const el = ingredientsData.find((el: TIngredient) => el._id === ingr._id);
    if (el.type === "bun") {
      dispatch(addBunConstructor({ ...el, key: uuid() }));
    } else {
      dispatch(addIngredientConstructor({ ...el, key: uuid() }));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(id: TIngredient) {
      onDropHandler(id);
    },
  });

  const [summPrice, setSummPrice] = useReducer(
    reducerSummPrice,
    initialSummPrice
  );

  useEffect(() => {
    let ingr = ingredientsConstructorData.map((el: TIngredientConstructor) => el);
    ingr.push(bunConstructor, bunConstructor);
    setSummPrice(ingr);
  }, [ingredientsConstructorData, bunConstructor]);

  const navigate = useNavigate()
  const handleOpenModal = () => {
    // e.preventDefault();
    if (bunConstructor && ingredientsConstructorData.length) {
      // setModalVisible(true);
      // dispatch(openModal());
      console.log("tyt")
      navigate("/order-details")
      // return <Navigate to="/order-details"/>
    } else {
      if (user) {
        alert("Добавьте булку и ингредиенты");
      }
    }
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
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
            ingredientsConstructorData.map((el: TIngredientConstructor) => (
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
