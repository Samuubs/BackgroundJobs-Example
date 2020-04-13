import { put, all, takeEvery, call, fork, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/types';
import api from '../service/api';
import {startWatchingNetworkConnectivity} from './offline'
 
function* handleAddUser(action) {
    console.log("sagaa")
    const response = yield call(api.get, `/users/${action.payload}`);
    console.log(response.data.bio);

    yield put({
        type: actionTypes.ADD_USER_SUCCESS,
        payload: response.data.bio
    })
}

function* rootSaga() {
    yield all([
        yield fork(startWatchingNetworkConnectivity),
        yield takeEvery(actionTypes.ADD_USER, handleAddUser)
    ])
}

export default rootSaga;
