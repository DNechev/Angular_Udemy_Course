import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions} from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}

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

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      console.log(JSON.stringify(actionData) + ' ' + JSON.stringify(recipesState))
      return this.http.put('https://angular-udemy-recipes-project-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
    })
  )
}
