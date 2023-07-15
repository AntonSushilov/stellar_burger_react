import React, { useEffect } from "react";
import OrdersHistory from "../OrdersHistory/OrdersHistory";
import OrdersInfo from "../OrdersInfo/OrdersInfo";
import styles from "./OrdersDetails.module.css";

export const OrdersDetails = (): JSX.Element => {
  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={styles.content}>
        <OrdersHistory />
        <OrdersInfo />
      </div>
    </>
  );
};

export default OrdersDetails;
