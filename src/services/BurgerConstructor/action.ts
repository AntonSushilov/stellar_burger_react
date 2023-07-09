import {
  TIngredientConstructor,
  TIngredientConstructorList,
} from "./../../utils/types";
import {
  ADD_INGREDIENT_CONSTRUCTOR,
  SORT_INGREDIENTS_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,
  DELETE_All_INGREDIENT_CONSTRUCTOR,
  ADD_BUN_CONSTRUCTOR,
} from "./type";

export interface IAddIngredientConstructorAction {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  readonly ingredient: TIngredientConstructor;
}
export interface IAddBunConstructorAction {
  readonly type: typeof ADD_BUN_CONSTRUCTOR;
  readonly bun: TIngredientConstructor;
}
export interface ISortIngredientConstructorAction {
  readonly type: typeof SORT_INGREDIENTS_CONSTRUCTOR;
  readonly ingredients: TIngredientConstructorList;
}

export interface IDeleteIngredientConstructorAction {
  readonly type: typeof DELETE_INGREDIENT_CONSTRUCTOR;
  readonly key: string;
}

export interface IDeleteAllIngredientConstructorAction {
  readonly type: typeof DELETE_All_INGREDIENT_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddIngredientConstructorAction
  | IAddBunConstructorAction
  | ISortIngredientConstructorAction
  | IDeleteIngredientConstructorAction
  | IDeleteAllIngredientConstructorAction;

export const addIngredientConstructor = (
  ingredient: TIngredientConstructor
): IAddIngredientConstructorAction => ({
  type: ADD_INGREDIENT_CONSTRUCTOR,
  ingredient: ingredient,
});

export const addBunConstructor = (
  bun: TIngredientConstructor
): IAddBunConstructorAction => ({
  type: ADD_BUN_CONSTRUCTOR,
  bun: bun,
});

export const sortIngredientConstructor = (
  ingredients: TIngredientConstructorList
): ISortIngredientConstructorAction => ({
  type: SORT_INGREDIENTS_CONSTRUCTOR,
  ingredients: ingredients,
});

export const deleteIngredientConstructor = (
  key: string
): IDeleteIngredientConstructorAction => ({
  type: DELETE_INGREDIENT_CONSTRUCTOR,
  key: key,
});

export const deleteAllIngredientConstructor =
  (): IDeleteAllIngredientConstructorAction => ({
    type: DELETE_All_INGREDIENT_CONSTRUCTOR,
  });
