import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput  } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class FBlogin extends React.Component {
  

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
   backImg: {
    marginLeft:40,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
    touch: {
    width: 80,
    height: 100,
    zIndex: 10,
  },
            
    title: {
    color: 'white',
    marginTop: -35,
    marginLeft: 35,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway',
  },
  
   middleContainer: {
    marginTop:50,
    alignItems: 'center',
  },
  
  textLabel: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 15,
    marginBottom: -5,
  },
  
  textInput: {
    color: 'black',
    fontSize: 15,
    height: 60,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
    //fontFamily: 'Raleway',
  },
  
    loginBut: {
    marginTop: 70,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(24, 56, 118, 1.0)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    },
  
    textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway',
  },
  
    fbLogo: {
    marginLeft:10,
    marginTop: 20,
    width: 20,
    height: 20,
  },
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(FBlogin);