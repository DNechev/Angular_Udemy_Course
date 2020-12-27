import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailedRecipe: Recipe;
  id: number;

  constructor(private slService: ShoppingListService, private route: ActivatedRoute,
              private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.detailedRecipe = this.recipeService.getRecipeById(this.id);
    });
  }

  addIngredientsToShoppingList(): void {
      console.log(this.detailedRecipe.ingredients);
      this.slService.addIngredientsFromRecipe(this.detailedRecipe.ingredients);
  }

  onRecipeEdit(): void{
    this.router.navigate(['recipe-edit'], {relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipeById(this.id);
    this.router.navigate(['../']);
  }
}
