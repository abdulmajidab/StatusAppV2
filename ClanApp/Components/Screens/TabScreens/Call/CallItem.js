import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import {THEME} from './../../../Src/Utility/colors';

export default function CallItem({ item }) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageView}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <Text style={styles.callingTime}>
                <Icon 
                    name="call-made" 
                    type="MaterialIcons"
                />
                </Text>
            </View>
            <Icon 
                style={styles.iconStyle} 
                type="MaterialIcons"
                name="call" 
            />
        </TouchableOpacity>
    );
};
// styleSheets
const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    imageView: {
        width: 66,
        height: 66,
        borderRadius: 33,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor:THEME,
        overflow: 'hidden',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
    },
    textView: {
        paddingLeft: 10,
    },
    iconStyle: {
        position: 'absolute',
        right: 18,
        // transform: [{ rotateY: '360deg' }],
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    callingTime: {
        fontSize: 10,
        color: '#aaa',
    }
});
