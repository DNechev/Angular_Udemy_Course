import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppinglistActions from '../../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailedRecipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map((recipes, index) => {
        return recipes.recipes[this.id];
      })
    ).subscribe(recipe => {
      this.detailedRecipe = recipe
    })
  }

  addIngredientsToShoppingList(): void {
      this.store.dispatch(new ShoppinglistActions.AddIngredients(this.detailedRecipe.ingredients));
  }

  onRecipeEdit(): void{
    this.router.navigate(['recipe-edit'], {relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/']);
  }
}
