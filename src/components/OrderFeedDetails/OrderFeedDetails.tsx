import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { TIngredient, TIngredientsList } from "../../utils/types";
import styles from "./OrderFeedDetails.module.css";

const initialSummPrice = 0;
const reducerSummPrice = (
  state: number,
  ingredients: TIngredientsList
): number => {
  let score = ingredients.reduce(function (a: number, b: TIngredient) {
    return a + (b ? b.price : 0);
  }, 0);
  return score;
};

const translateStatus = (status: string) => {
  switch (status) {
    case "done":
      return "Выполнен";
    default:
      return status;
  }
};

const OrderFeedDetails = () => {
  const { id } = useParams();
  const [summPrice, setSummPrice] = useReducer(
    reducerSummPrice,
    initialSummPrice
  );
  const [ingr, setIngr] = useState<TIngredientsList>([]);
  // const selectedIngredient = useRootSelector(
  //   (store) => store.ingredientsReducer.ingredients.find((el: TIngredient) => el._id === id),
  //   // shallowEqual
  // );
  const { messages, ingredientsData } = useRootSelector(
    (store) => ({
      messages: store.wsOrdersReducer.messages,
      ingredientsData: store.ingredientsReducer.ingredients,
    })
    // shallowEqual
  );
  const order = messages?.orders.find((el) => el._id === id);

  useEffect(() => {
    let ingr: TIngredientsList = ingredientsData.filter((el: TIngredient) =>
      order?.ingredients.includes(el._id)
    );
    setSummPrice(ingr);
    setIngr(ingr);
  }, [order, ingredientsData]);

  console.log("OrderFeedDetails", messages?.orders);
  return (
    <div className={styles.container}>
      {order && (
        <div className={styles.content}>
          <div className={styles.order__id}>
            <p className="text text_type_digits-default">#{order?.number}</p>
          </div>
          <div className={styles.order__text}>
            <p className={`text text_type_main-medium ${styles.order__text}`}>
              {order?.name}
            </p>
          </div>
          <div className={styles.order__status}>
            <p
              className="text text_type_digits-default"
              style={{ color: "#00CCCC" }}
            >
              {translateStatus(order?.status)}
            </p>
          </div>
          <div className={styles.order__content}>
            <p className={`text text_type_main-medium ${styles.order__text}`}>
              Состав:
            </p>
            <div className={styles.order__ingr}>
              {ingr.map((el, i) => {
                return (
                  <div className={styles.ingr__item}>
                    <div className={styles.ingr__img} key={i}>
                      <img src={el.image} alt={el.name} />
                    </div>
                    <p
                      className={`text text_type_digits-default ${styles.ingr__name}`}
                    >
                      {el.name}
                    </p>
                    <div className={styles.ingr__price}>
                      <p className="text text_type_main-medium">
                        {el.type === "bun" ? "2" : "1"}&nbsp;x&nbsp;{el.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.order__info}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order?.createdAt)} />
            </p>
            <div className={styles.order__price}>
              <p className="text text_type_main-medium">{summPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFeedDetails;
