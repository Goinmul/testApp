import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SampleScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>SampleScreen</Text>
            </View>
        );
    }
}
export default  SampleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
