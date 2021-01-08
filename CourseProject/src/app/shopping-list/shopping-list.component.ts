import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
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

  constructor(private slService: ShoppingListService, private logService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.activeSub = this.slService.ingredientsChanged.subscribe((newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients.slice();
    });
    this.logService.printLog('Hello from ShoppinListComponent!');
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }

  onSelectedItem(index: number): void {
    this.slService.selectedItem.next(index);
  }
}
