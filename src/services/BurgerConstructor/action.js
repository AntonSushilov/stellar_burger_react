import { requestApi } from '../../utils/requestApi'
import {
  ADD_INGREDIENT_CONSTRUCTOR_REQUEST,
  ADD_INGREDIENT_CONSTRUCTOR_SUCCESS,
  ADD_INGREDIENT_CONSTRUCTOR_FAILED,

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


