import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Style from './Colors'
import { Button,Text } from 'native-base'
import List from './List'
import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation'; 
 class Search extends Component {
    static navigationOptions = {
        title: 'Location',
      };
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
    }

    render() {
        const params={
            title:this.state.location
        }
        return (
            <View style={{marginTop:30}}>
                <TextInput
                    placeholder="Enter Location"
                    style={Style.input}
                    onChangeText={text => this.setState({ location: text })} />
                    
                <Button block danger style={{ marginHorizontal: 15 }} onPress={()=>this.props.navigation.navigate('Result',{data:params})}>
                    <Text>
                        Search
                    </Text>
                    </Button>


            </View>
        );
    }
}
const MainNavigator = createStackNavigator({
    Main:{
        screen:Search,
    },Result:{
        screen:List
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#D9534F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
});

export default createAppContainer(MainNavigator);