import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  FETCH_COMMENTS_REQUEST,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} from '../../redux/actions';

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  postId: number;
  body: string;
}

interface PartialFetchUsersResponse extends AxiosResponse {
  data: Partial<User>[];
}

interface FetchCommentsResponse extends AxiosResponse {
  data: Comment[];
}



function* fetchCommentsSaga(action: { type: string; payload: number }): Generator {
    try {
      const postId = action.payload;
      const response: unknown = yield call(
        axios.get,
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      
      const typedResponse = response as FetchCommentsResponse;
      
      yield put(fetchCommentsSuccess(typedResponse.data));
    } catch (error: any) {
      yield put(fetchCommentsFailure(error.message));
    }
  }
  

function* rootSaga(): Generator {

  yield takeLatest(FETCH_COMMENTS_REQUEST, fetchCommentsSaga);
}

export default rootSaga;
