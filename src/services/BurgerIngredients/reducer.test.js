import { ingredientsReducer, initialState } from "./reducer";
import * as types from "./type"
describe('order details reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action = {
      type: types.GET_INGREDIENTS_REQUEST,
    }
    expect(
      ingredientsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })


  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const ingredients = [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "_id",
        id: "id",
        key: "key"
      },
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "_id",
        id: "id",
        key: "key"
      },
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "_id",
        id: "id",
        key: "key"
      },
    ]
    const action = {
      type: types.GET_INGREDIENTS_SUCCESS,
      ingredients: ingredients,
    }
    expect(
      ingredientsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsFailed: false,
      ingredients: ingredients,
      ingredientsRequest: false,
    })
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action = {
      type: types.GET_INGREDIENTS_FAILED,
    }
    expect(
      ingredientsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    })
  })

  it('should handle SET_SELECTED_INGREDIENT', () => {
    const ingredient = {
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      name: "Краторная булка N-200i",
      price: 1255,
      proteins: 80,
      type: "bun",
      __v: 0,
      _id: "_id",
      id: "id",
      key: "key"
    }
    const action = {
      type: types.SET_SELECTED_INGREDIENT,
      ingredient: ingredient
    }
    expect(
      ingredientsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      selectedIngredient: ingredient
    })
  })

  it('should handle DELETE_SELECTED_INGREDIENT', () => {
    const action = {
      type: types.DELETE_SELECTED_INGREDIENT,
    }
    expect(
      ingredientsReducer(initialState, action)
    ).toEqual({
      ...initialState,
      selectedIngredient: null
    })
  })
})