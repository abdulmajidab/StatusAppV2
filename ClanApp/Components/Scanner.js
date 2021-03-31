
 import React, { useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   TouchableOpacity,
   Button,
   Image
 } from 'react-native';
 
 import {
   Header,
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 
 import QRCodeScanner from 'react-native-qrcode-scanner';
 import {Card, CardItem, Icon, Thumbnail, Body, Right, Row} from 'native-base';
import {
  APP_BG_COLOR,
  GREEN,
  INPUT_ORANGE,
  WHITE,
  GRAY,
  BLACK,
  THEME
} from './../Components/Src/Utility/colors';
import {DEFAULT_STYLES} from './../Components/Src/Utility/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const Scanner = () => {
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()

 const onSuccess = (e) => {
    setResult(e.data)
    setScan(false)
  }

 const startScan = () => {
    setScan(true)
    setResult()
  }
  const navigation=useNavigation();
  return (
      
    <View>
    <View style={{elevation: 0}}>
      <CardItem style={styles.parentView}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="arrow-left"
            type="MaterialCommunityIcons"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Body
            style={{
              flexDirection: 'column', 
              marginLeft: 7,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
                StatusApp
            </Text>
          </Body>
          
        </View>
      </CardItem>
    </View>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        {/* <Header/> */}
        <View style={styles.body}>
          {/* { result &&
            <View style={styles.sectionContainer}>
              <Text style={styles.centerText}>{result}</Text>
            </View>
          } */}
          <Image source={require('./../../ClanApp/assets/qr-scan.png')} style={styles.smileimg} 
            style={{width:80, height:80,marginLeft:153,marginTop:8}}  />
          { !scan &&
            <View style={styles.sectionContainer}>
              <Button
                title="Start Scan"
                color={THEME}
                onPress={startScan}
              />
            </View>
          }
          { scan &&
            <View style={styles.sectionContainer}>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                // ref={(node) => { this.scanner = node }}
                onRead={onSuccess}
                topContent={
                  <Text style={styles.centerText}>
                    Scan your QRCode!
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                    <Text style={styles.buttonText}>Cancel Scan</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    flexDirection: 'column',
    textAlign:'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  parentView: {
    backgroundColor: GREEN,
    elevation: 0,
    padding: -500,
    paddingLeft: 5,
    paddingRight: 0,
  },
  backIcon: {
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 10,
    alignSelf: 'center',
    color: WHITE,
  },
  profileIcon: {
    marginLeft: 0,
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  userMessage: {
    fontSize: 16,
    color: WHITE,
    marginTop: 3,
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  menuIcons: {
    fontSize: 24,
    color: WHITE,
    marginLeft: 8,
    alignSelf: 'center',
  },
});


export default Scanner;
