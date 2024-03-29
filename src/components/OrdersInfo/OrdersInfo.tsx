import { useMemo } from "react";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { IOrderDetails } from "../../utils/types";
import styles from "./OrdersInfo.module.css";

const OrdersInfo = (): JSX.Element => {
  const { orders, payload } = useRootSelector(
    (store) => ({
      orders: store.wsOrdersReducer.orders,
      payload: store.wsOrdersReducer.payload,
    })
    // shallowEqual
  );
  const ordersDone: IOrderDetails[] | undefined = useMemo(
    () => orders?.filter((el) => el.status === "done").slice(0, 10),
    [orders]
  );
  const ordersInWork: IOrderDetails[] | undefined = useMemo(
    () => orders?.filter((el) => el.status === "pending").slice(0, 10),
    [orders]
  );
  return (
    <div className={styles.content}>
      <div className={styles.orders__board}>
        <div className={styles.board__done}>
          <p className="text text_type_main-medium mb-4">Готовы:</p>
          <div className={styles.orders__list}>
            {ordersDone &&
              ordersDone.map((el, index) => {
                return (
                  <p
                    key={index}
                    className="text text_type_digits-default"
                    style={{ color: "#00CCCC" }}
                  >
                    {el.number}
                  </p>
                );
              })}
          </div>
        </div>
        <div className={styles.board__inwork}>
          <p className="text text_type_main-medium mb-4">В работе:</p>
          <div className={styles.orders__list}>
            {ordersInWork &&
              ordersInWork.map((el, index) => {
                return (
                  <p key={index} className="text text_type_digits-default">
                    {el.number}
                  </p>
                );
              })}
          </div>  
        </div>
        <div className={styles.orders__completed}>
          <p className="text text_type_main-medium mb-4">
            Выполнено за все время:
          </p>
          <p className="text text_type_digits-large">{payload?.total}</p>
        </div>
        <div className={styles.orders__completed}>
          <p className="text text_type_main-medium mb-4">
            Выполнено за сегодня:
          </p>
          <p className="text text_type_digits-large">{payload?.totalToday}</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersInfo;
