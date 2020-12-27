import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipesService: RecipeService, private router: Router) {
   }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.InitForm();
    });
  }

  onSubmit(): void {
    const name = this.recipeForm.get('recipeName').value;
    const desc = this.recipeForm.get('recipeDescription').value;
    const path = this.recipeForm.get('recipeImagePath').value;
    const ings: Ingredient[] = [];

    for (const control of (this.recipeForm.get('ingredients') as FormArray).controls) {
      const newIng = new Ingredient(control.value['name'], control.value['amount']);
      console.log(newIng);
      ings.push(newIng);
    }

    const newRecipe = new Recipe(name, desc, path, ings);

    if (this.editMode) {
      this.recipesService.editRecipe(this.id, newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  private InitForm(): void {
    const recipe = this.recipesService.getRecipeById(this.id);
    const recipeName = this.editMode ? recipe.name : null;
    const imagePath = this.editMode ? recipe.imagePath : null;
    const description = this.editMode ? recipe.description : null;
    let recipeIngredients = new FormArray([]);

    if(recipe !== undefined && recipe !== null) {
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup( {
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeImagePath: new FormControl(imagePath, [Validators.required]),
      recipeDescription: new FormControl(description, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }

  getControls(): any {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClearIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }
}
