export interface IResponse {
  success: boolean;
  message?: string;
  data?: any
}

export interface ICredentials {
  accessToken: string;
  refreshToken: string;
  user: any;
}


export interface IOrderSuccess {
  name: string;
  order: {
    number: number;
  }
}

export interface IOrderDetails {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse extends IResponse, ICredentials, IOrderSuccess {}

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
export interface IWSMessage {
  success: boolean,
  orders: IOrderDetails[];
  total: number;
  totalToday: number;
}