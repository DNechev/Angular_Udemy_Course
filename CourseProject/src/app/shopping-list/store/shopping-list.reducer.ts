import { Ingredient } from '../../Shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  index: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('Bananas', 10)
  ],
  editedIngredient: null,
  index: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients.concat(action.payload as Ingredient[])]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient: Ingredient = state.ingredients[state.index];
      const updatedIngredient: Ingredient = {...ingredient, ...action.payload}
      const updatedIngredients: Ingredient[] = [...state.ingredients];
      updatedIngredients[state.index] = updatedIngredient;
      return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      index: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
      ...state,
      ingredients: state.ingredients.filter((ingredient, index) => {
        return index != state.index;
      }),
      editedIngredient: null,
      index: -1
      };
    case ShoppingListActions.START_EDIT:
      return{
        ...state,
        index: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
    };
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null,
        index: -1
    };
    default:
      return state;
  }
}
