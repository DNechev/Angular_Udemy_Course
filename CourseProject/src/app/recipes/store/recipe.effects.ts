import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions} from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";

@Injectable()
export class RecipeEffects{
  constructor(private actions$: Actions, private http: HttpClient){}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(fecthAction => {
      return this.http.get<Recipe[]>('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json');
    }),
    map( recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );
}
