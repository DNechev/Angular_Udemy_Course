import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../Shared/alert/alert.component';
import { PlaceholderDirective } from '../Shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../Auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogInMode = true;
  isLoading = false;
  error: string;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
    private cmpFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    // this.authService.userSubject.subscribe( user => {
    //   console.log(user);
    // });
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    console.log('sub removed');
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
      this.store.dispatch(new AuthActions.SignupStart({email: mail, password: pass}))
    } else {
      // authObservable = this.authService.signIn(mail, pass);
      this.store.dispatch(new AuthActions.LoginStart({email: mail, password: pass}))
    }

    // authObservable.subscribe(response => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // }, error => {
    //   this.isLoading = false;
    //   // this.error = error;
    //   this.showErrorAlert(error);
    // });

    this.authForm.reset();
  }

  showErrorAlert(error: string): void {
    console.log('something');
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);
    cmpRef.instance.message = error;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
