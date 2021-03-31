import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import * as api from './../../../Src/Api/APIController';
import { setLocalData, getLocalData } from './../../../Src/Utility/HelperFunction';
import constants from './../../../Src/Utility/Constant';
import {openDatabase} from 'react-native-sqlite-storage';
import {THEME} from './../../../Src/Utility/colors'
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);
var db = openDatabase({name :'statusApp.db'}); 

export default function SignInScreen({ navigation, route }) {

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS users (id VARCHAR(100),isClanUser INT(1),username VARCHAR(150),email VARCHAR(100),userImage VARCHAR(100),isActive INT(1),isBlock INT(1),isReported INT(1),unreadMsgCount INT(1),roomId VARCHAR(100),phoneNumber VARCHAR(15),countryCode VARCHAR(10),countryCallingCode VARCHAR(10),otpCode VARCHAR(100),createdAt VARCHAR(100),updatedAt VARCHAR(100))');
            });
    },[]);
    

    const [count, setCount] = useState(0)
    const [countryCode, setCountryCode] = useState(null);
    const [countryCallingCode, setCountryCallingCode] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    async function isSignIn() {
        const id = await getLocalData(constants.USER_ID);
        if (id) {
            navigation.replace('Main');
        }
    }

    if (count < 1) {
        setCount(1);
        isSignIn();
    }

    const onSelect = (country) => {
        setCountryCode(country.cca2);
        setCountryCallingCode(country.callingCode[0]);
    }

    function defaultCountry(countryCode, callingCode) {
        if (!countryCode && !callingCode) {
            setCountryCallingCode('1');
            setCountryCode('US');
            return 'US';
        }
    }

    function contuine(phoneNumber, countryCode, countryCallingCode) {
        api.signInUser({
            phoneNumber,
            countryCode,
            countryCallingCode
        }).then(res => {
            let id=res.data.data._id;
            let success=res.data.success;
            let msg=res.data.msg;
            let isClanUser=1;
            let isActive=1;
            let isBlock=0;
            let isReported=0;
            let unreadMsgCount=0;
            let roomId = res.data.data.roomId;
            let phoneNumber=res.data.data.phoneNumber;
            let countryCode = res.data.data.countryCode;
            let countryCallingCode=res.data.data.countryCallingCode;
            let createdAt = res.data.data.createdAt;
            let updatedAt =res.data.data.updatedAt;
            let otp = res.data.data.otpCode;
            
            if (success) {
                if (id) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO users (id, isClanUser,isActive,isBlock,isReported,unreadMsgCount,roomId,phoneNumber,countryCode,countryCallingCode,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                            [id, isClanUser, isActive,isBlock,isReported,unreadMsgCount,roomId,phoneNumber,countryCode,countryCallingCode,createdAt,updatedAt]                    
                        );
                    });
                    // fetch('http://vas.hexaroute.com/api.php?username=demo&password=demo@567&route=1&sender=HEXTEC&mobile[]='+phoneNumber+'&message[]='+otp, {
                    // method: 'GET',
                    // //Request Type
                    // });
                    setLocalData(constants.USER_ID, id);
                    const number = '+' + countryCallingCode + ' ' + phoneNumber;
                    navigation.navigate('OTPScreen', { id, number,phoneNumber });
                }
            } else {
                Alert.alert('Error', msg);
            }
        }).catch(err => {
            console.log(err);
        });


    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.container}>
                    <View style={styles.logoViewStyle}>
                        <Image
                            style={styles.logoStyle}
                            resizeMode="contain"
                            source={require('./../../../../assets/logo.png')}
                        />
                        <Text style={styles.instructionStyle}>
                            Please Confirm Your Country Code &
                            Enter Your Mobile Number
                        </Text>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={styles.countryCodeTextStyle}>
                                Country Code
                            </Text>
                            <CountryPicker
                                withFlagButton={true}
                                containerButtonStyle={styles.buttonContainerStyle}
                                withCallingCodeButton={true}
                                countryCode={countryCode ? countryCode : defaultCountry()}
                                withFlag={true}
                                withEmoji={true}
                                withCallingCode={true}
                                withCloseButton={true}
                                onSelect={onSelect}
                            />
                        </View>

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Mobile Number"
                            keyboardType='decimal-pad'
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            contuine(phoneNumber, countryCode, countryCallingCode);
                        }}
                    >
                        <Text style={styles.coutuineButtonStyle}>
                            CONTUINE
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    subContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonContainerStyle: {
        borderBottomColor: '#999',
        borderBottomWidth: 2,
        marginRight: 5,
        paddingBottom: 5,
    },
    textInputStyle: {
        flexGrow: 1,
        borderBottomColor: '#999',
        borderBottomWidth: 2,
        margin: 0,
        marginLeft: 5,
        textAlignVertical: 'bottom',
        fontSize: 16,
        color: '#444',
        padding: 0,
        paddingBottom: 5,
        paddingLeft: 5,
    },
    countryCodeTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        alignSelf: 'center',
        color: '#999'
    },
    logoViewStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 15,
    },
    logoStyle: {
        width: 150,
        height: 150,
        marginBottom: 25,
    },
    instructionStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#aaa',
    },
    coutuineButtonStyle: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: THEME,
        borderRadius: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
})
