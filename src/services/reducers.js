import { combineReducers } from 'redux';
import { ingredientsReducer } from './BurgerIngredients/reducer';
import { ingredientsConstructorReducer } from './BurgerConstructor/reducer';
import { orderDetailsReducer } from './OrderDetails/reducer'
import { userReducer } from './User/reducer';
import { modalReducer } from './Modal/reducer';
export const rootReducer = combineReducers({
  ingredientsReducer,
  ingredientsConstructorReducer,
  orderDetailsReducer,
  userReducer,
  modalReducer
});