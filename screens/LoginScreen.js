import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import * as Expo from "expo";
import * as Google from 'expo-google-app-auth';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
// import * as Google from 'expo-google-sign-in'; // You may use this when exporting, because 'expo-google-app-auth' doesn't work when the app is released.

class LoginScreen extends Component {

  _isMounted = false;

  state = {
    userName: '', userEmail: '', userId: '',
    loggedIn: false
  }

  componentDidMount() {
    this._isMounted = true;
  }

  // check if google user & firebase user are the same
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  //copied from official document,
  //https://firebase.google.com/docs/auth/web/google-signin?authuser=0

  onSignIn = (googleUser) => {
    // console.log('Google Auth Response', googleUser.profile);

    // first check if user is signed in to the "firebase authentication system".
    var unsubscribe = firebase.auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();

        // check if the verified(firebase-authenticated) user is the same user that is trying to log in now
        if (!this.isUserEqual(googleUser, firebaseUser)) {

          // build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(

            // googleUser.getAuthResponse().id_token
            // instead of useing above line, seperately pass the token.
            googleUser.idToken,
            googleUser.accessToken
          );

          // Sign in the user to firebase auth system with credential from the Google user.
          firebase.auth().signInWithCredential(credential)

            // ****** async added. MUST CHECK IF IT WORKS WITHOUT ERROR. ******
            .then(async function (result) {

              // console.log(result.additionalUserInfo.profile);
              // do post request to the SpringBoot server.
              try {
                var url = 'http://saevom06.cafe24.com/test/post';
                console.log(url);
                //var dummyObject = {'name': 'dummy name'}
                var data = await fetch(url,
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(result.additionalUserInfo.profile),
                  }
                )
              } catch (e) {
                console.log('http request from application failed : ', e);
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        androidClientId: '700723661373-ckna2mf0s53q9bv2q2eelpcneh0jdhg3.apps.googleusercontent.com',
        iosClientId: '700723661373-oomfpjnkd2hifvo77qjj129k7vqhnb4h.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        if (this._isMounted) {
          this.setState({ userName: result.user.name, userEmail: result.user.email, userId: result.user.id, loggedIn: true });
        }
        this.onSignIn(result); // call onSignIn method here.
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } // end of try
    catch (e) {
      return { error: true };
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
        {!this.state.loggedIn &&
          <Button
            buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50 }}
            titleStyle={{ fontSize: 23 }}
            onPress={() => this.signInWithGoogleAsync()}
            title="Google Login"
            raised
            icon={
              <View style={{ marginRight: 10 }}>
                <Icon
                  style={{ marginRight: 5 }}
                  reverse
                  size={20}
                  name='user'
                  type='feather'
                  color='white'
                />
              </View>
            }
          />
        }
        </View>

        <View>
          {this.state.loggedIn && // when Google user is logged in, this component appears
            <View>
              <Text
                style={{color : 'rgb(1, 192, 99)', letterSpacing:1 ,fontSize:30, marginBottom:30, textAlign:'center'}}
              >{this.state.userName} 님, 환영합니다!</Text>
              <Text
                style={{color : 'rgb(1, 192, 99)', letterSpacing:2 ,fontSize:20, marginBottom:30, textAlign:'center'}}
                >{this.state.userEmail}</Text>

              <Button
                title="활동하러 가기!"
                titleStyle={{ fontSize: 23 }}
                buttonStyle={{ backgroundColor: 'orange', height: 40 }}
                raised
                onPress={() => {
                  this.props.navigation.navigate('DashboardScreen', {
                  userEmail: this.state.userEmail, userName: this.state.userName, userId: this.state.userId
                  });
                }}
              />

            </View>

            
          }
        </View>




      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
