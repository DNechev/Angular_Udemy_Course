import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  activeSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.activeSub = this.slService.ingredientsChanged.subscribe((newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients.slice();
    });
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }

  onSelectedItem(index: number): void {
    this.slService.selectedItem.next(index);
  }
}
