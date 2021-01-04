import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json',
    recipes).subscribe( response => {
      console.log(response);
    });
  }

  fetchRecipes(): any {
    return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
      console.log(user.token);
      return this.http.get<Recipe[]>('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json',
      { params: new HttpParams().set('auth', user.token)});
    }), map( recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap( recipes => {
      this.recipesService.setRecipes(recipes);
    }));
  }
}
