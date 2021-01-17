import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, tap, catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import * as authActions from '../store/auth.actions';

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
  return new authActions.AuthSuccess({email: email, userId: localId,
     idToken: idToken, expDate: expDate});
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

  constructor(private actions$: Actions, private http: HttpClient, private router: Router){
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
        map((responseData: AuthResponseData) => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken)),
        catchError(errorRes => handleError(errorRes))
      )
    })
  );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(ofType(authActions.AUTH_SUCCESS), tap(userData => {
      this.router.navigate(['/']);
  }))
}
