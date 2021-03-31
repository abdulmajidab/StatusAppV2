import AsyncStorage from '@react-native-async-storage/async-storage';
import contants from './Constant';

export const setLocalData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('AsyncStorage Error', e);
    }
};

export async function clearLocalData() {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log('AsyncStorage Error', e);
    }
}

export async function getLocalData(key) {
    let value = '';
    try {
        value = await AsyncStorage.getItem(key);
    } catch (e) {
        console.log('AsyncStorage Error', e);
    }
    return value;
};

export const getUserTypeChatRoom = (item, userId) => {
    if (item.userId === userId) {
      // console.log(
      //   'UserType => ',
      //   constants.OWNER + ' User => ' + JSON.stringify(item),
      // );
      return contants.OWNER;
    } else if (item.chatId === userId) {
      // console.log(
      //   'UserType => ',
      //   constants.FRIEND + ' User => ' + JSON.stringify(item),
      // );
      return contants.FRIEND;
    }
  };
