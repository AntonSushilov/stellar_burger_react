import React, { useEffect } from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { wsClose, wsStart } from "../../services/ws/action";

import styles from "./FeedPage.module.css";
import OrdersHistory from "../../components/OrdersHistory/OrdersHistory";
import OrdersInfo from "../../components/OrdersInfo/OrdersInfo";

export const FeedPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
  const { messages } = useRootSelector(
    (store) => ({
      messages: store.wsOrdersReducer.messages,
    })
    // shallowEqual
  );
  console.log("messages", messages);

  useEffect(() => {
    dispatch(
      // wsStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`)
      wsStart(`wss://norma.nomoreparties.space/orders/all`)
    );
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);
  return (
    <>
        <Outlet />

    </>
  );
};

export default FeedPage;
