import React, { Component } from 'react';
import { View, Text,FlatList } from 'react-native';
import {Spinner, Row} from 'native-base'
import Axios from 'axios';
import ListItem from './Row'

export default class List extends Component {

    static navigationOptions = ({navigation})=>{
      return  {title: `Weather/ ${navigation.state.params.data.title}`}
      };
  constructor(props) {
    super(props);
    this.state = {
        city:this.props.navigation.state.params.data.title,
        report:null
    };
  }

  componentWillMount(){
      const url=`https://openweathermap.org/data/2.5/forecast/daily?q=${this.state.city},&mode=json&units=metric&cnt=10&appid=b6907d289e10d714a6e88b30761fae22`
      Axios.get(url)
      .then((response)=> response.data.list)
      .then((response)=> this.setState({report:response}))
  }

  render() {
      
    return (
        this.state.report?
      <View>
        <FlatList
           data={this.state.report}
           renderItem={(item, id)=> <ListItem day={item} index={id}/>}
           keyExtractor={(item,index)=>index.toString()}
        />
      </View>:
    <View style={{flex:1,justifyContent:'center'}}>
      <Spinner color='#D9534F' />
      </View>
    );
  }
}
