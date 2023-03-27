import {
  GET_INGREDIENTS_CONSTRUCTOR_REQUEST,
  GET_INGREDIENTS_CONSTRUCTOR_SUCCESS,
  GET_INGREDIENTS_CONSTRUCTOR_FAILED,

  ADD_INGREDIENT_CONSTRUCTOR_REQUEST,
  ADD_INGREDIENT_CONSTRUCTOR_SUCCESS,
  ADD_INGREDIENT_CONSTRUCTOR_FAILED,

  SORT_INGREDIENTS_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,

  ADD_BUN_CONSTRUCTOR_REQUEST,
  ADD_BUN_CONSTRUCTOR_SUCCESS,
  ADD_BUN_CONSTRUCTOR_FAILED
} from './type'

const initialState = {
  ingredientsConstructor: [],
  bunConstructor: null,
  ingredientsConstructorRequest: false,
  ingredientsConstructorFailed: false,

};

export const ingredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        ingredientsConstructorRequest: true
      };
    }
    case GET_INGREDIENTS_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        ingredientsConstructorFailed: false,
        ingredientsConstructor: state.ingredientsConstructor,
        ingredientsConstructorRequest: false
      };
    }
    case GET_INGREDIENTS_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        ingredientsConstructorFailed: true,
        ingredientsConstructorRequest: false
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        ingredientsConstructorRequest: true
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        ingredientsConstructorFailed: false,
        ingredientsConstructor: [...state.ingredientsConstructor, action.ingredient],
        ingredientsConstructorRequest: false
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        ingredientsConstructorFailed: true,
        ingredientsConstructorRequest: false
      };
    }
    case SORT_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: action.indredients,
      };
    }
    case DELETE_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter((el)=> el.key !== action.key),
      };
    }
    case ADD_BUN_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        ingredientsConstructorRequest: true
      };
    }
    case ADD_BUN_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        ingredientsConstructorFailed: false,
        bunConstructor: action.bun,
        ingredientsConstructorRequest: false
      };
    }
    case ADD_BUN_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        ingredientsConstructorFailed: true,
        ingredientsConstructorRequest: false
      };
    }
    default: {
      return state;
    }
  }

}

