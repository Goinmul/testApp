import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class ButtonScreen extends Component {
    render() {
        return (
            <View style={styles.container}>

                <Button
                    title="Solid Button"
                />

                <View style={{margin:10}}/>

                <Button
                    title="Outline button"
                    type="outline"
                />

                <Button
                    title="Clear button"
                    type="clear"
                />

                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Button with icon component"
                />

                <Button
                    icon={{
                        name: "arrow-right",
                        size: 15,
                        color: "white"
                    }}
                    title="Button with icon object"
                />

                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                    title="Button with right icon, 대쉬보드로"
                    onPress={() => this.props.navigation.navigate('DashboardScreen')}
                />

                <Button
                    title="Loading button"
                    loading
                />
            </View>
        );
    }
}
export default ButtonScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


