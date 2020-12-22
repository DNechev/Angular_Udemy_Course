import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() detailedRecipe: Recipe;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredientsToShoppingList() {
      console.log(this.detailedRecipe.ingredients);
      this.slService.addIngredientsFromRecipe(this.detailedRecipe.ingredients);
  }
}
