import { IActions } from '../interfaces/actions';
import { ICategoryItem } from "../interfaces/category-Item";
import { IProductItem } from "../interfaces/IProducts";
import { IUserItem } from '../interfaces/Users';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  LOAD_PRODUCTS,
  REQUEST_PRODUCTS,
  LOAD_USERS,
  REQUEST_USERS,
  SWITCH_DARK_MODE
} from "./types";

export const loadCategories = (categories: ICategoryItem[]): IActions => ({ type: LOAD_CATEGORIES, data: categories });
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });

export const fetchAddCategories = (name: string, description: string): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data: { name, description },
});
export const addCategory = (category: ICategoryItem): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});

export const loadProducts = (products: IProductItem[]): IActions => ({ type: LOAD_PRODUCTS, data: products });
export const fetchProducts = (): IActions => ({ type: REQUEST_PRODUCTS });

export const loadUsers = (users: IUserItem[]): IActions => ({ type: LOAD_USERS, data: users });
export const fetchUsers = (): IActions => ({ type: REQUEST_USERS });

export const switchDarkMode = (): IActions => ({ type: SWITCH_DARK_MODE })
