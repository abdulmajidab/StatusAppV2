import React, {useEffect, useState, useReducer} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform, Dimensions} from 'react-native';
import StoryContainer from './Screens/TabScreens/statusDetails/stories/StoryContainer';
import {WHITE, BLACK, MODAL_BACKGROUND, GRAY} from './Src/Utility/colors';
import {TINT_GRAY, SLATE_GRAY} from './Screens/TabScreens/statusDetails/utils/colors';
import {getDateTimeStatusFormat} from './Src/Utility/helperFunctions';
import imageAndroidBack from './../assets/left_android.png';
import imageIOSBack from './../assets/left_ios.png';
import imgProfile from './../assets/user.png';
import {statusReducer, statusState} from './Screens/TabScreens/status/StatusReducer';
import {getStatus, setUserStatusViewed} from './Screens/TabScreens/status/StatusActions';

const StatusProgressView = ({navigation, route}) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);
  var {imageList, messageList} = state;
  const statusData = JSON.parse(route.params.statusData);
  const isUser = JSON.parse(route.params.isUser);

  useEffect(() => {
    getStatus(statusData, dispatch);
    if (!isUser){
      setUserStatusViewed(statusData, 0);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{backgroundColor: SLATE_GRAY}}>
        <StoryContainer
          images={imageList}
          visible={true}
          duration={20}
          enableProgress={true}
          userProfile={{
            userName: statusData.userName,
            userMessage: getDateTimeStatusFormat(statusData.lastStatusTime),
            imageArrow:
              Platform.OS === 'android' ? imageAndroidBack : imageIOSBack,
            userImage: imgProfile,
            onImageClick: () => {
              navigation.goBack();
            },
          }}
          barStyle={{
            barWidth: imageList.length == 1 ? 50 : 100,
          }}
          containerStyle={{
            // backgroundColor: TINT_GRAY,
            width: '100%',
            height: '100%',
          }}
          imageList={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
            // width: '100%',
            // height: '100%',
          }}
          replyView={{
            messageList: messageList,
            isShowReply: true,
            onReplyButtonClick: () => {},
            onReplyTextChange: () => {},
          }}
          onChange={position => {
            if (!isUser) {
              setUserStatusViewed(statusData, position);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default StatusProgressView;

const styles = StyleSheet.create({});
