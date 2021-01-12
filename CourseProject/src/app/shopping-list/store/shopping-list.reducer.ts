import { Ingredient } from '../../Shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('Bananas', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients.concat(action.payload)]
      }
    default:
      return state;
  }
}
