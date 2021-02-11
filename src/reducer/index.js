import {combineReducers} from 'redux'
import auth from './auth';
import alert from './alert';
import postMessage from './postMessage';
import getRoomData from './getRoomData';
import getUsers from './getUsers';

export default combineReducers({
    auth:auth,
    alert:alert,
    postMessage:postMessage,
    getRoomData:getRoomData,
    getUsers: getUsers
})