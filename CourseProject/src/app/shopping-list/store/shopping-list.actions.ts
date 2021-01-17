import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/Shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] Add Ingredient';
export const ADD_INGREDIENTS = '[ShoppingList] Add Ingredients';
export const UPDATE_INGREDIENT = '[ShoppingList] UpdateIngredient';
export const DELETE_INGREDIENT = '[ShoppingList] Delete Ingredient';
export const START_EDIT = '[ShoppingList] Start Edit';
export const STOP_EDIT = '[ShoppingList] Stop Edit';

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;

  constructor(public payload: Ingredient){
  }
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]){
  }
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient){
  }
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;

  constructor(public payload = null){}
}

export class StartEdit implements Action{
  readonly type: string = START_EDIT;

  constructor(public payload: number){
  }
}

export class StopEdit implements Action{
  readonly type: string = STOP_EDIT;

  constructor(public payload = null){}
}


export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
