import React,{useEffect,useState} from 'react';
import {SafeAreaView,Text,StyleSheet,View,Image,Platform,
    PermissionsAndroid} from 'react-native'
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';

function CameraScreen() {
    const [filePath, setFilePath] = useState({});

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
          // console.log('Response = ', response);
  
          if (response.didCancel) {
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
          setFilePath(response);
        });
      }
    };
  
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {

        captureImage('photo');
        let timer1 = setTimeout(() => setShowLoading(null), 1000)
    
          // this will clear Timeout when component unmount like in willComponentUnmount
          return () => {
            clearTimeout(timer1)
          }
    }, [])
    return (
        <SafeAreaView>
            <View style={styles.container}>
              {/* <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + filePath.data,
                }}
                style={styles.imageStyle}
              /> */}
              <Image
                source={{uri: filePath.uri}}
                style={styles.imageStyle}
              />
              <Text style={styles.textStyle}>{filePath.uri}</Text>
            </View>
            
        </SafeAreaView>
    );
}

export default CameraScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    textStyle: {
      padding: 10,
      color: 'black',
      textAlign: 'center',
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 5,
      marginVertical: 10,
      width: 250,
    },
    imageStyle: {
      width: 200,
      height: 200,
      margin: 5,
    },
  });