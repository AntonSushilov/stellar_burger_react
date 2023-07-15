import React from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import OrderCard from "../OrderCard/OrderCard";
import PreLoader from "../PreLoader/PreLoader";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrdersHistory.module.css";

const OrdersHistory = (): JSX.Element => {
  const { messages } = useRootSelector(
    (store) => ({
      messages: store.wsOrdersReducer.messages,
    })
    // shallowEqual
  );
  const location = useLocation();

  return (
    <div className={styles.content}>
      {messages?.orders ? (
        <>
          {messages?.orders.map((order, index) => {
            return (
              <Link to={`/feed/${order._id}`} state={{ background: location }} key={index}>
                <OrderCard order={order} />
              </Link>
            );
          })}
        </>
      ) : (
        <>
          <PreLoader />
        </>
      )}
    </div>
  );
};

export default OrdersHistory;
