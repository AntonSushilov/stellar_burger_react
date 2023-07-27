import { TBurgerIngredientsActions } from "./action";
import { TIngredient } from "./../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
} from "./type";
import { TIngredientsList } from "../../utils/types";

type TBurgerIngredientsState = {
  ingredients: TIngredientsList;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  selectedIngredient: TIngredient | null;
};

export const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
  selectedIngredient: null,
};

export const ingredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
