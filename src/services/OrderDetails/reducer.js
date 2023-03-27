import {
  GET_ORGER_DETAILS_REQUEST,
  GET_ORGER_DETAILS_SUCCESS,
  GET_ORGER_DETAILS_FAILED,

  DELETE_ORGER_DETAILS
} from './type'

const initialState = {
  orderDetails: null,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true
      };
    }
    case GET_ORGER_DETAILS_SUCCESS: {
      return { ...state, orderDetailsFailed: false, orderDetails: action.orderDetails, orderDetailsRequest: false };
    }
    case GET_ORGER_DETAILS_FAILED: {
      return { ...state, orderDetailsFailed: true, orderDetailsRequest: false };
    }
    case DELETE_ORGER_DETAILS: {
      return { ...state, orderDetails: null };
    }
    default: {
      return state;
    }
  }

}

