import { IOrderDetails, IWSMessage } from "./../../utils/types";
import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_OPEN,
  WS_GET_MESSAGE,
} from "./type";
import { TWSActions } from "./action";

export interface IOrdersState {
  payload: IWSMessage | null,
  orders: IOrderDetails[] | null,
  wsConnected: boolean;
  error?: boolean;
}

const initialState: IOrdersState = {
  orders: null,
  wsConnected: false,
  payload: null,
};

export const wsOrdersReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECT: {
      return {
        ...state,
        // url: action.payload.url
      };
    }
    case WS_CONNECTING: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_CLOSE: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_DISCONNECT: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        // error: action.payload.connectionError
      };
    }
    case WS_CONNECTION_OPEN: {
      return {
        ...state,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        payload: action.payload,
        orders: action.payload.orders
      };
    }
    default: {
      return state;
    }
  }
};
