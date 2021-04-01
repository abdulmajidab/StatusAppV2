import React from 'react';
import {View ,Text,Image,StyleSheet, ImageBackground,ScrollView,TouchableOpacity} from 'react-native';
import {Card, CardItem, Icon, Thumbnail, Body, Right, Row} from 'native-base';
import { THEME ,GREEN,WHITE} from './../../../../Src/Utility/colors';
import {DEFAULT_STYLES} from './../../../../Src/Utility/styles';
import {useNavigation} from '@react-navigation/native';
import {getLocalData} from './../../../../Src/Utility/HelperFunction'
import constants from './../../../../Src/Utility/Constant'
import {useState,useEffect} from 'react';

const profileview = () => {
    const navigation=useNavigation();
    const [username,setusername]=useState('');
    useEffect(() => {
        getuser();
      }, []);
      async function getuser() {
        let user = await getLocalData(constants.USERNAME);
        setusername(user);
      }

    return(
    <ScrollView>
        <View style={{}}>
         <Image source={require('../../../../../assets/logo.png')  } style={styles.profile} style={{}} />
         </View>
            
            <View style={{marginTop:10,flex:1}}>
                <Text style={{height:50,textAlign:'center',padding:0 ,fontSize:30}}>{username}</Text>
                <Text style={{marginLeft:8 ,color:"#008282",fontSize:15}} >About & Phone Number</Text>
                <View style={{backgroundColor:'#C8C8C8',height:115 ,borderRadius:15,margin:5}}> 
                    <Text style={{fontSize:17, marginTop:10,marginLeft:10}}>StatusApp</Text>
                    <Text style={{fontSize:13, marginTop:-1,marginLeft:10 , color:'gray'}}>March 31, 2021</Text>
                        <View style={{flexDirection: 'row', marginTop:7,}}>
                            <View style={{flex: 1, height: 1, backgroundColor: 'gray',marginLeft:12,marginRight:12,}} />
                        </View>
                            <Text style={{marginLeft:10,marginTop:8,fontSize:14}}>+91 0000000000</Text>
                            <Text style={{marginLeft:10,marginTop:-3,fontSize:14,color:'gray'}}>Mobile</Text>
                </View>
            </View>
            <View style={{}}>
            
                <TouchableOpacity style={styles.message}>
                    <Icon
                        name='chatbox-ellipses-outline'
                        style={{color:'#fff'}}
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:33,fontSize:12}}>Message</Text>
                <TouchableOpacity style={styles.call}>
                    <Icon
                        name='call-outline'
                        style={{color:'#fff'}}
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:133,fontSize:12}}>Call</Text>
                <TouchableOpacity style={styles.videocall}>
                    <Icon
                        name='videocam-outline'
                        style={{color:'#fff'}}
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:200,fontSize:12}}>VideoCall</Text>
                {/* <TouchableOpacity style={styles.report}>
                    <Icon
                        name='thumbs-down-outline'
                        style={{color:'#fff'}}
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:230,fontSize:12}}>Report</Text> */}
                <TouchableOpacity style={styles.block}>
                    <Icon
                        name='close-circle-outline'
                        style={{color:'#fff'}}
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:295,fontSize:12}}>Block</Text>



            </View>
    </ScrollView>
    )
};
export default profileview;

const styles = StyleSheet.create({

    profile:{
        flex:1,
        justifyContent: 'center',
        alignItems : 'center', 
        height:200,
        width:'auto',
        borderRadius:500
        
    },
    message:{
        width:60,
        height:60,
        backgroundColor:THEME,
        borderRadius:35,
        marginTop:25,
        marginLeft:30,
        alignItems:'center',
        justifyContent:'center',
    },
    call:{
        width:60,
        height:60,
        backgroundColor:THEME,
        borderRadius:35,
        marginTop:-77,
        marginLeft:115,
        alignItems:'center',
        justifyContent:'center',
    },
    videocall:{
        width:60,
        height:60,
        backgroundColor:THEME,
        borderRadius:35,
        marginTop:-77,
        marginLeft:200,
        alignItems:'center',
        justifyContent:'center',
    },
    report:{
        width:60,
        height:60,
        backgroundColor:'red',
        borderRadius:35,
        marginTop:-77,
        marginLeft:220,
        alignItems:'center',
        justifyContent:'center',
    },
    block:{
        width:60,
        height:60,
        backgroundColor:'red',
        borderRadius:35,
        marginTop:-77,
        marginLeft:280,
        alignItems:'center',
        justifyContent:'center',
    },
    
});