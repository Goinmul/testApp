import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
let buttonList = [];
let interestCategory = [];

class TestScreen extends Component {

  state = {
    showButtons: false, // for rendering buttons after fetch()
  }
  constructor(props) {
    super(props);

    var url = 'http://saevom06.cafe24.com/interest/getAll';
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {

          // receive the interest categories(관심사 목록) from server, and add an attribute(action) to 'interest category'  
          for (var i = 0; i < responseInJson.length; i++) {
            let givenType = responseInJson[i]["id"];

            responseInJson[i]["action"] = () => {
              this.setState({ type: givenType });
              this.setState({ dialogVisible: true });
            }
            interestCategory.push(responseInJson[i]);
          } // at this point, each elements of interest category is like { id:1, name:"driving", action: () => {...} }

          // render buttons with 'interest category' information
          buttonList = interestCategory.map(
            buttonInfo => {
              return (

                <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
                  <Button

                    key={buttonInfo.id}
                    buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50, width: 400 }}
                    titleStyle={{ fontSize: 23 }}
                    title={buttonInfo.name}
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
                    onPress={buttonInfo.action}
                  />
                </View>
              );
            }
          );
          // after getting all the data, render the buttons
          this.setState({ showButtons: true });
        })
    } catch (e) {
      console.warn('[TestScreen.js try-catch error log]', e);
    }

  }

  render() {
    if (this.state.showButtons == true) {
      return (
        <View style={styles.container}>
          <Text>TestScreen</Text>
          <ScrollView>
            <View>{buttonList}</View>
            <Button
              type="clear"
              title='대시보드 페이지로'
              titleStyle={{ color: 'orange' }}
              onPress={() => this.props.navigation.navigate('DashboardScreen')}
            />
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Data is loading...</Text>

          <Button
            type="clear"
            title='대시보드 페이지로'
            titleStyle={{ color: 'orange' }}
            onPress={() => this.props.navigation.navigate('DashboardScreen')}
          />
        </View>
      );
    }
  }
}
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
