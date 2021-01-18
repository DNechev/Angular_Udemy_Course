import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../Shared/alert/alert.component';
import { PlaceholderDirective } from '../Shared/placeholder/placeholder.directive';
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
  private storeSub: Subscription;

  constructor(private cmpFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
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

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onClosedAlert(): void {
    this.store.dispatch(new AuthActions.ClearError(null));
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

    if (!this.isLogInMode) {
      this.store.dispatch(new AuthActions.SignupStart({email: mail, password: pass}))
    } else {
      this.store.dispatch(new AuthActions.LoginStart({email: mail, password: pass}))
    }

    this.authForm.reset();
  }

  showErrorAlert(error: string): void {
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);
    cmpRef.instance.message = error;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }
}
