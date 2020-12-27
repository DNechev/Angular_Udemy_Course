import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    const recipeName = this.editMode ? this.recipesService.getRecipeById(this.id).name : '';
    const imagePath = this.editMode ? this.recipesService.getRecipeById(this.id).imagePath : '';
    const description = this.editMode ? this.recipesService.getRecipeById(this.id).description : '';

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeImagePath: new FormControl(imagePath),
      recipeDescription: new FormControl(description)
    });
  }
}
