import { requestApi } from '../../utils/requestApi'
import { GET_ORGER_DETAILS_REQUEST, GET_ORGER_DETAILS_SUCCESS, GET_ORGER_DETAILS_FAILED } from './type'


export function getOrderDetails(ids) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ids }),
  };
  return function (dispatch) {
    dispatch({
      type: GET_ORGER_DETAILS_REQUEST
    });
    requestApi("/orders", requestOptions).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORGER_DETAILS_SUCCESS,
          orderDetails: res.order.number
        });
      } else {
        dispatch({
          type: GET_ORGER_DETAILS_FAILED
        });
      }
    });
  };
}


