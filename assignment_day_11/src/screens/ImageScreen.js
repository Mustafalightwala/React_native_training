import React, {useState} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import requestCameraPermission from '../Permissions/CameraPermission';
import requestStoragePermission from '../Permissions/StoragePermission';

let options = {
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const ImageScreen = () => {
  const [filePath, setFilePath] = useState({});

  const chooseImage = async () => {
    let isStoragePermitted = await requestStoragePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  const captureImage = async () => {
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  return (
    <Container>
      <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
      <Button text={'Pick an Image'} onTouch={chooseImage} />
      <Button text={'Capture an Image'} onTouch={captureImage} />
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
    resizeMode: 'contain',
  },
});

export default ImageScreen;
