import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { PropTypesDataObject } from "../../../../utils/types.js";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../Modal/Modal";
import ModalIngredient from "../IngredientDetails/IngredientDetails";
import styles from "./CardIngredient.module.css";
import {
  IngredientsContext,
  ConstructorContext,
} from "../../../../services/appContext.js";

const CardIngredient = (props) => {
  const { constructorData, setConstructorData } =
  useContext(ConstructorContext);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [ingredient, setIngredient] = React.useState();

  const handleOpenModal = (el) => {
    if(el.type === "bun"){
      setConstructorData([...constructorData.filter((el)=>el.type !== "bun"), el])
    }else{
      setConstructorData([...constructorData, el])
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
        <Counter count={1} size="default" extraClass="m-1" />
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
