import { AppDispatch } from "./../../index";
import { requestApi, fetchWithRefresh } from "../../utils/requestApi";
import {
  GET_ORGER_DETAILS_REQUEST,
  GET_ORGER_DETAILS_SUCCESS,
  GET_ORGER_DETAILS_FAILED,
  DELETE_ORGER_DETAILS,
} from "./type";

import { deleteAllIngredientConstructor } from "../BurgerConstructor/action";

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORGER_DETAILS_REQUEST;
}
export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORGER_DETAILS_SUCCESS;
  readonly orderDetails: any;
}
export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORGER_DETAILS_FAILED;
}

export interface IDeleteOrderDetailsAction {
  readonly type: typeof DELETE_ORGER_DETAILS;
}

export type TOrderDetailsActions =
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsFailedAction
  | IDeleteOrderDetailsAction;

export function getOrderDetails(ids: Array<string>) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: String(localStorage.getItem("accessToken")),
    },
    body: JSON.stringify({ ingredients: ids }),
  };
  console.log(requestOptions);

  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORGER_DETAILS_REQUEST,
    });
    dispatch(deleteAllIngredientConstructor());
    fetchWithRefresh("/orders", requestOptions).then((res) => {
      if (res && res.success) {
        console.log("orders",res)
        dispatch({
          type: GET_ORGER_DETAILS_SUCCESS,
          orderDetails: res.order.number,
        });
      } else {
        dispatch({
          type: GET_ORGER_DETAILS_FAILED,
        });
      }
    });
  };
}

export const deleteOrderDetails = () => ({
  type: DELETE_ORGER_DETAILS,
});
