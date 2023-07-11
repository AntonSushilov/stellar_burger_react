import { IOrderDetails, IWSMessage } from "../../utils/types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  SELECT_ORDER,
  DELETE_SELECTED_ORDER
} from "./type";

export interface ISelectOrder {
  readonly type: typeof SELECT_ORDER;
  readonly payload: IOrderDetails;
}

export interface IDeleteSelectedOrder {
  readonly type: typeof DELETE_SELECTED_ORDER;
}

interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWSMessage;
}

export type TWSOrdersActions = 
  | ISelectOrder
  | IDeleteSelectedOrder
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
| IWSGetMessage;

export const selectOrder = (order: IOrderDetails) => ({
  type: SELECT_ORDER,
  payload: order,
});

export const deleteSelectedOrder = () => ({
  type: DELETE_SELECTED_ORDER,
});

export const wsStart = (url: string): IWSConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
}

export const wsSuccess = (): IWSConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
}

export const wsError = (): IWSConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
}

export const wsClose = (): IWSConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
}

export const wsGetMessage = (message: IWSMessage): IWSGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
}