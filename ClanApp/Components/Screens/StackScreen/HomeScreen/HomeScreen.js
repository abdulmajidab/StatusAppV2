import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Dimensions, LogBox, PermissionsAndroid, Platform } from 'react-native'
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';

import CameraScreen from '../../TabScreens/Camera/CameraScreen'
import ChatScreen from '../../TabScreens/Chat/ChatScreen'
// import ScoopScreen from '../../TabScreens/Scoop/ScoopScreen'
import StatusView from '../../TabScreens/status/StatusView'
import CallScreen from '../../TabScreens/Call/CallScreen'
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import {THEME} from './../../../Src/Utility/colors'


function HomeScreen({navigation}) {

    const [count, setCount] = useState(0);

    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    }, [])


    function updateFunction() {
        // console.log('count '+count);
        if (count < 1) {
            setTimeout(async () => {
                let status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
                if (!status) {
                    getPermission();
                }
            }, 1000);
        }
    }

    async function getPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setCount(count + 1);
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }


    return (
        <Container>
            <AppBar iconSize={28} />
            <Tabs
                onChangeTab={() => {
                    // console.log('onChangeTab');
                    updateFunction();
                }}
                scrollWithoutAnimation={true}
                initialPage={1}
                tabBarUnderlineStyle={{ backgroundColor: '#fff' }} >
                <Tab heading={<TabHeading
                    style={styles.tabStyle}

                ><Icon name='camera' style={{color:'#fff'}}/>
                </TabHeading>}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                >
                    <CameraScreen />
                </Tab>
                <Tab heading="CHATS"
                    tabStyle={styles.tabStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.activeTextStyle}
                >
                    <ChatScreen navigation={navigation} />
                </Tab>
                <Tab
                    heading="SCOOP"
                    tabStyle={styles.tabStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.activeTextStyle}
                >
                    <StatusView navigation={navigation} />
                </Tab>
                <Tab
                    heading="CALLS"
                    tabStyle={styles.tabStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.activeTextStyle}
                >
                    <CallScreen />
                </Tab>
            </Tabs>
        </Container>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: THEME,
    },
    textStyle: { color: '#c4b5a4', fontWeight: 'bold', fontSize: 14, },
    activeTabStyle: { backgroundColor: THEME, },
    activeTextStyle: { color: '#fff', fontWeight: 'bold', fontSize: 14, }
});