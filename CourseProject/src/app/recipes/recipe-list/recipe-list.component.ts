import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  activeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeSubscription = this.recipeService.recipesChnaged.subscribe( (recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(): void{
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }
}
