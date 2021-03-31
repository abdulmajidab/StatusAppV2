import axios from 'axios';
import constants from './../Utility/Constant';

const api = axios.create({
    baseURL: constants.API.SERVER_URL,
});

export function signInUser(payload) {
    return api.post(constants.API.SIGN_USER, payload);
};

export function updateUser(payload) {
    return api.post(constants.API.UPDATE_USER, payload);
};

export function verifyUser(payload) {
    return api.post(constants.API.VERIFY_USER, payload);
};

export function ressendNumber(payload) {
  return api.post(constants.API.RESEND_OTP, payload);
};

  export const getChatList = (payload) => {
    return api.post(constants.API.CHAT_LIST,payload);
  };
  export const getChatRoom = payload => {
    return api.post(constants.API.CHAT_ROOM, payload);
  };
  export const createChatRoom = payload => {
    return api.post(constants.API.CREATE_CHAT_ROOM, payload);
  };
  export const updateChatRoom = payload => {
    return api.post(constants.API.UPDATE_CHAT_ROOM, payload);
  };
  
  export const loginUser = payload => {
    return api.post(constants.API.LOGIN_USER, payload);
  };
  
  export const getLoggedInUserList = payload => {
    return api.get(constants.API.USER_LIST, payload);
  };
  
  export const getLastSeenUser = payload => {
    return api.post(constants.API.LAST_SEEN, payload);
  };
  
  export const createUserStatus = payload => {
    return api.post(constants.API.CREATE_USER_STATUS, payload);
  };
  
  export const getAllUserStatus = (payload) => {
    return api.get(constants.API.GET_ALL_STATUS,payload);
  };
  
  export const setUserStatusViewedForID = payload => {
    return api.post(constants.API.SET_STATUS_VIEWED, payload);
  };