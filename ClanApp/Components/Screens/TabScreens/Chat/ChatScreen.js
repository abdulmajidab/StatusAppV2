import React, { useState,useEffect,useReducer } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, LogBox,View,Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Contacts from 'react-native-contacts';
import ChatItem from './ChatItem';
import { Icon } from 'native-base';
import * as api from './../../../Src/Api/APIController';
import { setLocalData, getLocalData } from './../../../Src/Utility/HelperFunction';
import constants from './../../../Src/Utility/Constant';
import {THEME} from './../../../Src/Utility/colors';
import EmptyComponent from './../../../EmptyComponent';
import _Divider from './../../../_Divider';
import CHAT from './../../../../assets/chat.png';

import {
  initialChatListState,
  chatListReducer,
  CHAT_LIST,
  CHAT_ITEM,
  REFRESH,
} from './ChatListReducer';
import {
  getUserType,
  getSocket,
} from './../../../Src/Utility/helperFunctions';
import {useFocusEffect} from '@react-navigation/native';


var socket = getSocket();
function ChatScreen({navigation}) {
  const [state, dispatch] = useReducer(chatListReducer,initialChatListState)
  var {chatList, chatItem, refresh, userId} = state;
  // const navigation = useNavigation();
  // console.log('chatList =>',chatList);
  useFocusEffect(
    React.useCallback(() => {
      getLatestChats();
    }, []),
  );

  useEffect(() => {
    listenSocket();
  }, []);

  useEffect(() => {
    if (refresh) {
      getLatestChats();
    }
  }, [refresh]);

  useEffect(() => {
    // console.log('Chat List Changed == ', JSON.stringify(chatList));
    if (chatItem != '') {
      renderChats();
    }
  }, [chatItem]);

  async function getUserId() {
    const userId = await getLocalData(constants.USER_ID);
    dispatch({type: constants.USER_ID, payload: userId});
    return userId;
  }
  const getLatestChats = async () => {
    // await getUserId();
    const id = await getLocalData(constants.USER_ID);
    // console.log('id',userId);
    api.getChatList({id}).then(res => {
        // console.log('RESPONSE CHAT => ' + JSON.stringify(res.data));
        if (res.status === 200) {
          dispatch({type: CHAT_LIST, payload: res.data});
        }
        dispatch({type: REFRESH, payload: false});
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };

  async function renderChats() {
    let chatArray = chatList;
    // console.log("Message CHAT Received => ", JSON.stringify(chatArray.data));
    var isMatch = false;
    if (chatArray.length > 0) {
      // console.log('test');
      for (let i = 0; i < chatArray.length; i++) {
        const element = chatArray[i];
        if (chatItem && element.roomId === chatItem.roomId) {
          // Increment unread count
          chatItem = await calcUnreadCount(chatItem, element.chatUnreadCount);
          // Since chat item received is an object to convert it to array and they re initialise
          // if (chatItem.chat.length <= 0) {
          chatItem.chat = [chatItem.chat];
          // }
          console.log("Selected Chat Received => ", JSON.stringify(chatItem));
          chatArray = chatItem;
          isMatch = true;
          break;
        }
      }
      if (!isMatch && chatItem.chatUnreadCount.type != 'reset') {
        // Increment unread count
        chatItem = await calcUnreadCount(chatItem, 0);
        // Since chat item received is an object to convert it to array and they re initialise
        // if (chatItem.chat.length <= 0) {
        chatItem.chat = [chatItem.chat];
        // }
        console.log("Selected Chat Received => ", JSON.stringify(chatItem));
        chatArray.push(chatItem);
      }
      // console.log("Message CHAT AFTER Received => ", JSON.stringify(chatItem));
      dispatch({ type: CHAT_LIST, payload: chatArray.data });
      // console.log(`FINAL CHAT ARRAY ${refresh} => `,"JSON.stringify(chatArray.data)");
    }else{
      // For new chat
      if (chatItem.chatUnreadCount.type === "add") {
        dispatch({ type: REFRESH, payload: true });
      }
    }
  }

  function listenSocket() {
    // socket.removeListener(constants.CHAT_LIST);
    socket.on(constants.CHAT_LIST, chatItem => {
      dispatch({type: CHAT_ITEM, payload: chatItem});
    });
  }
  function calcUnreadCount(chatItem, originalCount) {
    // const userId = await getLocalData(constants.USER_ID);
    if (chatItem.chatUnreadCount.userId != userId) {
      if (chatItem.chatUnreadCount.type === 'reset') {
        chatItem.chatUnreadCount = 0;
      } else if (chatItem.chatUnreadCount.type === 'add') {
        chatItem.chatUnreadCount = originalCount ? originalCount + 1 : 1;
      } else {
        chatItem.chatUnreadCount = 0;
      }
    } else if (chatItem.chatUnreadCount.type === 'reset') {
      chatItem.chatUnreadCount = 0;
    } else {
      chatItem.chatUnreadCount = originalCount;
    }
    return chatItem;
  }
  return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          {chatList.length === 0 && <EmptyComponent message={'No Chats Found'} />}
          <FlatList
              data={chatList.data}
              extraData={refresh}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
              return <_Divider />;
              }}
              renderItem={({item, index}) => {
              return (
                  <ChatItem item={item} navigation={navigation} userId={userId} />
              );
              }}
          />
        </View>
        <TouchableOpacity style={styles.fabStyle} 
            onPress={() => {navigation.navigate('ContactScreen',{chatList}) }}>
            <Icon
              name='chatbox-ellipses-outline'
              style={{color:'#fff'}}
            />
        </TouchableOpacity>
      </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listStyle: {
        flex: 1,
    },
    fabStyle: {
        position: 'absolute',
        right: 35,
        bottom: 30,
        height:60,
        width:60,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:THEME,
    },
    imageStyle: {
        width: 30,
        height: 30,
    },
    btnView: {
    marginTop: 15,
    marginRight: -5,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  thumbView: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    tintColor: 'white',
  },
});