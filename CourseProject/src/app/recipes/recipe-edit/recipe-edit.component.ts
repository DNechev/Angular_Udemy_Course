import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private recipesService: RecipeService) {
   }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.InitForm();
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  private InitForm(): void {
    const recipe = this.recipesService.getRecipeById(this.id);
    const recipeName = this.editMode ? recipe.name : '';
    const imagePath = this.editMode ? recipe.imagePath : '';
    const description = this.editMode ? recipe.description : '';
    let recipeIngredients = new FormArray([]);

    if (recipe['ingredients']) {
      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(new FormGroup( {
          name: new FormControl(ingredient.name),
          amount: new FormControl(ingredient.amount)
        }));
      }
    }

    console.log(recipeIngredients);

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeImagePath: new FormControl(imagePath),
      recipeDescription: new FormControl(description),
      ingredients: recipeIngredients,
    });
  }

  getControls(): any {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
