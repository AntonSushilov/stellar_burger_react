import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { useDrag } from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import { openModal } from "../../../../services/Modal/action.js";
import styles from "./CardIngredient.module.css";
import { TIngredient, TIngredientConstructor } from "../../../../utils/types";
import { useRootSelector } from "../../../../hooks/UseRootSelector";
import { useAppDispatch } from "../../../../hooks/UseAppDispatch";

type TCardIngredientProps = {
  data: TIngredient;
};

const CardIngredient = ({ data }: TCardIngredientProps): JSX.Element => {
  const { _id } = data;
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [count, setCount] = useState<number>(0);
  const { ingredientsConstructorData, bunConstructor } = useRootSelector(
    (store) => ({
      ingredientsConstructorData:
        store.ingredientsConstructorReducer.ingredientsConstructor,
      bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
    })
    // shallowEqual
  );

  useEffect(() => {
    if (data.type === "bun" && bunConstructor) {
      setCount(bunConstructor._id === data._id ? 1 : 0);
    } else {
      setCount(
        ingredientsConstructorData.filter(
          (el: TIngredientConstructor) => el._id === data._id
        ).length
      );
    }
  }, [ingredientsConstructorData, bunConstructor]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  // const handleOpenModal = () => {
  //   // dispatch(openModal());
  //   navigate("/ingredients/")

  // };

  const location = useLocation();
  return (
    <>
      <Link to={`/ingredients/${_id}`} state={{ background: location }}>
        <div className={styles.card} ref={dragRef}>
          <Counter count={count} size="default" extraClass="m-1" />
          <img src={data.image} alt={data.name} className="mb-1" />
          <div className={[styles.price, "mb-1"].join(" ")}>
            <CurrencyIcon type="primary" />
            <p className="text text_type_main-default ml-2">{data.price}</p>
          </div>
          <p className={[styles.name, "text text_type_main-default"].join(" ")}>
            {data.name}
          </p>
        </div>
      </Link>
    </>
  );
};

export default CardIngredient;
