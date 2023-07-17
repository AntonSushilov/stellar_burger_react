import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { wsClose, wsStart } from "../../services/ws/action";
import OrderCard from "../OrderCard/OrderCard";
import PreLoader from "../PreLoader/PreLoader";
import styles from "./HistoryFeed.module.css";

const HistoryFeed = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { messages } = useRootSelector(
    (store) => ({
      messages: store.wsOrdersReducer.messages,
    })
    // shallowEqual
  );
  console.log(messages?.orders);
  const location = useLocation();

  return (
    <div className={styles.content}>
      {messages?.orders ? (
        <>
          {messages?.orders.map((order, index) => {
            return (
              <Link
                to={`/profile/orders/${order._id}`}
                state={{ background: location }}
                key={index}
              >
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
      {/* <p className="text text_type_main-large">История заказов</p> */}
      {/* <p className="text text_type_main-medium">В разработке</p> */}
    </div>
  );
};

export default HistoryFeed;
