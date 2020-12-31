import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZxkZXVHuygRehxmg6Z2a7c_6PVT173sU';

  constructor(private http: HttpClient){}

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
        }
        return throwError(errorMessage);
      }
    }));
  }
}
