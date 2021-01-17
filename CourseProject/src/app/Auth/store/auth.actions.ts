import { Action } from "@ngrx/store";

export const LOGIN_START = 'Login Start';
export const SINGUP_START = '[Auth] Signup Start'
export const AUTH_SUCCESS = '[Auth] Login';
export const AUTH_FAIL = '[Auth] Login Fail'
export const CLEAR_ERROR = '[Auth] Clear Error'

export const LOGOUT = '[Auth] Logout';


export class AuthSuccess implements Action{
  readonly type: string = AUTH_SUCCESS;

  constructor(public payload: {email: string, userId: string, idToken: string, expDate: Date}){
  }
}

export class SignupStart implements Action{
  readonly type: string = SINGUP_START;

  constructor(public payload: {email: string; password: string}){}
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
  readonly type: string = AUTH_FAIL;

  constructor(public payload: {error: string}){}
}

export class ClearError implements Action{
  readonly type: string = CLEAR_ERROR;

  constructor(public payload: null){}
}

export type AuthActions = AuthSuccess | SignupStart | Logout | LoginStart | LoginFail | ClearError;
