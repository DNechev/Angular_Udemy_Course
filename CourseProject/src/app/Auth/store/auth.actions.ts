import { Action } from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export class Login implements Action{
  readonly type: string = LOGIN;

  constructor(public payload: {email: string, userId: string, idToken: string, expDate: Date}){
  }
}

export class Logout implements Action{
  readonly type: string = LOGOUT;

  constructor(public payload: null){}
}

export type AuthActions = Login | Logout;
