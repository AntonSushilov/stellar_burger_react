import { requestApi, fetchWithRefresh } from '../../utils/requestApi'
import {
  GET_ORGER_DETAILS_REQUEST,
  GET_ORGER_DETAILS_SUCCESS,
  GET_ORGER_DETAILS_FAILED,

  DELETE_ORGER_DETAILS
} from './type'

import { deleteAllIngredientConstructor } from '../BurgerConstructor/action';


export function getOrderDetails(ids) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ ingredients: ids }),
  };
  console.log(requestOptions)

  return function (dispatch) {
    dispatch({
      type: GET_ORGER_DETAILS_REQUEST
    });
    fetchWithRefresh("/orders", requestOptions).then(res => {
  console.log("res",res)
      
      if (res && res.success) {
        dispatch({
          type: GET_ORGER_DETAILS_SUCCESS,
          orderDetails: res.order.number
        });
        dispatch(deleteAllIngredientConstructor())
      } else {
        dispatch({
          type: GET_ORGER_DETAILS_FAILED
        });
      }
    });
  };
}

export const deleteOrderDetails = () => ({
  type: DELETE_ORGER_DETAILS,
});



