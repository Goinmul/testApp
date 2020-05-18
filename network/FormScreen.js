import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } 
from 'react-native';

class FormScreen extends Component {

    constructor(){
        super(); // before using 'this', super() must be initialized
        
        this.state={
            email:'',
            name:'',
        }
    }

    updateValue(text, field){

        if (field == 'name'){
            this.setState({
                name:text
            })
        } else if (field == 'email'){
            this.setState({
                email:text
            })
        }
        // console.warn(text);
    }

    submit = async () => { // for some examples, they don't use async

        // json data
        var collection = {}
        collection.name = this.state.name,
        collection.email = this.state.eamil,

        console.warn(collection); // for debugging

        // HTTP post here
        var url = 'http://';
        var data = {username: 'example'};

        fetch(url, {
            method: 'POST', // or 'PUT'
            body : JSON.stringify(collection),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(result => result.json())
        .catch(error=> console.error('Error: ', error))
        .then(response => console.log('Success', response));
    }

    render(){
        return (
            <View style={styles.container}>

                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(text)=>this.updateValue(text, 'name')}
                >
                </TextInput>

                <TextInput
                    placeholder="e-mail"
                    style={styles.input}
                    onChangeText={(text)=>this.updateValue(text, 'email')}
                >
                </TextInput>

                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>this.submit()}
                >
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
                
                <Button 
                    title="dashboard화면으로"
                    onPress={()=> this.props.navigation.navigate('DashboardScreen')}
                ></Button>
            </View>
        );
    }
}
export default FormScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn:{
      backgroundColor:'skyblue',
      height: 40,
      color:'#fff', // white
      justifyContent:'center',
      alignItems:'center',
  },
});
