import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Header, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function ContactAppBar({ iconSize, title, subtitle }) {
    const navigation = useNavigation();
    return (
        <Header style={styles.container}>
            <View style={styles.titleViewStyle}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon
                        type="Feather"
                        name="arrow-left"
                        style={{ color: 'white', fontSize: iconSize }}
                    />
                </TouchableOpacity>
                <View style={{ paddingLeft: 10, flexDirection: 'column' }}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <Text style={styles.subtitleStyle}>{subtitle}</Text>
                </View>
            </View>
            <View style={styles.iconViewStyle}>
                <View style={{ marginLeft: 8, }}>
                    <TouchableOpacity>
                        <Icon
                            type="Fontisto"
                            name="search"
                            style={{ color: 'white', fontSize: iconSize - 5 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Header>
    );
};


const styles = StyleSheet.create({
    container: { backgroundColor: '#008282', flexDirection: 'row', alignItems: 'center', },
    titleStyle: { fontSize: 18, color: 'white', fontWeight: 'bold', },
    subtitleStyle: { fontSize: 10, color: 'white', fontWeight: 'bold', },
    titleViewStyle: { flexDirection: 'row', position: 'absolute', left: 10, alignItems: 'center' },
    iconViewStyle: { flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 10, }
});

