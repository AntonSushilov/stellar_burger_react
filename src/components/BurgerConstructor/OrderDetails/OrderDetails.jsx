import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import done from "../../../images/done.png";
import styles from "./OrderDetails.module.css";
import { getOrderDetails } from "../../../services/OrderDetails/action";
import { deleteOrderDetails } from "../../../services/OrderDetails/action";
import { useNavigate } from "react-router";

const OrderDetails = (props) => {
  const dispatch = useDispatch();
  const { ingredientsConstructorData, bunConstructor, orderDetails } =
    useSelector(
      (store) => ({
        ingredientsConstructorData:
          store.ingredientsConstructorReducer.ingredientsConstructor,
        bunConstructor: store.ingredientsConstructorReducer.bunConstructor,
        orderDetails: store.orderDetailsReducer.orderDetails,
      }),
      shallowEqual
    );

  const navigate = useNavigate()
  useEffect(() => {
    if (bunConstructor && ingredientsConstructorData){
      const ids = [bunConstructor._id, ...ingredientsConstructorData.map((el) => el._id), bunConstructor._id]
      dispatch(getOrderDetails(ids));
      return () => {
        dispatch(deleteOrderDetails());
  
      }
    }
    else{
      navigate(-1)
    }
  }, []);
  return (
    <div className={styles.modal_content}>
      <div className="mb-8">
        <p className="text text_type_digits-large">
          {orderDetails ? orderDetails : <></>}
        </p>
      </div>
      <p className="text text_type_main-medium  mb-15">Идентификатор заказа</p>
      <img className="mb-15" src={done} alt="Заказ оформлен" />
      <p className="text text_type_main-medium  mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
