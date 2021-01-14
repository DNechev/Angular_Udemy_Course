import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json',
    recipes).subscribe( response => {
      console.log(response);
    });
  }

  fetchRecipes(): any {
    return this.store.select('auth').pipe(take(1), map(storeData => storeData.user), exhaustMap(user => {
      console.log(user.token);
      return this.http.get<Recipe[]>('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json');
    }), map( recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap( recipes => {
      this.recipesService.setRecipes(recipes);
    }));
  }
}
