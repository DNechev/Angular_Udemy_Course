import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../shopping-list/store/shopping-list.actions';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{
  recipesChnaged = new Subject<Recipe[]>();

    private pbjIngredients: Ingredient[] = [
         {name: 'slices of bread', amount: 2},
         {name: 'grams of peanut butter', amount: 25 },
         {name: 'grams of jelly', amount: 25 }];
    private burgerIngredients: Ingredient[] = [
        {name: 'buns', amount: 2},
        {name: 'burger', amount: 1},
        {name: 'lettuce', amount: 1},
        {name: 'tomato', amount: 1}
    ];

    private recipes: Recipe[] = [];

    constructor(private store: Store<fromApp.AppState>){
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]): void {
      this.store.dispatch(new AddIngredients(ingredients));
      // this.ingredients = this.ingredients.concat(ingredients);
      // console.log(this.ingredients);
      // this.ingredientsChanged.next(this.ingredients.slice());
  }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
      return this.recipes[id];
    }

    addRecipe(newRecipe: Recipe) {
      this.recipes.push(newRecipe);
      this.recipesChnaged.next(this.recipes.slice());
    }

    editRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChnaged.next(this.recipes.slice());
    }

    deleteRecipeById(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChnaged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChnaged.next(this.recipes.slice());
    }
}
