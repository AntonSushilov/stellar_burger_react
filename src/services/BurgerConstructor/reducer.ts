import { TBurgerConstructorActions } from './action';
import {
  GET_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  SORT_INGREDIENTS_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,
  DELETE_All_INGREDIENT_CONSTRUCTOR,
  ADD_BUN_CONSTRUCTOR,
} from './type'

import { TIngredientConstructor, TIngredientConstructorList } from '../../utils/types';

type TBurgerConstructorState = {
  ingredientsConstructor: TIngredientConstructorList;
  bunConstructor: TIngredientConstructor | null
}

const initialState: TBurgerConstructorState = {
  ingredientsConstructor: [],
  bunConstructor: null,
};

export const ingredientsConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    // case GET_INGREDIENTS_CONSTRUCTOR: {
    //   return {
    //     ...state,
    //     ingredientsConstructor: state.ingredientsConstructor,
    //   };
    // }
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.ingredient],
      };
    }
    case SORT_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: action.ingredients,
      };
    }
    case DELETE_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter((el) => el.key !== action.key),
      };
    }
    case DELETE_All_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [],
        bunConstructor: null
      };
    }
    case ADD_BUN_CONSTRUCTOR: {
      return {
        ...state,
        bunConstructor: action.bun,
      };
    }
    default: {
      return state;
    }
  }

}

