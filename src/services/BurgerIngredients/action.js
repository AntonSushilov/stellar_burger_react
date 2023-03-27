import { requestApi } from '../../utils/requestApi'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT
} from './type'


export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    requestApi("/ingredients").then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

export function setSelectIngredient(el) {
  return function (dispatch) {
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      ingredient: el
    });
  }
}

export function deleteSelectIngredient() {
  return function (dispatch) {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT
    });
  }
}

