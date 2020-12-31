import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogInMode = true;
  isLoading = false;
  error: string;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService){}

  onSwitchMode(): void {
    this.isLogInMode = !this.isLogInMode;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const mail = this.authForm.controls.email.value;
    const pass = this.authForm.controls.password.value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (!this.isLogInMode) {
      authObservable = this.authService.signUp(mail, pass);
    } else {
      authObservable = this.authService.signIn(mail, pass);
    }

    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.error = error;
    });

    this.authForm.reset();
  }
}
