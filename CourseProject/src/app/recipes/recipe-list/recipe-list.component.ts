import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeFromListSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Burger', 'Some random burger on the internet', 'https://img2.mashed.com/img/gallery/food-trends-that-are-about-to-take-over-2020/intro-1575330865.jpg'),
    new Recipe('PBnJ', 'love <3', 'https://media2.s-nbcnews.com/i/newscms/2017_17/1210676/pbj-today-170427-tease_8f65d87fb736fbe341a38835005668a0.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeFromListSelected.emit(recipe);
  }
}
