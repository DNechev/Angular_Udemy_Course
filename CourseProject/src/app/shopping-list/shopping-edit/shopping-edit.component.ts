import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  currentSubscription: Subscription;
  editMode = false;
  selectedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.currentSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.index > -1) {
        this.editMode = true;
        this.selectedItem = stateData.editedIngredient;
        this.form.setValue({
          productName: this.selectedItem.name,
          amount: this.selectedItem.amount
        });
      } else {
        this.editMode = false;
      }
    })

    // this.currentSubscription = this.slService.selectedItem.subscribe( (index: number) => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.selectedItem = this.slService.getIngredient(this.editedItemIndex);
    //   this.form.setValue({
    //     productName: this.selectedItem.name,
    //     amount: this.selectedItem.amount
    //   });
    // });
  }

  onSubmit(formData: NgForm): void {
    if (!this.editMode) {
      const ingredient = new Ingredient(formData.value.productName, formData.value.amount);
      // this.slService.addIngredientToShoppingList(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      console.log('adding');
    } else {
      const newName: string = formData.value.productName;
      const newAmount: number =  formData.value.amount;
      // this.slService.editIngredient(this.editedItemIndex, new Ingredient(newName, newAmount));
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(newName, newAmount)));
    }
    this.onClear();
  }

  ngOnDestroy(): void {
    this.currentSubscription.unsubscribe();
  }

  onClear(): void {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
