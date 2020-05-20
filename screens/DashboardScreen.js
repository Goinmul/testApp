import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import axios from 'axios'; // will not be used

import { Button, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Dialog from "react-native-dialog";


class DashboardScreen extends Component {

  state={
    dialogVisible: false, serverUrl: '', type:0,
  }

async _fetchGet() {
    
    // var url = 'http://saevom06.cafe24.com/test/get';
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(console.warn('fetch successful'))
    } catch(e){
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
    });
    console.log(url);
    console.warn('fetch successful', url);
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

_axiosGet(){
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

_axiosPost(){
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
    <View style={styles.container}>
      <View style={{margin:10}}/>

      <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{color:'rgb(1, 192, 99)'}}>신청 확인</Dialog.Title>
          <Dialog.Description>
            정말 신청 하시겠습니까?
          </Dialog.Description>
          <Dialog.Button label="신청" color='rgb(1, 192, 99)' onPress={
            ()=>{
              this._fetchPost('http://saevom06.cafe24.com/requestdata/newRegister',{
              'id' : this.props.navigation.getParam('userId', 'invalid id from App: DashboardScreen.js'),
              'name' : this.props.navigation.getParam('userName', 'invalid name from App: DashboardScreen.js'),
              'email' : this.props.navigation.getParam('userEmail', 'invalid email from App: DashboardScreen.js'),
              'type' : this.state.type
            })
            this.setState({ dialogVisible: false });
          }
          } />
          <Dialog.Button label="취소" color='gray' onPress={()=>{this.setState({ dialogVisible: false });}}/>
        </Dialog.Container>

      <Text
        style={{color : 'rgb(1, 192, 99)',letterSpacing:2 ,fontSize:45, marginBottom:30}}
      >활동 신청</Text>

      <View style={[{width: "90%", margin: 20, backgroundColor: "white"}]}>
      <Button
        buttonStyle={{backgroundColor:'rgb(1, 192, 99)', height:50}}
        titleStyle={{fontSize:23}}
        title="물건 나누기"
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='gift'
            type='feather'
            color='white'
          />
          </View>
        }
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 18 });
          this.setState({ dialogVisible: true });
        }}
      />
      </View>

      <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
      <Button
        title="차량 지원"
        buttonStyle={{height:50}}
        titleStyle={{color:'rgb(1, 192, 99)', fontSize:23}}
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='truck'
            type='feather'
            color='rgb(1, 192, 99)'
          />
          </View>
        }
        type="outline"
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 19 });
          this.setState({ dialogVisible: true });
        }}
      />
      </View>

      <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
      <Button
        title="말 벗"
        buttonStyle={{height:50}}
        titleStyle={{color:'rgb(1, 192, 99)', fontSize:23}}
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='user-plus'
            type='feather'
            color='rgb(1, 192, 99)'
          />
          </View>
        }
        type="outline"
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 20 });
          this.setState({ dialogVisible: true });
        }}
      />
      </View>

      <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
      <Button
        title="청 소"
        buttonStyle={{height:50}}
        titleStyle={{color:'rgb(1, 192, 99)', fontSize:23}}
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='wind'
            type='feather'
            color='rgb(1, 192, 99)'
          />
          </View>
        }
        type="outline"
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 999 });
          this.setState({ dialogVisible: true });
        }}
      />
      </View>

      <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
      <Button
        title="물품 요청"
        buttonStyle={{height:50}}
        titleStyle={{color:'rgb(1, 192, 99)', fontSize:23}}
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='package'
            type='feather'
            color='rgb(1, 192, 99)'
          />
          </View>
        }
        type="outline"
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 34 });
          this.setState({ dialogVisible: true });
        }}
      />
      </View>

      <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
      <Button
        title="기 타"
        buttonStyle={{height:50}}
        titleStyle={{color:'rgb(1, 192, 99)', fontSize:23}}
        raised
        icon={
          <View style={{marginRight: 10}}>
          <Icon
            style={{marginRight:5}}
            reverse
            size={20}
            name='layers'
            type='feather'
            color='rgb(1, 192, 99)'
          />
          </View>
        }
        onPress={()=>{
          // this.setState({ serverUrl: 'http://saevom06.cafe24.com/requestdata/newRegister' });
          this.setState({ type: 35 });
          this.setState({ dialogVisible: true });
        }}
        type="outline"
      />
      </View>
      <Text style={{fontSize:16, marginTop:20}}>
        {this.props.navigation.getParam('userEmail', '로그인 되어있지 않습니다.')}
      </Text>
      <Button 
        type="clear"
        title='로그인 페이지로'
        titleStyle={{color:'orange'}}
        onPress={()=> this.props.navigation.navigate('LoginScreen')}
         
      />
    </View>
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
