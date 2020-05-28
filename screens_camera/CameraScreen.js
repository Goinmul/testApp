import React, { Component } from 'react';
import { StyleSheet, Text, View, Image }
  from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

class CameraScreen extends Component {

  state = {
    image: null,
  }

  async _takeAndUploadPhotoAsync(url) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
      console.warn('image selecting error!');
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    // formData.append('image', { uri: localUri, name: filename, type });

    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name','김준서');
    formData.append('email','21500153@handong.edu');
    formData.append('id',1);

    return await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(()=>{console.warn('success', url)});
  }

  async _pickImageFromGallery(url) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
      console.warn('image selecting error!');
      return;
    }
    console.log(result);

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // Assume "photo" is the name of the form field the server expects
    // formData.append('image', { uri: localUri, name: filename, type });
    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name','권현우학부생');
    formData.append('email','21400045@handong.edu');
    formData.append('id',2);
    
    return await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(()=>{
      console.log('갤러리 전송 success', url);
      console.log(formData);
    });
  }

  render() {

    let {image} = this.state;
    return (
      <View style={styles.container}>

      <View style={[{width: "90%", margin: 20, backgroundColor: "white"}]}>
        <Button
          buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50 }}
          titleStyle={{ fontSize: 23 }}
          onPress={() => this._takeAndUploadPhotoAsync('http://saevom06.cafe24.com/activitydata/uploadStartImg')}
          title="사진 찍기"
          raised
          icon={
            <View style={{ marginRight: 10 }}>
              <Icon
                style={{ marginRight: 5 }}
                reverse
                size={20}
                name='camera'
                type='feather'
                color='white'
              />
            </View>
          }>
        </Button>
      </View>

      <View style={[{width: "90%", margin: 20, backgroundColor: "white"}]}>
        <Button
          buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50 }}
          titleStyle={{ fontSize: 23 }}
          onPress={() => this._pickImageFromGallery('http://saevom06.cafe24.com/requestdata/newProduct')}
          title="갤러리에서 전송하기"
          raised
          icon={
            <View style={{ marginRight: 10 }}>
              <Icon
                style={{ marginRight: 5 }}
                reverse
                size={20}
                name='folder'
                type='feather'
                color='white'
              />
            </View>
          }>
        </Button>
        <Button 
type="clear"
title='로그인 페이지로'
titleStyle={{color:'orange'}}
onPress={()=> this.props.navigation.navigate('LoginScreen')}
/>
      </View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      </View>

    );
  }
}
export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
