import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  WHITE,
  GREEN,
  GRAY,
  TEXT_TITLE,
  LIGHT_GRAY,
  TEXT_DESCRIPTION,
  MENU_GRAY,
  LIGHT_GREEN,
} from './../../../Src/Utility/colors';
import {Input, Textarea, Content, Icon, Item, Button} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';




const ChatTextInput = ({params, onSendMessage, isStatus, onResetClick}) => {
  const [message, setMessage] = useState('');
  const [keyboardPadding, setKeyboardPadding] = useState(5);
  const [multipleFile, setMultipleFile] = useState([]);
  const [filePath, setFilePath] = useState({});
  const [audiofile,setaudiofile] = useState([]);

  const navigation = useNavigation();



  useEffect(() => {
    let listener1 = Keyboard.addListener('keyboardWillShow', onShowKeyboard);
    let listener2 = Keyboard.addListener('keyboardWillHide', onHideKeyboard);

  
  

    return () => {
      listener1.remove();
      listener2.remove();
    };
  }, []);

  function onShowKeyboard(e) {
    // alert('Keyboard Shown');
    console.log(e);
    setKeyboardPadding(
      (e.endCoordinates.height - e.startCoordinates.height) / 2,
    );
  }

  function onHideKeyboard(e) {
    // alert('Keyboard Hidden');
    setKeyboardPadding(0);
  }
  const [modalVisible, setModalVisible] = useState(false);
  
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          //alert('User cancelled camera picker');
          setModalVisible(false);
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 3000,
      maxHeight: 5500,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
     // console.log('Response = ', response);

      if (response.didCancel) {
        //alert('User cancelled camera picker');
        setModalVisible(false);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
      setModalVisible(false);
      navigation.navigate('imageview', {
          filname: response.uri
        });
    });
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
        const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well find above
      
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        
      }
      
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
      setModalVisible(false);


    //  catch (err) {
    //   //Handling any exception (If any)
    //   // if (DocumentPicker.isCancel(err)) {
    //   //   //If user canceled the document selection
    //   //   alert('Canceled from multiple doc picker');
    //   // } else 
    //   {
    //     //For Unknown Error
    //     alert('Unknown Error: ' + JSON.stringify(err));
    //     throw err;
    //   }
    // }
  };
  
  const selectaudiofile = async () => {
    //Opening Document Picker for selection of multiple file
        const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);

      }
      //Setting the state to show multiple file attributes
      setaudiofile(results);
      setModalVisible(false);
  };

  const selectcontact = () => {

    alert("test")

  };
  



  const getChatRoomInput = () => {

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.mcontainer}>
                    <View style={styles.modelbody}>
                      <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.buttonStyle}
                      onPress={selectMultipleFile}>
                      <View style={[styles.iconRounded,{backgroundColor:'#597ab3'}]}>
                        <Icon style={{color:'#fff'}}  name="document-outline"/>
                      </View>
                      <Text style={[styles.textStyle,{color:'gray'}]}>Document</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modelbody}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => captureImage('photo')}>
                        <View style={[styles.iconRounded,{backgroundColor:'#d91c1c'}]}>
                          <Icon style={{color:'#fff'}} name="camera"/>
                        </View>
                        <Text style={[styles.textStyle,{color:'gray'}]}>Camera</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modelbody}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('photo')}>
                        <View style={[styles.iconRounded,{backgroundColor:'#cc5a99'}]}>
                          <Icon style={{color:'#fff'}} name="images-outline"/>
                        </View>
                        <Text style={[styles.textStyle,{color:'gray'}]}>Gallery</Text>
                      </TouchableOpacity>
                    </View>
                  </View> 
                  <View style={{flexDirection:'row',marginBottom:20 }} >
                    <View style={styles.modelbody}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={selectaudiofile}>
                      <View style={[styles.iconRounded,{backgroundColor:'#f29305'}]}>
                        <Icon style={{color:'#fff'}} name="musical-notes-outline"/>
                      </View>
                      <Text style={[styles.textStyle,{color:'gray'}]}>Audio</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modelbody}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={selectcontact}>
                      <View style={[styles.iconRounded,{backgroundColor:'#0080ff'}]}>
                        <Icon style={{color:'#fff'}} name="person-outline"/>
                      </View>
                      <Text style={[styles.textStyle,{color:'gray'}]}>Contact</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modelbody}>
                      <View style={[styles.iconRounded,{backgroundColor:'#00802b'}]}>
                        <Icon style={{color:'#fff'}} name="location-outline"/>
                      </View>
                      <Text style={[styles.textStyle,{color:'gray'}]}>Location</Text>
                    </View>
                  </View>                    
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}> X </Text>
                </Pressable>
              </View>
            </Modal>
            
        </View>
        <Item rounded style={{backgroundColor: WHITE, flex: 1}}>
         <TouchableOpacity onPress={ () =>alert('hiii')}> 
          <Icon
            name="smiley"
            type="Octicons"
            style={[styles.menuIcons, {marginLeft: 5}]}
          />
          </TouchableOpacity>
          <Input
            multiline
            style={styles.userMessage}
            placeholder="Type a message ..."
            placeholderTextColor={LIGHT_GRAY}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
          />
          <Icon name="attachment" type="Entypo" style={styles.menuIcons} onPress={() => setModalVisible(true)} />
          <TouchableOpacity onPress={() => alert('hii')} >
          <Icon
            name="camera"
            type="MaterialCommunityIcons"
            style={[styles.menuIcons, {marginRight: 5}]}
          />
          </TouchableOpacity>
        </Item>
        <Button
          icon
          rounded
          large
          style={styles.sendIconView}
          onPress={() => {
            onSendMessage(message);
            setMessage('');
          }}>
          <Icon
            name={message === '' ? 'microphone' : 'send'}
            type="MaterialCommunityIcons"
            style={styles.sendIcon}
          />
        </Button>
      </View>
    );
  };

  const getStatusInput = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: '2%',
          justifyContent: 'center', 
        }}>
        <Button 
          rounded 
          style={styles.sendStatusIconView}
          onPress={() => {
            onResetClick();
            setMessage('');
          }}>
          <Icon
            name="camera"
            type="MaterialCommunityIcons"
            style={[styles.sendIcon]}
          />
        </Button>
        <Input
          multiline
          style={styles.userStatusMessage}
          placeholder="Type a message ..."
          placeholderTextColor={LIGHT_GRAY}
          value={message}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <Button
          icon
          rounded
          large
          style={styles.sendStatusIconView}
          onPress={() => {
            onSendMessage(message);
            setMessage('');
          }}>
          <Icon
            name={'send'}
            type="MaterialCommunityIcons"
            style={styles.sendIcon}
          />
        </Button>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{paddingBottom: keyboardPadding}}>
      <View style={styles.parentView}>
        {isStatus ? getStatusInput() : getChatRoomInput()}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  parentView: {
    alignSelf: 'baseline',
    width: '100%',
    maxHeight: 120,
    position: 'relative',
    bottom: 0,
    elevation: 0,
    padding: 5,
    marginTop: 5,
  },
  sendIcon: {
    alignSelf: 'center',
    color: WHITE,
    justifyContent: 'center',
    fontSize: 24,
    width: 25,
    height: 25,
  },
  sendIconView: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    backgroundColor: GREEN,
  },
  sendStatusIconView: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: '2%',
    backgroundColor: GREEN,
    marginTop: -8,
  },
  userName: {
    fontSize: 16,
    color: WHITE,
    fontWeight: 'bold',
  },
  userMessage: {
    fontSize: 16,
    color: TEXT_TITLE,
    backgroundColor: WHITE,
    alignSelf: 'flex-start',
    marginLeft: -5,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
    textAlignVertical: 'center',
  },
  userStatusMessage: {
    fontSize: 16,
    color: TEXT_TITLE,
    backgroundColor: WHITE,
    alignSelf: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
    textAlignVertical: 'center',
    borderRadius: 10,
    paddingLeft: 15,
    minHeight: Platform.OS === 'ios' ? 45 : 45,
    marginLeft: '2%',
    marginRight: '3%',
    paddingTop: Platform.OS === 'ios' ? 12 : 10,
  },
  menuIcons: {
    fontSize: 22,
    color: MENU_GRAY,
    alignSelf: 'center',
    justifyContent:'center'
  },
  menuStatusIcons: {
    fontSize: 25,
    color: WHITE,
    alignSelf: 'center',
    justifyContent:'center',
    marginRight: 5, 
    alignItems:'center'
  },
   centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 20
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:400,
        marginTop:378
      },
      button: {
        borderRadius: 100,
        padding: 10,
        marginTop:-15,
        elevation: 2,
        justifyContent:'flex-end',
        alignItems:'flex-end'
      },
      
      buttonClose: {
        backgroundColor: "#d91c1c",
        
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"

      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      mcontainer:{
        // flex:1,
        flexDirection:'row',
        // marginBottom:40        
      },
      modelbody:{
        // justifyContent:'center',
        width: 100,
        height: 100,
        alignSelf: 'center',
        right:0,
        alignItems:'center',
        // top:30,
      },
      iconRounded:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        margin: 5,
        width: 50,
        // backgroundColor: "#008282",
        height: 50,
        alignSelf: "center",
        // bottom:7
      },
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
      },
});
