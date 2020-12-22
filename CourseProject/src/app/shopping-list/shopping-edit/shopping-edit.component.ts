import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    const newName = this.name.nativeElement.value;
    const newAmount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(newName, newAmount);

    this.slService.addIngredientToShoppingList(newIngredient);
  }
}
