import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserModel } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  userSubject = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient, private router: Router){}

  signIn(email: string, password: string): any {
    return this.http.post<AuthResponseData>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap<AuthResponseData>( rData => {
      this.handleAuthentication(rData.email, rData.localId, rData.idToken, +rData.expiresIn);
    }));
  }

  signUp(email: string, password: string): any {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap<AuthResponseData>( rData => {
      this.handleAuthentication(rData.email, rData.localId, rData.idToken, +rData.expiresIn);
    }));
  }

  logOut(): void {
    this.userSubject.next(null);
    this.router.navigate(['auth']);
  }

  autoLogIn(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (user.token) {
      this.userSubject.next(user);
    }
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expDate: number) {
    const date = new Date(new Date().getTime() + (expDate * 1000));
    const user = new UserModel(email, localId, idToken, date);
    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error): any {
    let errorMessage = 'An unknown error occurred!';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    } else {
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists!';
          break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email is not found!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password!';
            break;
      }
      return throwError(errorMessage);
    }
  }
}
