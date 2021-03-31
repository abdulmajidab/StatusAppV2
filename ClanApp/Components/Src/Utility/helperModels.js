import constants from './Constant';
import moment from 'moment';
import {getUserTypeChatRoom, getLocalData} from './HelperFunction';

export const getLoginModel = (userName, mobile) => {
  return {
    userId: '',
    userName: userName,
    phoneNumber: mobile,
    numberType: 'MOBILE',
    country: '',
  };
};

export const getContactsChatModel = async item => {
  let id = await getLocalData(constants.USER_ID);
  return {
    roomId:item.roomId,
    userId: id,
    chatId: item._id,
    chatUnreadCount: 0,
    chat: [
      {
        userId: id,
        userName: await getLocalData(constants.USERNAME),
        chatId: item._id,
        chatName: item.username,
        chatMessage: '',
        chatNumber: item.phoneNumber,
        // chatNumberType: item.numberType,
        chatImage: '',
        chatTime: '',
        chatDelivery: 0,
      },
    ],
  };
};

export const getChatRoomChatModel = (chatItem, isNewChat, userId, text) => {
  // console.log('chatId for test',chatItem);
  const userType = getUserTypeChatRoom(chatItem, userId);
  const mChatId =
    userType === constants.OWNER ? chatItem.chatId : chatItem.userId;
  const mUserId =
    userType === constants.OWNER ? chatItem.userId : chatItem.chatId;

  const chatRequest = {
    isNewChat: isNewChat,
    roomId: chatItem.roomId,
    userId: chatItem.userId,
    chatId: chatItem.chatId,
    chatUnreadCount: 0,
    chat: {
      userId: mUserId,
      userName: chatItem.chat[0].userName,
      chatId: mChatId,
      chatName: chatItem.chat[0].chatName,
      chatMessage: text,
      chatNumber: chatItem.chat[0].chatNumber,
      chatImage: chatItem.chat[0].chatImage,
      chatTime: moment().format(),
      chatDelivery: 0,
    },
  };
  return chatRequest;
};

export const getChatListModel = (item, isNewChat, chatUnreadCount) => {
  // console.log('test for username',item);

  return {
    isNewChat: isNewChat,
    roomId: item.roomId,
    userId: item.userId,
    chatId: item.chatId,
    chatUnreadCount: chatUnreadCount,
    chat: {
      userId: item.userId,
      userName: item.chat[0].username,
      chatId: item.chat[0].chatId,
      chatName: item.chat[0].chatName,
      chatMessage: item.chat[0].chatMessage,
      chatNumber: item.chat[0].chatNumber,
      chatNumberType: item.chat[0].chatNumberType,
      chatImage: item.chat[0].chatImage,
      chatTime: item.chat[0].chatTime,
      chatDelivery: item.chat[0].chatDelivery,
    },
  };
};

export const getStatusModel = async (image, message) => {
  let id = await getLocalData(constants.USER_ID);
  let model = {
    userId: id,
    userName: await getLocalData(constants.USERNAME),
    lastStatusTime: '', // filled at server side
    status: [
      {
        image: image,
        message: message,
        seenUsers: [id],
        time: moment().format(),
      },
    ],
  };
  console.log('StatusModel => ', JSON.stringify(model));
  return model;
};
