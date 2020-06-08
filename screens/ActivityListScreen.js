import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

class ActivityListScreen extends Component {
    
    constructor(){
        super();

        this.state = {

            // sample json data. should get it from spring server
            data: [
                { 
                 id:'1',
                 name:'sam',
                 phone: '010-4524-5124',
                 number:'1111',
                },
                { 
                 id:'2',
                 name:'pete',
                 phone: '010-1111-4451',
                 number:'2222',
                }
            ]
        }
    }

    ListItemSeparator = () => {
        return (
            <View style={{ height: 5, width: '100%', backgroundColor: 'skyblue'}}></View>
        );
    }

    GetItem = (n) =>{
        Alert.alert(n);
    }

    _keyExtractor = (item) => item.id;

    render(){
        console.warn(this.props.navigation.getParam('data', 'data passing error from FlatList'),);
        return (
            <View style={styles.container}>
                <Text>Display Json Data as a List</Text>
                <FlatList
                    data = {this.state.data}
                    renderItem= {
                    ({item})=>
                        <View>
                            <Text
                                onPress={()=> this.GetItem(item.name)}
                            >{item.name}</Text>
                            <Text>{item.number}</Text>
                        </View>
                    }
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent = {this.ItemSeparatorComponent}
                >
                </FlatList>
                <Button 
                    onPress={()=> this.props.navigation.navigate('DashboardScreen')}
                    title='go Back'
                >
                </Button>
            </View>
        );
    }
}
export default ActivityListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
