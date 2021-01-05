import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../Shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogInMode = true;
  isLoading = false;
  error: string;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router, private cmpFactoryResolver: ComponentFactoryResolver){}

  ngOnInit(): void {
    this.authService.userSubject.subscribe( user => {
      console.log(user);
    });
  }

  onClosedAlert(): void {
    this.error = null;
  }

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
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      this.isLoading = false;
      // this.error = error;
      this.showErrorAlert(error);
    });

    this.authForm.reset();
  }

  showErrorAlert(error: string) {
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);

  }
}
