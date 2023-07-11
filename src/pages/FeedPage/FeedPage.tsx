import React, { useEffect } from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { wsClose, wsStart } from "../../services/ws/action";

import styles from "./FeedPage.module.css";

export const FeedPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
  const { messages } =
  useRootSelector(
    (store) => ({
      messages: store.wsOrdersReducer.messages,
    }),
    // shallowEqual
  );
  console.log("messages", messages);

  useEffect(() => {
    dispatch(
      wsStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`)
    );
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, accessToken]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text text_type_main-large">В разработке</p>
        <br />

        <Link to="/">
          <p className="text text_type_main-default text_color_inactive">
            Перейти на главную
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FeedPage;
