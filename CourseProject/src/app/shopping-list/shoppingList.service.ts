import { EventEmitter } from "@angular/core";
import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('Bananas', 10)
    ];

    getIngredients() {
        return this.ingredients;
    }

    addIngredientToShoppingList(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]){
        this.ingredients = this.ingredients.concat(ingredients);
        console.log(this.ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
