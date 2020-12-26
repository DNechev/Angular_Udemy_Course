import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  singUpForm: FormGroup;

  ngOnInit() {
    this.singUpForm = new FormGroup({
      userDataFormGroup: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  getControls() {
    return (<FormArray>this.singUpForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.singUpForm);
  }

  onAddHobby() {
    const hobby = new FormControl(null, Validators.required);
    (<FormArray>this.singUpForm.get('hobbies')).push(hobby);
  }
}
