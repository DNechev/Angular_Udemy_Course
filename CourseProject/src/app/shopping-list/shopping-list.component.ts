import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // activeSub: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private slService: ShoppingListService, private logService: LoggingService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.activeSub = this.slService.ingredientsChanged.subscribe((newIngredients: Ingredient[]) => {
    //   this.ingredients = newIngredients.slice();
    // });
    this.logService.printLog('Hello from ShoppinListComponent!');
  }

  ngOnDestroy(): void {
    // this.activeSub.unsubscribe();
  }

  onSelectedItem(index: number): void {
    this.slService.selectedItem.next(index);
  }
}
