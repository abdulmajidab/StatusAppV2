import React from 'react';
import {getLocalData} from './HelperFunction';
import constants from './Constant';

export const UserContext = React.createContext(getUserDetails());

export async function getUserDetails() {
  return {
    token: await getLocalData(constants.ACCESS_TOKEN),
    userId: await getLocalData(constants.USER_ID),
    userName: await getLocalData(constants.USER_NAME),
  };
}
