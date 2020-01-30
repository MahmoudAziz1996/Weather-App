import React, { Component } from 'react';
import { View ,Alert} from 'react-native';
import Style from './Colors'
import {Button,Text} from 'native-base'
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,alignItems:"center",margin:20}}>
        <Text style={Style.welcome}> Weather App </Text>
        <Text style={Style.instructions}> React Native Weather App Clone. One of the main Purpose of this repo is to show how to show Latest Weather App spesific to Entered Location to reproduce the smooth scrolling experience in the Native Weather App.Native Weather App Clone. One of the main Purpose of this repo is to show how to use custom axios fetch api to reproduce the smooth scrolling experience in the Native Weather App. </Text>
        <Button full danger onPress={()=> this.props.navigation.navigate('Home')}><Text>Go To Weather</Text></Button>
      </View>
    );
  }
}

export default About;
