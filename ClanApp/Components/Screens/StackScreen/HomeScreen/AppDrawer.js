import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import GroupScreen from './../../DrawerScreen/GroupScreen/GroupScreen';
import HomeScreen from './../../StackScreen/HomeScreen/HomeScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer({ ...props }) {
    return (
        <Drawer.Navigator
            drawerPosition='right'
            initialRouteName="Home"
            drawerContent={props => (<CustomDrawer {...props} />)}
            drawerStyle={{
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen} />
        </Drawer.Navigator>
    );
};