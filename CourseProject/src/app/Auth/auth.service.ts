import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../Auth/store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExpTimer: any;

  constructor(private store: Store<fromApp.AppState>){}

  setLogoutTimer(expirationDuration: number): void {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout(null));
    }, expirationDuration);
  }

  clearLogoutTimer(): void {
    if(this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
