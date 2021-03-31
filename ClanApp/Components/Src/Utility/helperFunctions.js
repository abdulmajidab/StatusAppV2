import Constant from './Constant';
import moment from 'moment';
import {Toast} from 'native-base';
import {StackActions} from '@react-navigation/native';
import {NAV_TYPES} from './navTypes';
import io from 'socket.io-client';
import {getLocalData} from './HelperFunction';


export const getTimeInFormat = time => {
  if (time === '') {
    return '';
  }
  const newTime = moment(time).format(Constant.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = time => {
  if (time === '') {
    return '';
  }
  const newTime = moment(time).format(Constant.DATE_TIME_FORMAT);
  return newTime;
};

export const getDateTimeStatusFormat = time => {
  if (time === '') {
    return '';
  }
  return `Last update ${getDateTimeInFormat(time)}`;
};

export const showToast = ({text, type}) => {
  Toast.show({
    text: text,
    buttonText: 'Done',
    type: type,
  });
};

export const getUniqueId = () => {
  const id = JSON.stringify(Date.now());
  console.log('UNIQUE ID => ', id);
  return id;
};


export const getUserType = async item => {
  // console.log('item s',item.userId)
  let userId = await getLocalData(Constant.USER_ID);
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   Constant.OWNER + ' User => ' + item.chat[0].chatName,
    // );
    return Constant.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.FRIEND + ' User => ' + item.chat[0].userName,
    // );
    return Constant.FRIEND;
  }
};

export const getUserTypeChatRoom = (item, userId) => {
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.OWNER + ' User => ' + JSON.stringify(item),
    // );
    return Constant.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.FRIEND + ' User => ' + JSON.stringify(item),
    // );
    return Constant.FRIEND;
  }
};


export function getSocket() {
  return io.connect(Constant.API.SOCKET_URL);
}

export function navigateStack({navigation, screen, props}) {
  navigation && navigation.navigate(screen, {props});
}
