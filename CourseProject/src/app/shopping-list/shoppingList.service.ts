import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredients } from './store/shopping-list.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    selectedItem = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('Bananas', 10)
    ];

    constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>){
    }

    getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    addIngredientToShoppingList(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]): void {
        this.store.dispatch(new AddIngredients(ingredients));
        // this.ingredients = this.ingredients.concat(ingredients);
        // console.log(this.ingredients);
        // this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number): Ingredient {
      return this.ingredients[index];
    }

    editIngredient(index: number, newName: string, newAmount: number): void {
      this.ingredients[index].name = newName;
      this.ingredients[index].amount = newAmount;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}
