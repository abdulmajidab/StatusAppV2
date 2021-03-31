import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'native-base';
import CallItem from './CallItem';
import {THEME} from './../../../Src/Utility/colors';

function CallScreen() {

    const [callData, setCallData] = useState([
        {
            id: '1',
            name: 'John',
            image: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
            callingTime: "Just Now",
        },
        {
            id: '2',
            name: 'Zatch',
            image: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
            callingTime: "Just Now",
        },
        {
            id: '3',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '4',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '5',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '6',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '7',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '8',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
        {
            id: '9',
            name: 'Kiyo',
            image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            callingTime: "Just Now",
        },
    ]);

    return (
        <View>
            <FlatList
                data={callData}
                renderItem={({ item }) => (<CallItem item={item} />)}
            />
            <View>
                <TouchableOpacity style={styles.iconView}>
                    <Icon
                    name='call'
                    style={{color:'#fff'}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CallScreen;

const styles = StyleSheet.create({
    iconStyle: {
        transform: [{ rotateY: '180deg' }],
    },
    iconView: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        borderRadius:50,
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:THEME,
    }
});