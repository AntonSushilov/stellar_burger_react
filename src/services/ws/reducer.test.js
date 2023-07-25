import { wsOrdersReducer } from "./reducer";
import * as types from "./type"
describe('order details reducer', () => {
  const initialState = {
    orders: null,
    wsConnected: false,
    payload: null,
  }
  it('should return the initial state', () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle WS_CONNECT', () => {
    const action = {
      type: types.WS_CONNECT,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_CONNECTING', () => {
    const action = {
      type: types.WS_CONNECTING,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_CONNECTION_CLOSE', () => {
    const action = {
      type: types.WS_CONNECTION_CLOSE,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_CONNECTION_DISCONNECT', () => {
    const action = {
      type: types.WS_CONNECTION_DISCONNECT,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_CONNECTION_ERROR', () => {
    const action = {
      type: types.WS_CONNECTION_ERROR,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_CONNECTION_OPEN', () => {
    const action = {
      type: types.WS_CONNECTION_OPEN,
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
    })
  })
  it('should handle WS_GET_MESSAGE', () => {
    const order = {
      createdAt: "2023-07-25T13:12:49.721Z",
      ingredients: ['643d69a5c3f7b9001cfa0949', '643d69a5c3f7b9001cfa093f', '643d69a5c3f7b9001cfa0945', '643d69a5c3f7b9001cfa093d'],
      name: "Бессмертный антарианский флюоресцентный экзо-плантаго бургер",
      number: 14295,
      status: "done",
      updatedAt: "2023-07-25T13:12:49.850Z",
      _id: "64bfca5182e277001bfa3ccc"
    }
    const payload = {
      success: true,
      orders: [order,order,order],
      total: 123,
      totalToday: 123,
    }
    const action = {
      type: types.WS_GET_MESSAGE,
      payload: payload,
      orders: payload.orders
    }
    expect(
      wsOrdersReducer(initialState, action)
    ).toEqual({
      ...initialState,
      payload: payload,
      orders: payload.orders
    })
  })
})
