import * as actionTypes from '../actions/types';
import { markActionsOffline } from 'redux-offline-queue'


export const Creators = {
    addUser: (name) => {
      return {
        type: actionTypes.ADD_USER,
        payload: name
      }
    },
  }
   
markActionsOffline(Creators, ['addUser'])
