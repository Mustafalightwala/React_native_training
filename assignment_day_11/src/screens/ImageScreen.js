import React, {useState} from 'react';
import {View, PermissionsAndroid, Platform, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from '../constants/styles';
import Button from '../components/Button';

let options = {
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
  } else {
    return true;
  }
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
  } else {
    return true;
  }
};

const ImageScreen = () => {
  const [filePath, setFilePath] = useState({});

  const captureImage = async () => {
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  const chooseImage = async () => {
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, (response) => {
        console.log(response);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
      <Button text={'Pick an Image'} onTouch={chooseImage} />
      <Button text={'Capture an Image'} onTouch={captureImage} />
    </View>
  );
};

export default ImageScreen;
