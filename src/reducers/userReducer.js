import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    users: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.ADD_USER_SUCCESS:
            return { ...state, users: [...state.users, action.payload] }
    }
    return state;
}
