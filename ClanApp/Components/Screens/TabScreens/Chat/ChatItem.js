import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
// import { Right, Badge } from 'native-base';
import {Card, CardItem, Body, Left, Thumbnail, Icon, Right} from 'native-base';
import { getTimeInFormat, getUserType} from './../../../Src/Utility/helperFunctions';
import {DEFAULT_STYLES} from './../../../Src/Utility/styles';
import constants from './../../../Src/Utility/Constant';
import PROFILE from './../../../../assets/user.png';
const ChatItem = ({item, navigation, userId}) =>{
  const [userType, setUserType] = useState('');

  let data = item.chat[0];
  // console.log('chatlist item => ',data.chatMessage);


  useEffect(() => {
    setUserName();
  }, []);

  async function setUserName() {
    let userType = await getUserType(item);
    setUserType(userType);
  }
    return (
        <TouchableOpacity onPress={() => {
            navigation &&
            navigation.navigate("ChatRoom", {
                item: item,
                isNewChat: false,
            });
        }}>
        <Card transparent style={{elevation: 0, marginRight: -5}}>
        <CardItem>
          <View style={{marginLeft: -5}}>
            <Thumbnail
              source={
                data.chatImage === ''
                  ? PROFILE
                  : {isStatic: true, uri: data.chatImage}
              }
            />
          </View>
          <Body
            style={{
              flexDirection: 'column',
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
              {userType == constants.FRIEND ? data.userName : data.chatName}
            </Text>

            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {data.chatMessage}
            </Text>
          </Body>
          <View>
            <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
              {getTimeInFormat(data.chatTime)}
            </Text>
            {item.chatUnreadCount != 0 && (
              <View style={styles.textMsgCountView}>
                <Text
                  style={styles.textMsgCount}>
                  {item.chatUnreadCount}
                </Text>
              </View>
            )}
            {item.chatUnreadCount === 0 && (
              <Icon
                style={styles.msgIcon}
                name={data.chatUnreadCount}
                type={data.chatUnreadCount}
              />
            )}
          </View>
        </CardItem>
      </Card>

            
        </TouchableOpacity>
    );
};
export default ChatItem;
const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 18,
    marginTop: 3,
  },
  userMessage: {
    fontSize: 16,
    color: 'gray',
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 14,
    color: '#222222',
    alignSelf: 'flex-end',
  },
  msgIcon: {
    fontSize: 26,
    color: 'gray',
    marginTop: 3,
    alignSelf: 'flex-end',
    marginRight: -10,
  },
  textMsgCountView: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#00C854',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 6, 
  },
  textMsgCount: {
    fontSize: 14,
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '600'
  },
});
