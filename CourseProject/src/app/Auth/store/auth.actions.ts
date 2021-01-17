import { Action } from "@ngrx/store";

export const LOGIN_START = 'Login Start';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_FAIL = '[Auth] Login Fail'


export class Login implements Action{
  readonly type: string = LOGIN;

  constructor(public payload: {email: string, userId: string, idToken: string, expDate: Date}){
  }
}

export class Logout implements Action{
  readonly type: string = LOGOUT;

  constructor(public payload: null){}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;

  constructor(public payload: {email: string; password: string}){}
}

export class LoginFail implements Action{
  readonly type: string = LOGIN_FAIL;

  constructor(public payload: {error: string}){}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
