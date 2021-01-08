import { Ingredient } from '../Shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('Bananas', 10)
  ]
};

export function shoppingListReducer(state = initialState, action) {

}
