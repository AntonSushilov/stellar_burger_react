import { requestApi } from '../../utils/requestApi'
import {
  ADD_INGREDIENT_CONSTRUCTOR_REQUEST,
  ADD_INGREDIENT_CONSTRUCTOR_SUCCESS,
  ADD_INGREDIENT_CONSTRUCTOR_FAILED,

  SORT_INGREDIENTS_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,

  ADD_BUN_CONSTRUCTOR_REQUEST,
  ADD_BUN_CONSTRUCTOR_SUCCESS,
  ADD_BUN_CONSTRUCTOR_FAILED
} from './type'


export function addIngredientConstructor(ingredient) {
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT_CONSTRUCTOR_REQUEST
    });

    dispatch({
      type: ADD_INGREDIENT_CONSTRUCTOR_SUCCESS,
      ingredient: ingredient
    });

    dispatch({
      type: ADD_INGREDIENT_CONSTRUCTOR_FAILED
    });
  };
}

export function sortIngredientConstructor(indredients) {
  return function (dispatch) {
    dispatch({
      type: SORT_INGREDIENTS_CONSTRUCTOR,
      indredients: indredients
    });

  };
}

export function deleteIngredientConstructor(key) {
  return function (dispatch) {
    dispatch({
      type: DELETE_INGREDIENT_CONSTRUCTOR,
      key: key
    });

  };
}

export function addBunConstructor(bun) {
  return function (dispatch) {
    dispatch({
      type: ADD_BUN_CONSTRUCTOR_REQUEST
    });

    dispatch({
      type: ADD_BUN_CONSTRUCTOR_SUCCESS,
      bun: bun
    });

    dispatch({
      type: ADD_BUN_CONSTRUCTOR_FAILED
    });
  };
}


