import { UserModel } from "../user.model";
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: UserModel;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions){
  switch (action.type) {
    case AuthActions.LOGIN:
      const email: string = action.payload['email'];
      const id: string = action.payload['userId'];
      const token: string = action.payload['idToken'];
      const expDate: Date = action.payload['expDate'];
      const user = new UserModel(email, id, token, expDate);
    return {
      ...state,
      user: user,
      authError: null,
      isLoading: false
    };
    case AuthActions.LOGOUT:
      return{
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
      return{
        ...state,
        authError: null,
        isLoading: true
      };
    case AuthActions.LOGIN_FAIL:
      return{
        ...state,
        user: null,
        authError: action.payload['error'],
        isLoading: false
      };
    default:
      return state;
  }
}
