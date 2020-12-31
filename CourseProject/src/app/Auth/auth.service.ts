import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZxkZXVHuygRehxmg6Z2a7c_6PVT173sU';
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZxkZXVHuygRehxmg6Z2a7c_6PVT173sU';

  constructor(private http: HttpClient){}

  signIn(email: string, password: string): any {
    return this.http.post<AuthResponseData>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(error => {
      let errorMessage = 'An unknown error occurred!';
      if (!error.error || !error.error.error) {
        return throwError(errorMessage);
      } else {
        switch (error.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email is not found!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password!';
            break;
        }
        return throwError(errorMessage);
      }
    }));
  }

  signUp(email: string, password: string): any {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError( error => {
      let errorMessage = 'An unknown error occurred!';
      if (!error.error || !error.error.error) {
        return throwError(errorMessage);
      } else {
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists!';
            break;
        }
        return throwError(errorMessage);
      }
    }));
  }
}
