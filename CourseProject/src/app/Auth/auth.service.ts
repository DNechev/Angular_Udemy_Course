import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    });
  }
}
