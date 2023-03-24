import React, { useContext, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { PropTypesDataObject } from "../../../../utils/types.js";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../Modal/Modal";
import ModalIngredient from "../IngredientDetails/IngredientDetails";
import uuid from "react-uuid";
import styles from "./CardIngredient.module.css";

import {
  addIngredientConstructor,
  addBunConstructor,
} from "../../../../services/BurgerConstructor/action";

const CardIngredient = (props) => {
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
    if (props.data.type == "bun" && bunConstructor) {
      setCount(bunConstructor._id == props.data._id ? 1 : 0);
    } else {
      setCount(
        ingredientsConstructorData.filter((el) => el._id === props.data._id)
          .length
      );
    }
  }, [ingredientsConstructorData, bunConstructor]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [ingredient, setIngredient] = React.useState();

  const dispatch = useDispatch();
  const handleOpenModal = (el) => {
    if (el.type === "bun") {
      dispatch(addBunConstructor({ ...el, key: uuid() }));
    } else {
      dispatch(addIngredientConstructor({ ...el, key: uuid() }));
    }
    setModalVisible(true);
    setIngredient(el);
  };

  const handleClickCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <div className={styles.card} onClick={() => handleOpenModal(props.data)}>
        <Counter count={count} size="default" extraClass="m-1" />
        <img src={props.data.image} alt={props.data.name} className="mb-1" />
        <div className={[styles.price, "mb-1"].join(" ")}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_main-default ml-2">{props.data.price}</p>
        </div>
        <p className={[styles.name, "text text_type_main-default"].join(" ")}>
          {props.data.name}
        </p>
      </div>
      {modalVisible && (
        <Modal onClose={handleClickCloseModal} title="Детали ингредиента">
          <ModalIngredient data={ingredient} />
        </Modal>
      )}
    </>
  );
};

CardIngredient.propTypes = {
  data: PropTypesDataObject.isRequired,
};

export default CardIngredient;
