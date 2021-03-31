import {
  STATUS_LIST,
  RECENT_STATUS_LIST,
  VIEWED_STATUS_LIST,
  LOADING,
  IMAGE_LIST,
  MESSAGE_LIST,
} from './StatusReducer';
import {getStatusModel} from './../../../Src/Utility/helperModels';
import {
  createUserStatus,
  setUserStatusViewedForID,
  getAllUserStatus,
} from './../../../Src/Api/APIController';
import {
  showToast,
  getUniqueId,
  getSocket,
} from './../../../Src/Utility/helperFunctions';
import {getLocalData} from './../../../Src/Utility/HelperFunction';
// import storage from '@react-native-firebase/storage';
import constants from './../../../Src/Utility/Constant';
import AWS from 'aws-sdk';
import fs from 'react-native-fs';
import Base64Binary from 'base64-arraybuffer';

export function getStatus(statusData, dispatch) {
  const mImageArray = [];
  const mMsgArray = [];
  statusData.status.forEach(element => {
    mImageArray.push(element.image);
    mMsgArray.push(element.message);
  });
  dispatch({type: IMAGE_LIST, payload: mImageArray});
  dispatch({type: MESSAGE_LIST, payload: mMsgArray});
}

export async function getUserStatusFromAPI(dispatch) {
  const id = await getLocalData(constants.USER_ID);
  // console.log('id =>',id);
  const res = await getAllUserStatus();
  if (res.status === 200) {
    console.log(res.data);
    if (res.data.status) {
      getUserStatusTypes({
        userId: id,
        dispatch: dispatch,
        statusList: res.data.status,
      });
    }
  }
}

export function getUserStatusTypes({userId, dispatch, statusList}) {
  const recentStatus = [];
  const viewedStatus = [];

  statusList.forEach(item => {
    if (item.userId === userId) {
      dispatch({type: STATUS_LIST, payload: item});
    } else {
      var count = 0;

      item.status.forEach(element => {
        for (let i = 0; i < element.seenUsers.length; i++) {
          const statusUserId = element.seenUsers[i];
          if (statusUserId === userId) {
            count++;
          }
        }
      });

      if (count < item.status.length) {
        recentStatus.push(item);
      } else {
        viewedStatus.push(item);
      }
    }
  });

  dispatch({type: RECENT_STATUS_LIST, payload: recentStatus});
  dispatch({type: VIEWED_STATUS_LIST, payload: viewedStatus});
}

export async function uploadStatus(
  imageClicked,
  message,
  navigation,
  dispatch,
) {
  const imageName = getUniqueId();
  const imagePath = 'images/' + imageName + '.jpg';
  const s3bucket = new AWS.S3({
    accessKeyId: 'AKIAIMWLWM33XM6DGDPQ',
    secretAccessKey: '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',
    Bucket: 'statusapptest',
    signatureVersion: 'v4',
  });
  let contentType = 'image/jpeg';
   let contentDeposition = 'inline;filename="' + imagePath + '"';
   const base64 = await fs.readFile(imageClicked, 'base64');
   const arrayBuffer = Base64Binary.decode(base64);
  s3bucket.createBucket( () => {
    const params = {
      Bucket: 'statusapptest',
      Key: imagePath,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
  };
  s3bucket.upload(params,async(err, data) => {
      if (err) {
        console.log('error in callback');
      }
    const mDownloadUrl= data.Location;
    await onSendStatus(message, navigation, mDownloadUrl, dispatch);
    });
  });
}

export async function onSendStatus(
  message,
  navigation,
  mDownloadUrl,
  dispatch,
) {
  try {
    const statusModel = await getStatusModel(mDownloadUrl, message);
    const res = await createUserStatus(statusModel);
    // console.log('Status Response : ', res);
    if (res.status === 200) {
      console.log('Status Success : ', res.data);
      showToast({text: res.data.message, type: 'success'});
      dispatch({type: LOADING, payload: false});
      getSocket().emit(constants.USER_STATUS, statusModel);
      setTimeout(function() {
        navigation && navigation.goBack();
      }, 800);
    } else {
      showToast({type: 'danger', text: 'Status update failed'});
    }
  } catch (error) {
    console.log('Status Error : ', error);
  }
}

export async function setUserStatusViewed(statusItem, position) {
  const payload = {
    userId: statusItem.userId,
    loginId: await getLocalData(constants.USER_ID),
    statusId: statusItem.status[position]._id,
  };
  const res = await setUserStatusViewedForID(payload);
  console.log('Status Viewed : ', res.data);
}
