import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

const { array, string, object, bool, func, any } = PropTypes;

class Button_Customized extends Component {

    static propTypes={
        title: string,
        raised: bool,
        icon: any,
        onPress: func,
        type: any,
    }

    render() {
        return (
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
        );
    }
}
export default Button_Customized;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
