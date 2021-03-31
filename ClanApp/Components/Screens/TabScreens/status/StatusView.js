import React, {useReducer, useEffect} from 'react';
import {Text, Image, StyleSheet, View, ScrollView} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  Icon,
  Right,
  Container,
  Fab,
  Button,
} from 'native-base';
import {DEFAULT_STYLES} from './../../../Src/Utility/styles';
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  LIGHT_GREEN,
  THEME,
  LIGHT_GRAY_0,
  LIGHT_GRAY,
  TEXT_SUBTITLE,
} from './../../../Src/Utility/colors';

import ADD_STATUS from './../../../../assets/add_status.png';
import MyStatusView from './MyStatusView';
import RecentStatusView from './RecentStatusView';
import ViewedStatusView from './ViewedStatusView';
import {statusReducer, statusState, STATUS_LIST} from './StatusReducer';
import { getSocket} from './../../../Src/Utility/helperFunctions';
import {getLocalData} from './../../../Src/Utility/HelperFunction';
import constants from './../../../Src/Utility/Constant';
import {getUserStatusTypes, getUserStatusFromAPI} from './StatusActions';
import {useFocusEffect} from '@react-navigation/native';
import {NAV_TYPES} from './../../../Src/Utility/navTypes';
import _Divider from './../../../../Components/_Divider';

const socket = getSocket();

const StatusView = ({navigation}) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);

  var {statusData, recentStatusList, viewedStatusList, refresh} = state;
// console.log('vise=>',viewedStatusList);
  useFocusEffect(
    React.useCallback(() => {
      getUserStatusFromAPI(dispatch);
    }, []),
  );

  useEffect(() => {
    listenSocket();
    // return () => {
    //   alert('STATUS DISCONNECTED');
    //   socket.removeListener(constants.USER_STATUS);
    // };
  }, []);

  function listenSocket() {
    // socket.removeListener(constants.CHAT_LIST);
    socket.on(constants.USER_STATUS, async statusModel => {
      const id = await getLocalData(constants.USER_ID);
      if (statusModel.userId != id) {
        // console.log('STATUS RECEIVED');
        getUserStatusFromAPI(dispatch);
      }
    });
  }

  return (
    <Container>
      <ScrollView nestedScrollEnabled style={{flex: 1, paddingBottom: 200}}>
        <View>
          <MyStatusView
            navigation={navigation}
            statusData={statusData}
            isUser 
            isBorder={false}
          />
          {recentStatusList.length > 0 && (
            <View>
              <_Divider style={{borderBottomWidth: 5}} />
              <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
                RECENT UPDATES
              </Text>
              <RecentStatusView
                navigation={navigation}
                statusData={recentStatusList}
              />
            </View>
          )}
          {viewedStatusList.length > 0 && (
            <View>
              <_Divider style={{borderBottomWidth: 5}} />
              <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
                VIEWED UPDATES
              </Text>
              <ViewedStatusView
                navigation={navigation}
                statusData={viewedStatusList}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'column',
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <Button
          rounded
          style={{
            backgroundColor: APP_BG_COLOR,
            width: 50,
            alignSelf: 'center',
            height: 50,
          }}>
          <Icon
            style={{color: TEXT_SUBTITLE, fontSize: 22}}
            name="pencil"
            type="MaterialCommunityIcons"
          />
        </Button>
        <Button
          rounded
          color={THEME}
          style={styles.btnView}
          onPress={() => {
            navigation.navigate('cameraview', {});
          }}>
            <Icon name='camera'/>
          {/* <Thumbnail circular source={ADD_STATUS} style={styles.thumbView} /> */}
        </Button>
      </View>

      {/* <Fab
        active={true}
        direction="up"
        style={{backgroundColor: '#5067FF', position: 'absolute'}}
        position="bottomRight">
        <Thumbnail source={ADD_STATUS} />
        <Button style={{backgroundColor: '#EEF5F6'}}>
          <Icon
            style={{color: TEXT_SUBTITLE, fontSize: 24}}
            name="pencil"
            type="MaterialCommunityIcons"
          />
        </Button>
      </Fab> */}
    </Container>
  );
};

export default StatusView;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 16,
    marginTop: 3,
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 14,
    color: THEME,
    marginLeft: 15,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  msgIcon: {
    fontSize: 26,
    color: THEME,
    alignSelf: 'flex-end',
  },
  btnView: {
    marginTop: 15,
    marginRight: -5,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: THEME,
  },
  thumbView: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    backgroundColor: THEME,
  },
});
