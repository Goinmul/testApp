import React , {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
class DashboardScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>로그인 되었습니다.</Text>
                <Button 
                title="로그아웃" 
                onPress={()=> firebase.auth().signOut()}
                >
                </Button>

                <Button
                title="POST"
                onPress={()=> this.props.navigation.navigate('FormScreen')}
                ></Button>
                
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
