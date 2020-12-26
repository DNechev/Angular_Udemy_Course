import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  singUpForm: FormGroup;
  invalidUsernames = ['Maria', 'George'];

  ngOnInit() {
    this.singUpForm = new FormGroup({
      userDataFormGroup: new FormGroup({
        username: new FormControl(null, [Validators.required, this.invalidNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.invalidEmails)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    this.singUpForm.valueChanges.subscribe( (value) => {
      console.log(value);
    });

    this.singUpForm.statusChanges.subscribe( (value) => {
      console.log(value);
    });

    // this.singUpForm.setValue({
    //   'userDataFormGroup': {
    //     'username': 'TestName',
    //     'email': 'TestMail@TestMail.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });

    this.singUpForm.patchValue({
      'userDataFormGroup': {
        'username': 'TestName',
        'email': 'TestMail@TestMail.com'
      }
    });
  }

  getControls() {
    return (<FormArray>this.singUpForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.singUpForm);
    this.singUpForm.reset();
  }

  onAddHobby() {
    const hobby = new FormControl(null, Validators.required);
    (<FormArray>this.singUpForm.get('hobbies')).push(hobby);
  }

  invalidNames(control: FormControl): {[s: string]: boolean} {
    if (this.invalidUsernames.indexOf(control.value) !== -1) {
      return {'Name is invalid': true}
    } else {
      return null;
    }
  }

  invalidEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'invalid@invalid.com') {
          resolve({'Email is invalid': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
