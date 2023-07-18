import React, { useEffect } from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { wsCloseAction, wsConnectAction } from "../../services/ws/action";

import styles from "./FeedPage.module.css";
import OrdersHistory from "../../components/OrdersHistory/OrdersHistory";
import OrdersInfo from "../../components/OrdersInfo/OrdersInfo";

export const FeedPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
  // const { orders } = useRootSelector(
  //   (store) => ({
  //     orders: store.wsOrdersReducer.orders,
  //   })
  //   // shallowEqual
  // );
  // console.log("orders", orders);

  useEffect(() => {
    dispatch(
      // wsStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`)
      wsConnectAction(`wss://norma.nomoreparties.space/orders/all`)
    );
    return () => {
      dispatch(wsCloseAction());
    };
  }, [dispatch]);
  return (
    <>
        <Outlet />

    </>
  );
};

export default FeedPage;
