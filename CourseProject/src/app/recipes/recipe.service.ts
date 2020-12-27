import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';

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

    private recipes: Recipe[] = [
        new Recipe('Burger', 'Some random burger on the internet',
        'https://img2.mashed.com/img/gallery/food-trends-that-are-about-to-take-over-2020/intro-1575330865.jpg', this.burgerIngredients),
        new Recipe('PBnJ', 'love <3', 'https://media2.s-nbcnews.com/i/newscms/2017_17/1210676/pbj-today-170427-tease_8f65d87fb736fbe341a38835005668a0.jpg',
        this.pbjIngredients)
      ];

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
}
