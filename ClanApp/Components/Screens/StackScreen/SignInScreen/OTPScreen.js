import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput';
import * as api from './../../../Src/Api/APIController';
import {THEME} from './../../../Src/Utility/colors'

export default function OTPScreen({ navigation, route }) {
    // console.log(route.params)
    const otpTextInput = useRef();
    const [OTP, setOTP] = useState(null);

    function contuine(otpCode) {
        if (otpCode) {
            api.verifyUser({
                id: route.params.id,
                otpCode
            }).then(res => {
                const { success, msg } = res.data;
                if (success) {
                    navigation.replace('ProfileSetupScreen');
                } else {
                    Alert.alert('OTP Error', msg)
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            Alert.alert("Error", "Enter Correct OTP!");
        }
    }

    function resend(phoneNumber) {
        // console.log(phoneNumber)
        if (phoneNumber) {
            api.ressendNumber({
                id: route.params.id,
                phoneNumber
            }).then(res => {
                const { success, msg } = res.data;
                if (success) {
                    // navigation.replace('ProfileSetupScreen');
                    console.log(msg)
                } else {
                    Alert.alert('OTP Error', msg)
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            Alert.alert("Error", "Enter Correct OTP!");
        }
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image style={styles.logoStyle} source={require('./../../../../assets/CLAN_APP_LOGO.png')} />
                <View style={styles.verifyView}>
                    <Text style={{ color: '#bbb', fontWeight: 'bold', fontSize: 16, }}>Verify </Text>
                    <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 16, }}>{route.params.number}</Text>
                </View>
                <Text style={styles.OTPtextStyle}>Enter the OTP code to verify your phone number.</Text>
            </View>
            <OTPTextInput
                ref={otpTextInput}
                inputCount={6}
                tintColor="transparent"
                offTintColor="transparent"
                inputCellLength={1}
                textInputStyle={{
                    height: 70,
                    backgroundColor: '#ddd',
                    borderRadius: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#666',
                    textAlignVertical: 'center',
                }}
                containerStyle={{
                    marginTop: 10,
                }}
                handleTextChange={(text) => {
                    setOTP(text);
                }}
            />

            <TouchableOpacity onPress={() => {
                contuine(OTP);
            }}>

                <Text style={styles.coutuineButtonStyle}>
                    CONTUINE
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }} onPress={() => resend(route.params.phoneNumber) }>
                <Text style={styles.resendOTPStyle} >
                    Resend OTP
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    subContainer: {
        alignItems: 'center',
    },
    verifyView: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingTop: 20, },
    logoStyle: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    OTPtextStyle: { color: '#444', fontSize: 12, fontWeight: 'bold' },
    coutuineButtonStyle: {
        padding: 15,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: THEME,
        borderRadius: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    resendOTPStyle: {
        backgroundColor: THEME,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    }
})
