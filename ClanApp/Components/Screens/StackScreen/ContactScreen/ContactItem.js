import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Card, CardItem, Body, Left, Thumbnail, Icon, Right} from 'native-base';
import {DEFAULT_STYLES} from './../../../Src/Utility/colors';
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  WHITE,
  LIGHT_GREEN,
  TEXT_TITLE,
} from './../../../Src/Utility/colors';
import {NAV_TYPES} from './../../../Src/Utility/navTypes';
import USER from './../../../../assets/user.png';
import {getContactsChatModel} from './../../../Src/Utility/helperModels';

const ContactsItem = ({item, navigation, userChatList}) => {
    // console.log('user id => ',item._id);
  async function checkExistingRoom(){
    let isMatch = false;
    // console.log();
    if (userChatList.data && userChatList.data.length > 0) {
      for (let index = 0; index < userChatList.data.length; index++) {
        const element = userChatList.data[index];
        console.log('element id=>',element.userId);
        if (
          element.userId === item._id ||
          element.userId === item.chatId ||
          element.chatId === item.userId ||
          element.chatId === item.chatId
        ) {
          navigateChatRoom(element);
          isMatch = true;
          break;
        }
      }

      if (!isMatch) {
        let chatModel = await getContactsChatModel(item);
        navigateChatRoom(chatModel);
      }
      isMatch = false;
    } else {
      let chatModel = await getContactsChatModel(item);
      // console.log('else');
      navigateChatRoom(chatModel);
    }
  }

  function navigateChatRoom(chatModel) {
      navigation.navigate("ChatRoom", {
        item: chatModel,
        isNewChat: true,
      });
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        checkExistingRoom();
      }}>
      <Card transparent style={{elevation: 0, marginRight: -5, height: 80}}>
        <CardItem>
          <View style={styles.cardStyle}>
            {!item.thumbnailPath && <Thumbnail source={USER} />}
            {/* {item.thumbnailPath != '' && (
              <Thumbnail source={{isStatic: true, uri: item.thumbnailPath}} />
            )} */}
          </View>
          <Body
            style={{
              flexDirection: 'column',
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={[ styles.userName]}>
              {item.username}
            </Text>
            <Text
              numberOfLines={2}
              style={[ styles.userMessage]}>
              {item.phoneNumber}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default ContactsItem;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 16,
    marginTop: 5,
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 12,
    color: GRAY,
    alignSelf: 'flex-end',
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-end',
    marginRight: -10,
  },
  textMsgCountView: {
    fontSize: 12,
    color: WHITE,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 10,
  },
  textMsgCount: {
    fontSize: 14,
    color: GRAY,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardStyle: {
    marginLeft: -5,
    marginTop: Platform.OS === 'android' ? -15 : 0,
  },
});
