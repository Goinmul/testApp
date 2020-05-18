import React , {Component} 
from 'react';

import { StyleSheet, Text, View, ActivityIndicator } 
from 'react-native';

import firebase from 'firebase';

class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        // when auth state changes (user tries to login)
        firebase.auth().onAuthStateChanged(function(user) { // call anonymous funtion(user) when .onAuthStateChanged() is called
            if (user){ // if user information exists
                console.log('LoadingScreen.js : valid user has logged in.');
                this.props.navigation.navigate('DashboardScreen')
            }
            else { // invalid user information
                console.log('LoadingScreen.js : no user information.'); 
                this.props.navigation.navigate('LoginScreen')
            }
        }.bind(this)
    )}
    // scope of 'this' was function(user), but if you change it to user => {}, the scope will level up to upper scope.
    // you can use user => {}, or
    // if you want to use function(user){}, just add .bind(this) to the end of the function. So it would be function(user){}.bind(this)

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>

        );
    }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
