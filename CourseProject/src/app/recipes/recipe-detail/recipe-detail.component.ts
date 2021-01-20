import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailedRecipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>,
              private recipeService: RecipeService, private router: Router) { }

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
      this.recipeService.addIngredientsFromRecipe(this.detailedRecipe.ingredients);
  }

  onRecipeEdit(): void{
    this.router.navigate(['recipe-edit'], {relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    // this.recipeService.deleteRecipeById(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/']);
  }
}
