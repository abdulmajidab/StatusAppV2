
import React from 'react';
import  { useState } from 'react';
import {
  SafeAreaView,StyleSheet,View,TouchableOpacity,Text,TextComponent,TextInput,Image,multiline, KeyboardAvoidingView, ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';







const imageview= ({navigation, route}) => {


    // const cropimage = () => {
    //   ImagePicker.openPicker({
    //     width: 300,
    //     height: 400,
    //     cropping: true
    //   }).then(image => {
    //     console.log(image);
    //   });

    // };


    const [text, setText] = useState('');
    const  imagepath= route.params.filname;
    console.log(imagepath);

  
    
    
  return (
    
      <ImageBackground source={{uri:imagepath}} style={styles.container} >
        <View style={styles.innerview}>
          <TouchableOpacity style={styles.touchcrop} onPress={() => alert('crop click')} >
        <Image source={require('./../../../../assets/crop.png')} style={styles.cropimg}   />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchsmile} onPress={() => alert('smile click')} >
        <Image source={require('./../../../../assets/smile.png')} style={styles.smileimg}   />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchtext} onPress={() => alert('text click')} >
        <Image source={require('./../../../../assets/Text.png')} style={styles.textimg}   />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchpen} onPress={() => alert('edit click')} >
        <Image source={require('./../../../../assets/pen.png')} style={styles.penimg}   />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toucharrow} onPress={() => navigation.goBack()} >
        <Image source={require('./../../../../assets/arrow.png')} style={styles.arrowimg}   />
        </TouchableOpacity>
        </View>
        

        <View style={styles.viewinput}>
        <TextInput multiline placeholder="Add a Caption "  placeholderTextColor="white" 
             numberOfLines={4} style={styles.input}
                onChangeText={text => setText(text)}
               defaultValue={text}>
        </TextInput>

        <View>
        <TouchableOpacity style={styles.sendbutton} activeOpacity={0.6} >
        <Image source={require('./../../../../assets/send-button.png')} style={styles.sendicon}   />
        </TouchableOpacity>
        </View>

        </View>
       
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
    
  
   
 },
  innerview:{
    width:'100%',
    marginBottom:'auto',
    backgroundColor:'transparent',
  },
   viewinput:{
    width:360,
     height:55,
     marginTop:'auto',
   },
 input:{
    backgroundColor:"#000000a0",
    padding:18,
    fontSize: 15,
     color: 'white',
   },
   cropimg:{
     width:25,
     height:25,
     marginTop:0,
     marginLeft:8,
 },
 touchcrop:{
  width:25,
  height:25,
  marginTop:9,
  marginLeft:160,

},

smileimg:{
  width:25,
  height:25,
  marginTop:4,
  marginLeft:6,
},
touchsmile:{
  width:25,
  height:25,
  marginTop:-30,
  marginLeft:210,
},

textimg:{
  width:22,
  height:22,
  marginTop:8,
  marginLeft:10,
},

touchtext:{
  width:20,
  height:20,
  marginTop:-27,
  marginLeft:253,
  
},
  penimg:{
    width:24,
    height:24,
    marginTop:10,
    marginLeft:12,

},
touchpen:{
  width:24,
  height:24,
  marginTop:-22,
  marginLeft:295,

},
arrowimg:{
    width:25,
    height:25,
    marginTop:1,
    marginLeft:10
},
toucharrow:{
  width:25,
  height:25,
  marginTop:-12,
  marginLeft:10
},
sendtext:{
  width:100,
  height:100,
},
sendbutton:{
    width:50,
    height:50,
    backgroundColor:'gray',
    borderRadius:30,
    marginLeft:300,
    marginTop:-78,
},
sendicon:{
    width:26,
    height:26,
    marginLeft:15,
    marginTop:11,
}

 
 });

export default imageview;