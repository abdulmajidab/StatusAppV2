import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default function SelectItem({ item, iconSize }) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={item.image ? { uri: item.image } : require('./../../../../assets/new_group.png')} />
            <TouchableOpacity style={styles.icon}>
                <Icon
                    type="AntDesign"
                    name='closecircle'
                    style={{ fontSize: iconSize, color: 'gray' }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        padding: 10,
        marginRight: 5,
    },
    image: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    icon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: 100,
        backgroundColor: 'white'
    }
});