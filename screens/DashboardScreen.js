import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import axios from 'axios'; // will not be used

// button, dialog
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Dialog from "react-native-dialog";

// date picker
import DateTimePickerModal from "react-native-modal-datetime-picker";

// popup dialog
// import Dialog, { DialogContent } from 'react-native-popup-dialog';

class DashboardScreen extends Component {

  constructor(props) {
    super(props);

    this.interestCategory = [];
    this.userMemo='';

    this.buttonList = []; // with the categories given from server, buttons are created.


    var url = 'http://saevom06.cafe24.com/interest/getAll';

    // get the interest categories from server, as soon as this component is created.
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          
          // receive the interest categories(관심사 목록) from server
          for (var i = 0; i < responseInJson.length; i++) {
            this.interestCategory.push(responseInJson[i]);
          }
          this.buttonList = this.interestCategory.map(
          buttonInfo =>(<Button key={buttonInfo.id}>{buttonInfo.name}</Button>)          
          );
        })
    } catch (e) {
      console.warn(e);
    }
  }
  
  state = {
    dialogVisible: false, // dialog
    isDatePickerVisible: false, // date picker
    finalConfirmDialog: false,
    serverUrl: '',
    type: 0,
    clickedCategory: 0, // the category that user clicked

    // data to send to the web server
    userSelectedDateTime: null,
  }

  _renderButtons() {
    return this.buttonList;
  }

  _showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
 
  _hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  _handleConfirm = (date) => {
    this.setState({ userSelectedDateTime: date});
    this._hideDatePicker();
  };

  async _fetchGet(url) {

    // var url = 'http://saevom06.cafe24.com/test/get';
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(console.warn('fetch successful'))
    } catch (e) {
      console.warn(e);
    }

  }

  _fetchPost(url, data) {
    // var url = 'http://saevom06.cafe24.com/test/post';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',

        body: JSON.stringify(data),
      }).then((res) => { });
      console.log(url);
      //console.warn('fetch successful', url);
      console.log(data);
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  _httpGet() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success');
      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'http://saevom06.cafe24.com/test/get');
    request.send();
  }

  _axiosGet() {
    try {
      axios({
        method: 'get',
        url: 'http://saevom06.cafe24.com/test/get',
        // responseType: 'stream'
      }).then(console.warn('axios get success!'));
    } catch (e) {
      console.warn(e);
    }
  }

  _axiosPost() {
    try {
      axios({
        method: 'post',
        url: 'http://saevom06.cafe24.com/test/get',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });
    } catch (e) {
      console.warn(e);
    }
  }


  async _getInterestCategoryFromServer() {
    console.log('GETTING INTEREST CATEGORY Start');
    console.log(this.interestCategory);
    console.log('GETTING INTEREST CATEGORY Finish');
  }

  /*
        // inside render() function, there was a logout button
  
        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}></View>
        <Button
          title="로그아웃"
          onPress={() => firebase.auth().signOut()}
        >
        </Button>
  
  */
  render() {

    return (
      <ScrollView >
      <View>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="datetime"
          onConfirm={this._handleConfirm}
          onCancel={this._hideDatePicker}
        />
      </View>

        <View style={{ margin: 10 }} />

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: 'rgb(1, 192, 99)' }}>복지관에 남기실 메모가 있나요?</Dialog.Title>

          <Dialog.Input autoFocus underlineColorAndroid='rgb(1, 192, 99)' placeholder="메모를 입력해 주세요." onChangeText={(memo) => { this.userMemo = memo; }}
          ></Dialog.Input>

          <View backgroundColor='rgb(1, 192, 99)'>
          <Dialog.Button label="사진 업로드" color='white' onPress={() => this.props.navigation.navigate('CameraScreen')}/>
          </View>

          <Dialog.Button title="신청" label="신청" color='rgb(1, 192, 99)' onPress={

            () => {
              this._fetchPost('http://saevom06.cafe24.com/requestdata/newRegister', {
                id: this.state.type,
                name: this.props.navigation.getParam('userName', 'invalid name from App: DashboardScreen.js [in <Dialog>]'),
                email: this.props.navigation.getParam('userEmail', 'invalid email from App: DashboardScreen.js [in <Dialog>]'),
                memo: this.userMemo,
                date: this.state.userSelectedDateTime,
                // 'type' : this.state.type
              });
              this.setState({ dialogVisible: false });
            }
          } />
          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
        </Dialog.Container>

<View style={{margin:20}}></View>


        <Text
          style={{ color: 'rgb(1, 192, 99)', letterSpacing: 2, fontSize: 45, marginBottom: 30, textAlign:"center" }}
        >활동 신청</Text>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50 }}
            titleStyle={{ fontSize: 23 }}
            title="물건 나누기"
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='gift'
                  type='feather'
                  color='white'
                />
              </View>
            }
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 18 });
              this.setState({ dialogVisible: true });
            }}
          />
        </View>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            title="차량 지원"
            buttonStyle={{ height: 50 }}
            titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='truck'
                  type='feather'
                  color='rgb(1, 192, 99)'
                />
              </View>
            }
            type="outline"
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 19 });
              this.setState({ dialogVisible: true });
            }}
          />
        </View>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            title="말 벗"
            buttonStyle={{ height: 50 }}
            titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='user-plus'
                  type='feather'
                  color='rgb(1, 192, 99)'
                />
              </View>
            }
            type="outline"
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 20 });
              this.setState({ dialogVisible: true });
            }}
          />
        </View>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            title="청 소"
            buttonStyle={{ height: 50 }}
            titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='wind'
                  type='feather'
                  color='rgb(1, 192, 99)'
                />
              </View>
            }
            type="outline"
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 21 });
              this.setState({ dialogVisible: true });
            }}
          />
        </View>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            title="물품 요청"
            buttonStyle={{ height: 50 }}
            titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='package'
                  type='feather'
                  color='rgb(1, 192, 99)'
                />
              </View>
            }
            type="outline"
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 34 });
              this.setState({ dialogVisible: true });
            }}
          />
        </View>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
          <Button
            title="기 타"
            buttonStyle={{ height: 50 }}
            titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='layers'
                  type='feather'
                  color='rgb(1, 192, 99)'
                />
              </View>
            }
            onPress={() => {
              // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
              this.setState({ type: 35 });
              this.setState({ dialogVisible: true });
            }}
            type="outline"
          />
        </View>
        <Text style={{ fontSize: 13, marginTop: 20 }}>
          {
            //this.props.navigation.getParam('userEmail', '로그인 되어있지 않습니다.')
          }
        </Text>

        <Button
          type="clear"
          title='테스트스크린으로'
          titleStyle={{ color: 'blue' }}
          onPress={() => this.props.navigation.navigate('TestScreen')}
        />

        <Button
          type="clear"
          title='로그인 페이지로'
          titleStyle={{ color: 'orange' }}
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />

        <Button
          type="clear"
          title='카메라 페이지로'
          titleStyle={{ color: 'red' }}
          onPress={() => this.props.navigation.navigate('CameraScreen')}
        />

        <Button
          type="clear"
          title='flatList 페이지로'
          titleStyle={{ color: 'pink' }}
          onPress={() => this.props.navigation.navigate('ListScreen')}
        />

        </ScrollView>

    );
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
