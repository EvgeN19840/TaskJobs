export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
}

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchCommentsRequestAction {
  type: typeof FETCH_COMMENTS_REQUEST;
  payload: number; // postId
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: User[];
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

interface FetchCommentsSuccessAction {
  type: typeof FETCH_COMMENTS_SUCCESS;
  payload: Comment[];
}

interface FetchCommentsFailureAction {
  type: typeof FETCH_COMMENTS_FAILURE;
  payload: string;
}

export const fetchUsersRequest = (): FetchUsersRequestAction => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchCommentsRequest = (postId: number): FetchCommentsRequestAction => ({
  type: FETCH_COMMENTS_REQUEST,
  payload: postId,
});

export const fetchUsersSuccess = (users: User[]): FetchUsersSuccessAction => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchCommentsSuccess = (comments: Comment[]): FetchCommentsSuccessAction => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = (error: string): FetchCommentsFailureAction => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export type UserActionTypes =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | FetchCommentsRequestAction
  | FetchCommentsSuccessAction
  | FetchCommentsFailureAction;
