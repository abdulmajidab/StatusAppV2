import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Components/Screens/StackScreen/MainScreen/MainScreen';
import ChatRoomScreen from './Components/Screens/StackScreen/ChatRoomScreen/ChatRoomScreen';
import ContactScreen from './Components/Screens/StackScreen/ContactScreen/ContactScreen';
import ImageScreen from './Components/Screens/StackScreen/ImageScreen/imageview';
import SignInScreen from './Components/Screens/StackScreen/SignInScreen/SignInScreen';
import AudioCall from './Components/Screens/TabScreens/Call/AudioCall';
import OTPScreen from './Components/Screens/StackScreen/SignInScreen/OTPScreen';
import ProfileSetupScreen from './Components/Screens/StackScreen/SignInScreen/ProfileSetupScreen';
import CameraV from './Components/CameraView';
import StatusProgressView from './Components/StatusProgressView';
import Scanner from './Components/Scanner';
import ProfileScreen from './Components/Screens/StackScreen/ChatRoomScreen/ProfileScreen/profileview';



const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='SignInScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        <Stack.Screen name="imageview" component={ImageScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="audiocall" component={AudioCall} />        
        <Stack.Screen name="cameraview" component={CameraV} />                
        <Stack.Screen name="StatusView" component={StatusProgressView} /> 
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="profileview" component={ProfileScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
