import React from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import OrderCard from "../OrderCard/OrderCard";
import PreLoader from "../PreLoader/PreLoader";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrdersHistory.module.css";

const OrdersHistory = (): JSX.Element => {
  const { orders } = useRootSelector(
    (store) => ({
      orders: store.wsOrdersReducer.orders,
    })
    // shallowEqual
  );
  const location = useLocation();

  return (
    <div className={styles.content}>
      {orders ? (
        <>
          {orders.map((order, index) => {
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
