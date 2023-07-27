import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_OPEN,
  WS_GET_MESSAGE,
} from "./type";
import { IWSMessage } from "../../utils/types";

export interface IWsConnect {
  readonly type: typeof WS_CONNECT;
  readonly payload: { url: string };
}
export interface IWsConnecting {
  readonly type: typeof WS_CONNECTING;
}
export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsConnectionDisconnect {
  readonly type: typeof WS_CONNECTION_DISCONNECT;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: { connectionError: string };
}
export interface IWsConnectionOpen {
  readonly type: typeof WS_CONNECTION_OPEN;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWSMessage;
}

export type TWSActions =
  | IWsConnect
  | IWsConnecting
  | IWsConnectionClose
  | IWsConnectionDisconnect
  | IWsConnectionError
  | IWsConnectionOpen
  | IWsGetMessage;

export const wsConnectAction = (url: string) => ({
  type: WS_CONNECT,
  payload: {
    url: url,
  },
});

export const wsDisconnectAction = () => ({
  type: WS_CONNECTION_DISCONNECT,
});

export const wsConnectingAction = () => ({
  type: WS_CONNECTING,
});

export const wsOpenAction = () => ({
  type: WS_CONNECTION_OPEN,
});

export const wsCloseAction = () => ({
  type: WS_CONNECTION_CLOSE,
});

export const wsMessageAction = (payload: IWSMessage) => ({
  type: WS_GET_MESSAGE,
  payload: payload,
});

export const wsErrorAction = (connectionError: string) => ({
  type: WS_CONNECTION_ERROR,
  payload: {
    connectionError: connectionError,
  },
});

export type TWSStoreActions = {
  wsConnect: typeof wsConnectAction;
  wsDisconnect: typeof wsDisconnectAction;
  wsConnecting: typeof wsConnectingAction;
  wsOpen: typeof wsOpenAction;
  wsClose: typeof wsCloseAction;
  wsError: typeof wsErrorAction;
  wsMessage: typeof wsMessageAction;
};

export const wsActions: TWSStoreActions = {
  wsConnect: wsConnectAction,
  wsDisconnect: wsDisconnectAction,
  wsConnecting: wsConnectingAction,
  wsOpen: wsOpenAction,
  wsClose: wsCloseAction,
  wsError: wsErrorAction,
  wsMessage: wsMessageAction,
};
