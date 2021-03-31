import React from 'react';
import {View ,Text,Image,StyleSheet, ImageBackground,ScrollView} from 'react-native';



const profileview = () => {
    

    return(
    <ScrollView>
     <ImageBackground style={styles.container}>
       <Image source={require('../../../../../assets/profile2.jpg')  } style={styles.profile}/>
    </ImageBackground>
    <View><Text>hiii</Text></View>
    </ScrollView>
    )
};
export default profileview;

const styles = StyleSheet.create({
    container:{
        flex: 0,
        justifyContent: 'center',
        alignItems : 'center',
        
        
        
    },
    profile:{
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100
        
    }

});