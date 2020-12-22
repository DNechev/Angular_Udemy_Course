import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() newIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(){
    this.newIngredient.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }
}
