import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class ListScreen extends Component {

  state = {
    allActivities: [],
    showList: false,
  }

  constructor(props) {
    super(props);

    try {
      let url = "http://saevom06.cafe24.com/activitydata/getActivities"
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {

          this.setState({ allActivities: responseInJson });

          // for (var i = 0; i < responseInJson.length; i++) { }
          this.setState({ showList: true });
        })
    } catch (e) {
      console.log(e);
    }
  }
  
  render() {
    if (this.state.showList == true) {
      return (
        <View style={styles.container}>

          <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
            <Text>Header</Text>
          </SafeAreaView>

          <SafeAreaView style={{ flex: 1, alignItems: 'flex-start' }}>
            <FlatList
              data={this.state.allActivities}
              renderItem={
                ({ item }) => (
                  <View style={{ margin: 5, flex:1, flexDirection:'column' }}>

                    <Button
                      title={item.title}
                      buttonStyle={{ height: 50 }}
                      titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
                      raised
                      type="outline"
                      onPress={() => {
                        this.props.navigation.navigate('ActivityListScreen', {
                        data: item
                        });
                      }}
                    />

                  </View>
                )
              }
              keyExtractor={(item) => item.id.toString()}
            >
            </FlatList>
          </SafeAreaView>

        </View>
      );

    } else {
      return (
        <View style={styles.container}>
          <Text>Loading data from server...</Text>
        </View>
      );
    }

  }
}
export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
