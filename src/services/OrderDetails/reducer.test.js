import { orderDetailsReducer } from "./reducer";
import * as types from "./type"
describe('order details reducer', () => {
  const initialState = {
    orderDetails: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false,
  }
  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle GET_ORGER_DETAILS_REQUEST', () => {
    const action = {
      type: types.GET_ORGER_DETAILS_REQUEST,
    }
    expect(
      orderDetailsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      orderDetailsRequest: true
    })
  })

  it('should handle GET_ORGER_DETAILS_SUCCESS', () => {
    const orderDetails = {
      name: "Альфа-сахаридный астероидный флюоресцентный био-марсианский бургер",
      order:{
        number: 12345
      }
    
    }
    const action = {
      type: types.GET_ORGER_DETAILS_SUCCESS,
      orderDetails: orderDetails
    }
    expect(
      orderDetailsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      orderDetailsFailed: false, 
      orderDetailsRequest: false,
      orderDetails: orderDetails
    })
  })

  it('should handle GET_ORGER_DETAILS_FAILED', () => {
    const action = {
      type: types.GET_ORGER_DETAILS_FAILED,
    }
    expect(
      orderDetailsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      orderDetailsFailed: true, 
      orderDetailsRequest: false
    })
  })

  it('should handle DELETE_ORGER_DETAILS', () => {
    const action = {
      type: types.DELETE_ORGER_DETAILS,
      orderDetails: null
    }
    expect(
      orderDetailsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      orderDetails: null
    })
  })
})