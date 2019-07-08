import io from 'socket.io-client';

import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG} from './action-types';
import {reqLogin, reqRegister, reqUpdateUser, reqUser, reqUserList, reqReadMsg, reqChatMsgList} from '../api/index';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data:userList})
export const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
export const receiveMsg = ({chatMsg, userid}) => ({type: RECEIVE_MSG, data:{chatMsg, userid}})



//register action
export const register = (user) => {
    const {username, password, password2, type} = user;
    if (!username) {
        return errorMsg('username is mandatory');
    }
    if (password !== password2) {
        return errorMsg('password is not same as password');
    }

    return async dispatch => {
        const response = await reqRegister(user);
        const result = response.data;
        if (result.code === 0) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}

//login action
export const login = (user) => {
// export function login(user){   
    const {username, password} = user;
    if (!username) {
        return errorMsg('username is mandatory');
    }
    if (!password) {
        return errorMsg('password is mandatory');
    }

    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)

            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}

export const update = (userInfo) => {
    return async dispatch => {
        const response = await reqUpdateUser(userInfo)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

export const getUser = (userInfo) => {
    return async dispatch => {
        const response = await reqUser(userInfo)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}


export const getUserList = (type='people') => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data;
        if (result.code === 0) {
            dispatch(receiveUserList(result.data));
        }
    }
}


export function initIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://10.159.194.3:4000');

        io.socket.on('receiveMsg', function(chatMsg) {
            console.log('msg from serve',chatMsg)

            if(userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg({chatMsg, userid}))
            }
        })
    }
}

async function getMsgList(dispatch, userId) {
    initIO(dispatch, userId)
    const response = await reqChatMsgList()
    const result = response.data

    if(result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs, userId}))
    }
}

export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        io.socket.emit('sendMsg', {from, to, content});
    }
}