import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  currentSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  selectedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.currentSubscription = this.slService.selectedItem.subscribe( (index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.selectedItem = this.slService.getIngredient(this.editedItemIndex);
      this.form.setValue({
        productName: this.selectedItem.name,
        amount: this.selectedItem.amount
      });
    });
  }

  onSubmit(formData: NgForm): void {
    if (!this.editMode) {
      const ingredient = new Ingredient(formData.value.productName, formData.value.amount);
      this.slService.addIngredientToShoppingList(ingredient);
    } else {
      this.slService.editIngredient(this.editedItemIndex, formData.value.productName, formData.value.amount);
    }
    this.onClear();
  }

  ngOnDestroy(): void {
    this.currentSubscription.unsubscribe();
  }

  onClear(): void {
    this.editMode = false;
    this.form.reset();
  }

  onDelete(): void {
    console.log(this.selectedItem);
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
