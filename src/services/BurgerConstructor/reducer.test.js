import { ingredientsConstructorReducer } from "./reducer";
import * as types from "./type"
describe('order details reducer', () => {
  const initialState = {
    ingredientsConstructor: [],
    bunConstructor: null,
  }
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
    key: "key1"
  }
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
      key: "key1"
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
      key: "key2"
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
      key: "key3"
    },
  ]

  it('should return the initial state', () => {
    expect(ingredientsConstructorReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
    const action = {
      type: types.ADD_INGREDIENT_CONSTRUCTOR,
      ingredient: ingredient
    }
    expect(
      ingredientsConstructorReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsConstructor: [...initialState.ingredientsConstructor, ingredient]
    })
  })

  it('should handle SORT_INGREDIENTS_CONSTRUCTOR', () => {
    const action = {
      type: types.SORT_INGREDIENTS_CONSTRUCTOR,
      ingredients: ingredients
    }
    expect(
      ingredientsConstructorReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsConstructor: ingredients
    })
  })


  it('should handle DELETE_INGREDIENT_CONSTRUCTOR', () => {
    const key = "key1"
    const action = {
      type: types.DELETE_INGREDIENT_CONSTRUCTOR,
      key: key
    }
    expect(
      ingredientsConstructorReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsConstructor: initialState.ingredientsConstructor.filter((el) => el.key !== key),
    })
  })

  it('should handle DELETE_All_INGREDIENT_CONSTRUCTOR', () => {
    const action = {
      type: types.DELETE_All_INGREDIENT_CONSTRUCTOR,
    }
    expect(
      ingredientsConstructorReducer(initialState, action)
    ).toEqual({
      ...initialState,
      ingredientsConstructor: [],
      bunConstructor: null
    })
  })

  it('should handle ADD_BUN_CONSTRUCTOR', () => {
    const action = {
      type: types.ADD_BUN_CONSTRUCTOR,
      bun: ingredient
    }
    expect(
      ingredientsConstructorReducer(initialState, action)
    ).toEqual({
      ...initialState,
      bunConstructor: ingredient
    })
  })
})