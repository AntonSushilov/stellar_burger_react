import { AppDispatch } from './../../index';
import { requestApi } from "../../utils/requestApi";
import { TIngredient, TIngredientsList } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
} from "./type";

// Типизация экшенов
export interface IGetIngredientRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredientsList;
}

export interface IGetIngredientFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetIngredientAction {
  readonly type: typeof SET_SELECTED_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
}


export type TBurgerIngredientsActions =
  | IGetIngredientRequestAction
  | IGetIngredientSuccessAction
  | IGetIngredientFailedAction
  | ISetIngredientAction
  | IDeleteIngredientAction;

export const setSelectIngredient = (el: TIngredient): ISetIngredientAction => ({
  type: SET_SELECTED_INGREDIENT,
  ingredient: el,
});

export const deleteSelectIngredient = (): IDeleteIngredientAction => ({
  type: DELETE_SELECTED_INGREDIENT,
});

export const getIngredients = () => {
  return function (dispatch: AppDispatch) {
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

