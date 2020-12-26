import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  invalidProjectName = 'Test';
  projectName = '';
  projectStatus = '';
  email = '';

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.validateProjectNameAsync.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null)
    });
    this.projectForm.patchValue({
      projectName: 'TestProject',
      projectStatus: 'stable'
    })
  }

  onSubmit() {
    console.log(this.projectForm)
    this.projectName = this.projectForm.get('projectName').value;
    this.email = this.projectForm.get('email').value;
    this.projectStatus = this.projectForm.get('projectStatus').value;
    this.projectForm.reset();
  }

  // validateProjectName(control: FormControl): {[s: string]: boolean} {
  //       if(this.invalidProjectName === control.value) {
  //         return ({'Project name is invalid': true});
  //       } else {
  //         return null;
  //       }
  //   };

  validateProjectNameAsync(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(this.invalidProjectName === control.value) {
          resolve({'Project name is invalid': true});
        } else {
          resolve(null);
        }
      }, 2000);
    });

    return promise;
  }
}
