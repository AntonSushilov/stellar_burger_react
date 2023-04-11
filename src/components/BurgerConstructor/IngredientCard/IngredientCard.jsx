import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteIngredientConstructor,
} from "../../../services/BurgerConstructor/action";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import {PropTypesDataObject} from "../../../utils/types"
import styles from "./IngredientCard.module.css";

export const IngredientCard = ({ data, moveCard }) => {
  const {
    ingredientsConstructorData,
  } = useSelector(
    (store) => ({
      ingredientsConstructorData:
        store.ingredientsConstructorReducer.ingredientsConstructor,
    }),
    shallowEqual
  );

  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleClose = (key) => {
    dispatch(deleteIngredientConstructor(key));
  };

  const [, drop] = useDrop({
    accept: "ingredientCard",
    hover: (item, monitor) => {
      const dragIndex = ingredientsConstructorData.indexOf(
        ingredientsConstructorData.find((el) => el.key === item.key)
      );
      const hoverIndex = ingredientsConstructorData.indexOf(
        ingredientsConstructorData.find((el) => el.key === data.key)
      );
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex
    },
  });
  const {key} = data
  const [{ isDragging }, drag] = useDrag({
    type: "ingredientCard",
    item: { key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      key={data.key}
      id={data._id}
      className={styles.item}
      ref={ref}
      style={{ opacity }}
    >
      <div className={styles.dragicon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type=""
        isLocked={false}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleClose(data.key)}
      />
    </div>
  );
};

IngredientCard.propTypes = {
  data: PropTypesDataObject.isRequired,
  moveCard: PropTypes.func.isRequired
};