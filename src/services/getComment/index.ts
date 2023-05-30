import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,

} from
 '../../redux/actions';

interface User {
  id: number;
  name: string;

}

interface PartialFetchUsersResponse extends AxiosResponse {
  data: Partial<User>[];
}

function* fetchUsersSaga(): Generator {
  try {
    const response: unknown = yield call(
      axios.get,
      'https://jsonplaceholder.typicode.com/comments'
    );
    console.log('Response:', response); // Log the response
    const typedResponse = response as PartialFetchUsersResponse;
    yield put(fetchUsersSuccess(typedResponse.data as User[]));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* rootSaga(): Generator {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
}

export default rootSaga;
