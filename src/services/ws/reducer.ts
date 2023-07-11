import { IOrderDetails, IWSMessage } from './../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  SELECT_ORDER,
  DELETE_SELECTED_ORDER
} from "./type";
import { TWSOrdersActions } from "./action";

export interface IOrdersState {
  selectedOrder: IOrderDetails | null;
  wsConnected: boolean;
  messages: IWSMessage[];
  error?: boolean;
}

const initialState: IOrdersState = {
  selectedOrder: null,
  wsConnected: false,
  messages: [],
};

export const wsOrdersReducer = (state = initialState, action: TWSOrdersActions) => {
  switch (action.type) {
    case SELECT_ORDER: {
      return {
        ...state,
        selectedOrder: action.payload
      };
    }
    case DELETE_SELECTED_ORDER: {
      return {
        ...state,
        selectedOrder: null
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        messages: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};