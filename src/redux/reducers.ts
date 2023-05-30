
import { combineReducers, Reducer } from 'redux';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UserActionTypes,
} from './actions';

interface User {
  id: number;
  name: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialUserState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer: Reducer<UserState, UserActionTypes> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export interface RootState {
  users: UserState;
}

const rootReducer = combineReducers<RootState>({
  users: userReducer,
});

export default rootReducer;
