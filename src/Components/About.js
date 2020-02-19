// import React, { Component } from 'react';
// import { View ,Alert} from 'react-native';
// import Style from './Colors'
// import {Button,Text} from 'native-base'
// class About extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <View style={{flex:1,alignItems:"center",margin:20}}>
//         <Text style={Style.welcome}> Weather App </Text>
//         <Text style={Style.instructions}> React Native Weather App Clone. One of the main Purpose of this repo is to show how to show Latest Weather App spesific to Entered Location to reproduce the smooth scrolling experience in the Native Weather App.Native Weather App Clone. One of the main Purpose of this repo is to show how to use custom axios fetch api to reproduce the smooth scrolling experience in the Native Weather App. </Text>
//         <Button full danger onPress={()=> this.props.navigation.navigate('Home')}><Text>Go To Weather</Text></Button>
//       </View>
//     );
//   }
// }

// export default About;

import React from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { Icon, Button } from "react-native-elements";
// import { enText } from "../lang/en"
export default class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dataSource: [],
    };
  } 
  componentDidMount() { this.fetchData(); }
  
  fetchData = () => {
    this.setState({ loading: true });
     fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(responseJson => {
        responseJson = responseJson.map(item => {
          item.isSelect = false;
          item.selectedClass = styles.list;
          return item;
        }); 
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      }).catch(error => {
        this.setState({ loading: false });
      });
  }; 
  
  FlatListItemSeparator = () => <View style={styles.line} />
  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
      styles.selected : styles.list;
    const index = this.state.dataSource.findIndex(
      item => data.item.id === item.id
    );
    this.state.dataSource[index] = data.item;
    this.setState({
      dataSource: this.state.dataSource,
    });
  }; 
  
  renderItem = data => {
    return < TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => { }}
    >
      <Image
        source={{ uri: 'https://via.placeholder.com/600/92c952' }}
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={styles.lightText}>  {data.item.name}  </Text>
      <Button
        title="select"
        onPress={() => {this.selectItem(data)}}
        buttonStyle={{borderRadius:20,paddingVertical:2}}
      />
    </TouchableOpacity >
  }
  render() {
    const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
    const selectedItems = this.state.dataSource.filter(item => item.isSelect);
     if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
        <View style={styles.numberBox}>
          <Text style={styles.number}>{itemNumber}</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <View style={{ alignSelf: 'baseline' }}>
            <Icon
              raised
              name="shopping-cart"
              type="font-awesome"
              color="#e3e3e3"
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
} const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192338",
    position: "relative"
  }, title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10
  }, loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }, list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#192338",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  }, lightText: {
    color: "#f7f7f7",
    flex:1,
    paddingLeft: 15,
    fontSize: 12
  }, line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  }, icon: {
    position: "absolute",
    bottom: 10,
    right: 0,
    zIndex: 1,
  }, numberBox: {
    position: "absolute",
    bottom: 60,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#172337',
    right: 5,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center"
  }, number: { fontSize: 14, color: "#000" }, selected: { backgroundColor: "#FA7B5F" },
});

