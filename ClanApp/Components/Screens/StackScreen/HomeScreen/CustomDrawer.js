import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer'
import { Container, Content, H3, Header, Footer, Thumbnail, Icon, } from 'native-base';
import { getLocalData } from './../../../Src/Utility/HelperFunction';
import constants from './../../../Src/Utility/Constant';
import { useNavigation } from '@react-navigation/native';
import { navigateStack } from '../../../Src/Utility/helperFunctions';
import {THEME} from './../../../Src/Utility/colors';

export default function CustomDrawer({ ...props }) {
    const [username,setusername]=useState('');
    const navigation = useNavigation()
    useEffect(() => {
        getuser();
      }, []);
      async function getuser() {
        //   alert('st')
        let user = await getLocalData(constants.USERNAME);
        setusername(user);
      }
    return (
        <Container>
            <Header style={styles.headerStyle}>
                <H3 style={styles.menuText}>
                    Profile
                </H3>
            </Header>
            <Content style={{ backgroundColor: '#eee' }}>
                <View style={styles.profileView}>
                    <Thumbnail
                        style={styles.profileImage}
                        large
                        source={{ uri: 'https://randomuser.me/api/portraits/thumb/men/99.jpg' }}
                    />
                    <View style={styles.profileTextView}>
                        <Text
                            numberOfLines={1}
                            style={styles.name}
                        >
                            {username}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={styles.about}
                        >
                            php developer
                        </Text>
                    </View>
                </View>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList itemStyle={{ display: 'none' }} {...props} />
                    <View>
                        <TouchableOpacity><Text style={styles.menuItem}>New Group</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>New Broadcast</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() =>navigation.navigate('Scanner')}><Text style={styles.menuItem}>Clan Web</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>Starred Messages</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>Status Privacy</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>Clear Call Logs</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>Invite Friends</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.menuItem}>QR Code</Text></TouchableOpacity>
                    </View>
                </DrawerContentScrollView>
            </Content>
            <Footer style={styles.footerStyle}>
                <Icon
                    name='settings-sharp'
                    type="Ionicons"
                />
                <Text style={{ paddingLeft: 8, }}>
                    Settings
                </Text>
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: THEME,
        alignItems: 'center',
    },
    footerStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profileView: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderBottomWidth: .8,
        borderBottomColor: '#aaa'
    },
    profileTextView: {
        flexDirection: 'column',
        paddingLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    about: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#aaa'
    },
    menuItem: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 3,
        padding: 14,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#444'
    },
    profileImage: {
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: .8,
        shadowOffset: { width: 10, height: 100, }
    }
})