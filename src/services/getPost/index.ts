// rootSaga.ts

import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  FETCH_COMMENTS_REQUEST,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} from '../../redux/actions';

import { User, Comment } from "../../redux/types";

interface PartialFetchUsersResponse extends AxiosResponse {
  data: Partial<User>[];
}

interface FetchCommentsResponse extends AxiosResponse {
  data: Comment[];
}

function* fetchUsersSaga(): Generator {
  try {
    const response: unknown = yield call(
      axios.get,
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log('Post', response); // Log the response
    const typedResponse = response as PartialFetchUsersResponse;

    const usersWithComments: Partial<User>[] = yield all(
      typedResponse.data.map((user: Partial<User>) =>
        call(fetchCommentsForUser, user)
      )
    );

    const users: User[] = usersWithComments.map((user: Partial<User>) => {
      const { comments, ...rest } = user;
      return {
        ...rest,
        comments: comments || [],
      } as User;
    });

    yield put(fetchUsersSuccess(users));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* fetchCommentsForUser(user: Partial<User>): Generator {
  if (!user.comments) {
    try {
      const response: unknown = yield call(
        axios.get,
        `https://jsonplaceholder.typicode.com/comments?postId=${user.id}`
      );
      console.log('Comments', response); // Log the response
      const typedResponse = response as FetchCommentsResponse;
      const updatedUser: Partial<User> = {
        ...user,
        comments: typedResponse.data,
      };
      return updatedUser;
    } 
   
catch (error: any) {
      console.error('Error fetching comments:', error);
      return user;
    }
  } else {
    return user;
  }
}

function* fetchCommentsSaga(action: { type: string; payload: number }): Generator {
  try {
    const postId = action.payload;
    const response: unknown = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    console.log('Comments', response); // Log the response
    const typedResponse = response as FetchCommentsResponse;

    yield put(fetchCommentsSuccess(typedResponse.data));
  } catch (error: any) {
    yield put(fetchCommentsFailure(error.message));
  }
}

export default function* rootSaga(): Generator {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(FETCH_COMMENTS_REQUEST, fetchCommentsSaga);
}
