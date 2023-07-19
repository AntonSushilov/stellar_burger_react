import { useReducer, useEffect, useState } from "react";
import styles from "./OrderCard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  IOrderDetails,
  TIngredient,
  TIngredientsList,
} from "../../utils/types";
import { useRootSelector } from "../../hooks/UseRootSelector";
type TOrderCard = {
  order: IOrderDetails;
};

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

const OrderCard = ({ order }: TOrderCard): JSX.Element => {
  const createdAt = new Date(order.createdAt);
  const [summPrice, setSummPrice] = useReducer(
    reducerSummPrice,
    initialSummPrice
  );
  const [ingr, setIngr] = useState<TIngredientsList>([]);
  const { ingredientsData } = useRootSelector(
    (store) => ({
      ingredientsData: store.ingredientsReducer.ingredients,
    })
    // shallowEqual
  );
  useEffect(() => {
    let ingr: TIngredientsList = ingredientsData.filter((el: TIngredient) =>
      order.ingredients.includes(el._id)
    );
    setSummPrice(ingr);
    setIngr(ingr);
  }, [order, ingredientsData]);
  return (
    <div className={styles.card__order}>
      <div className={styles.order__id}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={createdAt} />
        </p>
      </div>
      <div>
        <p className={`text text_type_main-medium ${styles.order__text}`}>
          {order.name}
        </p>
      </div>
      <div className={styles.order__content}>
        <div className={styles.order__ingr}>
          <ul className={styles.ingr__list}>
            {order.ingredients.map((el, i) => {
              const ingredient = ingr.find(el2 => el2._id === el)
              if (i < 5) {
                return (
                  <li className={styles.ingr__item} key={i}>
                    <img
                      src={ingredient?.image}
                      className={styles.ingr__img}
                      alt={ingredient?.name}
                    />
                  </li>
                );
              } else if (i === 6) {
                return (
                  <li className={styles.ingr__item} key={i}>
                    <p className={`${styles.ingr__length} text text_type_digits-default`}>{`+${ingr.length - 5}`}</p>
                    <img
                      src={ingredient?.image}
                      className={`${styles.ingr__img} ${styles.ingr_img_6th}`}
                      alt={ingredient?.name}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.order__price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_main-medium">{summPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
