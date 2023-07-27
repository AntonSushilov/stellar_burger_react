import { Middleware, MiddlewareAPI } from "redux";
// import { TWSOrdersActions } from "../services/ws/action";
import { AppDispatch, RootState } from "../index";

import { TWSActions } from "../services/ws/action";
import { TWSStoreActions } from "../services/ws/action";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimerRef = 0;

    return (next) => (action: TWSActions) => {
      const { type } = action;
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsError,
        wsMessage,
      } = wsActions;
      if (wsConnect(url).type === type) {
        console.log("Websocket connecting");
        url = action.payload.url;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimerRef);
        reconnectTimerRef = 0;
        dispatch(wsConnecting());
      }

      if (socket && wsConnecting().type === type) {
        socket.onopen = () => {
          console.log("open");
          dispatch(wsOpen());
        };

        socket.onerror = (event: Event) => {
          dispatch(wsError("Websocket error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData)
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            console.log("error");
            dispatch(wsError(`Error: ${event.code.toString()}`));
          }
          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimerRef = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
          console.log("close");
          dispatch(wsClose());
        };
      }

      if (socket && wsDisconnect().type === type) {
        console.log("disconnect");
        window.clearTimeout(reconnectTimerRef);
        isConnected = false;
        reconnectTimerRef = 0;
        socket.close();
      }

      next(action);
    };
  };
};
