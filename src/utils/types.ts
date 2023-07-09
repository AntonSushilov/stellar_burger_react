export interface IResponse {
  success: boolean;
  message?: string;
  data?: any
}

export interface ICredentials {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends IResponse, ICredentials {}

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TIngredientsList = TIngredient[];

export type TIngredientConstructor = TIngredient & { key: string };
export type TIngredientConstructorList = TIngredientConstructor[];

export type TConstructor = {
  bun: TIngredient;
  ingr: TIngredientConstructorList;
};
