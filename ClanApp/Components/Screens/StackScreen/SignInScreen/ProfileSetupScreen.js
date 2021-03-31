import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Icon } from 'native-base';
import * as api from './../../../Src/Api/APIController';
import { getLocalData,setLocalData } from './../../../Src/Utility/HelperFunction';
import constants from './../../../Src/Utility/Constant';
import {openDatabase} from 'react-native-sqlite-storage';
import {THEME} from './../../../Src/Utility/colors'

// SQLite.DEBUG(true);
// SQLite.enablePromise(true);
var db = openDatabase({name :'statusApp.db'}); 

export default function ProfileSetupScreen({ navigation, route }) {

    const [username, setUsername] = useState(undefined);

    async function setupProfile() {
        const id = await getLocalData(constants.USER_ID);
        // console.log('id' + id);
        if (username) {
            api.updateUser({
                id,
                username
            }).then(res => {
                db.transaction(function (tx) {
                    tx.executeSql('UPDATE users set username=? where id=?',
                        [username, id]                       
                    );
                });
                const { success, msg, user } = res.data
                // console.log('update profile response data =>',res.data);
                if (success && user) {
                    setLocalData(constants.USERNAME, user.username)
                    navigation.replace('Main');
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            Alert.alert('Error', 'Enter Your Name');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {/* <Image style={styles.logoStyle} source={require('./../../../../assets/CLAN_APP_LOGO.png')} /> */}
                <TouchableOpacity style={{ width: 90, height: 90, margin: 5, marginTop: 30, }}>
                    <Image
                        style={{ width: '100%', height: '100%', }}
                        source={require('./../../../../assets/user.png')}
                    />
                    <Icon
                        style={styles.iconStyle}
                        type="Entypo"
                        name='plus'
                    />
                </TouchableOpacity>
                <Text style={styles.profileInstructionStyle}>
                    {/* Please Set Your Name {'&\n'} */}
                    Add Profile Picture
                </Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Type your name"
                    onChangeText={(text) => setUsername(text)}
                />
                <TouchableOpacity
                    style={styles.setupProfileViewStyle}
                    onPress={() => {
                        setupProfile();
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        SETUP PROFILE
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    subContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 15,
        paddingTop: 30,
    },
    logoStyle: {
        width: 130,
        height: 130,
        resizeMode: 'contain'
    },
    iconStyle: {
        position: 'absolute',
        backgroundColor: THEME,
        borderRadius: 100,
        color: 'white',
        bottom: 0,
        right: 0,
    },
    profileInstructionStyle: {
        marginTop: 20,
        color: '#bbb',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textInputStyle: {
        width: '100%',
        marginTop: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 2,
        padding: 5,
        textAlignVertical: 'bottom',
        fontSize: 18,
    },
    setupProfileViewStyle: {
        width: '100%',
        padding: 15,
        fontSize: 16,
        backgroundColor: THEME,
        borderRadius: 10,
        marginTop: 20,
    }
})
