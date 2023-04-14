import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useDrag } from "react-dnd";
import { PropTypesDataObject } from "../../../../utils/types.js";
import Modal from "../../../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setSelectIngredient,
  deleteSelectIngredient,
} from "../../../../services/BurgerIngredients/action";
import { openModal } from "../../../../services/Modal/action.js";
import styles from "./CardIngredient.module.css";

const CardIngredient = (props) => {
  const { _id } = props.data;
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [count, setCount] = React.useState();
  const { ingredientsConstructorData, bunConstructor } = useSelector(
    (store) => ({
      ingredientsConstructorData:
        store.ingredientsConstructorReducer.ingredientsConstructor,
      bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (props.data.type === "bun" && bunConstructor) {
      setCount(bunConstructor._id === props.data._id ? 1 : 0);
    } else {
      setCount(
        ingredientsConstructorData.filter((el) => el._id === props.data._id)
          .length
      );
    }
  }, [ingredientsConstructorData, bunConstructor]);

  const [modalVisible, setModalVisible] = React.useState(false);

  const dispatch = useDispatch();
  const handleOpenModal = (el) => {
    // dispatch(setSelectIngredient(el));
    dispatch(openModal())
    // setModalVisible(true);
  };

  const handleClickCloseModal = useCallback(() => {
    dispatch(deleteSelectIngredient());

    setModalVisible(false);
  }, []);

  let location = useLocation();
  return (
    <>
      <Link to={`/ingredients/${_id}`} state={{backgroundLocation: location}}>
        <div
          className={styles.card}
          ref={dragRef}
          onClick={() => handleOpenModal(props.data)}
        >
          <Counter count={count} size="default" extraClass="m-1" />
          <img src={props.data.image} alt={props.data.name} className="mb-1" />
          <div className={[styles.price, "mb-1"].join(" ")}>
            <CurrencyIcon type="primary" />
            <p className="text text_type_main-default ml-2">
              {props.data.price}
            </p>
          </div>
          <p className={[styles.name, "text text_type_main-default"].join(" ")}>
            {props.data.name}
          </p>
        </div>
        {/* {modalVisible && (
          <Modal onClose={handleClickCloseModal} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        )} */}
      </Link>
    </>
  );
};

CardIngredient.propTypes = {
  data: PropTypesDataObject.isRequired,
};

export default CardIngredient;
