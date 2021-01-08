import { Action } from '@ngrx/store';
import { Ingredient } from '../Shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('Bananas', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch(action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
