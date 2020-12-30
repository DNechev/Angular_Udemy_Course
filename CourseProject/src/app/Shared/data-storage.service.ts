import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json',
    recipes).subscribe( response => {
      console.log(response);
    });
  }
}
