import { Recipe } from "../recipe.model";
import * as RecipeActions from '../store/recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions){
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return{
        ...state,
        recipes: [...action.payload]
      }
    default:
      return state;
    }
}
