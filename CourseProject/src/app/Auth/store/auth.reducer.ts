import { UserModel } from "../user.model";
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: UserModel
}

const initialState: State = {
  user: null
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const email: string = action.payload.email;
      const id: string = action.payload.userId;
      const token: string = action.payload.idToken;
      const expDate: Date = action.payload.expDate;
      const user = new UserModel(email, id, token, expDate);
    return {
      ...state,
      user: user
    };
    case AuthActions.LOGOUT:
      return{
        ...state,
        user: null
      }
    default:
      return state;
  }
}
