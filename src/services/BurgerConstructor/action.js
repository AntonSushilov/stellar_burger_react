import { requestApi } from '../../utils/requestApi'
import {
  ADD_INGREDIENT_CONSTRUCTOR,

  SORT_INGREDIENTS_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,
  DELETE_All_INGREDIENT_CONSTRUCTOR,
  ADD_BUN_CONSTRUCTOR,
} from './type'


export const addIngredientConstructor = (ingredient) => ({
	type: ADD_INGREDIENT_CONSTRUCTOR,
	ingredient: ingredient
});

export const sortIngredientConstructor = (indredients) => ({
	type: SORT_INGREDIENTS_CONSTRUCTOR,
	indredients: indredients
});

export const deleteIngredientConstructor = (key) => ({
	type: DELETE_INGREDIENT_CONSTRUCTOR,
	key: key
});

export const deleteAllIngredientConstructor = () => ({
	type: DELETE_All_INGREDIENT_CONSTRUCTOR,
});

export const addBunConstructor = (bun) => ({
	type: ADD_BUN_CONSTRUCTOR,
	bun: bun
});



