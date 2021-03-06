import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, tap, catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { AuthService } from "../auth.service";
import * as authActions from '../store/auth.actions';
import { UserModel } from "../user.model";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, localId: string, idToken: string) => {
  const expDate = new Date(new Date().getTime() + (expiresIn * 1000));
  const user = new UserModel(email, localId, idToken, expDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new authActions.AuthSuccess({email: email, userId: localId,
     idToken: idToken, expDate: expDate, redirect: true});
}

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new authActions.LoginFail({error: errorMessage}));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new authActions.LoginFail({error: errorMessage}));
}


@Injectable()
export class AuthEffects {
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey;
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey;

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService){
  }

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(authActions.SINGUP_START),
    switchMap((authData: authActions.SignupStart) => {
      console.log('SINGUP!!!');
      return this.http.post<AuthResponseData>(this.signUpUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      })
      .pipe(
        tap((responseData) => this.authService.setLogoutTimer(+responseData.expiresIn * 1000)),
        map((responseData: AuthResponseData) => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken)),
        catchError(errorRes => handleError(errorRes))
      )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((authData: authActions.LoginStart) => {
      return this.http.post<AuthResponseData>(this.signInUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      })
      .pipe(
        tap((responseData) => this.authService.setLogoutTimer(+responseData.expiresIn * 1000)),
        map((responseData: AuthResponseData) => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken)),
        catchError(errorRes => handleError(errorRes))
      )
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(authActions.AUTH_SUCCESS),
    tap((userData: authActions.AuthSuccess) => {
    if(userData.payload.redirect){
      this.router.navigate(['/']);
    }
  }))

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  )

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {type: 'prevent autoLogin error'};
      }

      const user = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if (user.token) {
        const expiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expiration);
        return new authActions.AuthSuccess({email: user.email, userId: user.id, idToken: user.token, expDate: new Date(userData._tokenExpirationDate), redirect: false});
      }

      return {type: 'prevent autoLogin error'};
    })
  )
}
