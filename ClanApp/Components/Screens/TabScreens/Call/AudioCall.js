import React,{useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Icon } from 'native-base'; 
import {
  APP_BG_COLOR,
  GREEN,
  INPUT_ORANGE,
  WHITE,
  GRAY,
  BLACK,
  RED,
} from './../../../Src/Utility/colors';


// const { width } = Dimensions.get('window');

export default AudioCall = ({ route, navigation }) => {
  // console.log("username",route.params.username);
    const [userSelected,setuserSelected]=useState([]);
    const [username,setusername]=useState(route.params.username);
    const [modalVisible,setmodalVisible]=useState(false);
    clickEventListener = () =>{
      Alert.alert('Message', 'button clicked');
    }
    return(
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subText}>STATUS APP</Text>
          </View>
          <Text style={styles.title}>{username}</Text>
          <Text style={styles.subText}>CALLING</Text>
        </View>
        <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={()=>clickEventListener()}>
          <Icon 
          style={styles.iconimg,{color:WHITE}}
          name='call'
          />
         
        </TouchableOpacity>
        <Image style={[styles.image]} source={{ uri:"https://bootdey.com/img/Content/avatar/avatar6.png" }}/>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> clickEventListener()}>
            <Icon 
            style={styles.iconimg}
            name='volume-mute-outline'
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> clickEventListener()}>
             <Icon 
            style={styles.iconimg}
            name='chatbox-ellipses-outline'
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=>clickEventListener()}>
            <Icon 
            style={styles.iconimg}
            name='mic-outline'
            />
          </TouchableOpacity>
        </View>
      </View>
    );

}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: GREEN,
    height: 140,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20,
  },
  image: {
    width : Dimensions.get('window').width,
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e20e30',
    marginTop: 250 
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: GREEN,
    flex: 1,
  },
  title: {
    color: '#f0efef',
    fontSize: 30,
  },
  subText: {
    color: '#c8c8c8',
    fontSize: 14,
    alignItems:'center',
    justifyContent:'center',
  },
  iconImg:{
    height: 32,
    width: 32, 
    alignSelf:'center',
  },
  btnStopCall: {
    height:65,
    width:65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:32,
    backgroundColor: RED,
    position:'absolute',
    bottom:100,
    left:'40%',
    zIndex:1,
  },
  btnAction: {
    height:45,
    width:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:22,
    backgroundColor: WHITE,
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});