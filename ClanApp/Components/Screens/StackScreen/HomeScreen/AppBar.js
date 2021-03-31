import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Header, Right, Button } from 'native-base';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {getLocalData} from './../../../Src/Utility/HelperFunction';
import {THEME} from './../../../Src/Utility/colors';


export default function AppBar({ iconSize }) {
    const navigation = useNavigation();
    return (
        <Header
            androidStatusBarColor="black"
            style={styles.container}
        >
            <Text style={styles.titleText}>StatusApp</Text>
            <Right>
                <Button transparent>
                    <TouchableOpacity >
                        <Icon
                            type="Fontisto"
                            name="search"
                            size={iconSize}
                            style={{ fontSize: iconSize, color: '#fff' }}
                        />
                    </TouchableOpacity>
                </Button>
                <Button transparent>
                    <TouchableOpacity>
                        <Icon
                            type="Ionicons"
                            name="ellipsis-vertical"
                            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                            style={{ fontSize: iconSize, color: '#fff', }}
                        />
                    </TouchableOpacity>
                </Button>
            </Right>
        </Header>
    );
};
const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width,
        backgroundColor: THEME,
        flexDirection: 'row',
    },
    image: {
        width: 38,
        height: 40,
        alignSelf: 'center',
    },
    iconStyle: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        position: 'absolute',
        right: 8,
        alignSelf: 'center',
    },
    titleText:{
        color:'#fff',
        fontSize:25
    }
});