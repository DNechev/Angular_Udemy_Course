import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../Shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import { StartEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // activeSub: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private logService: LoggingService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.activeSub = this.slService.ingredientsChanged.subscribe((newIngredients: Ingredient[]) => {
    //   this.ingredients = newIngredients.slice();
    // });
  }

  ngOnDestroy(): void {
    // this.activeSub.unsubscribe();
  }

  onSelectedItem(index: number): void {
    this.store.dispatch(new StartEdit(index));
    // this.slService.selectedItem.next(index);
  }
}
