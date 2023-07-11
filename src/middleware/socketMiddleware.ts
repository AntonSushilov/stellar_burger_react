import { Middleware, MiddlewareAPI } from "redux";
import { TWSOrdersActions } from "../services/ws/action";
import { AppDispatch, RootState } from "../index";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../services/ws/type";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSOrdersActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }
      console.log("socketMiddleware", socket)

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS,  payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event  });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
}