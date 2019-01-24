import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, Modal, Activity} from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook, Asset, Font} from 'expo';
import LottieView from 'lottie-react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class Loading extends React.Component {

  
  render() {
    return (
      
     <View style={styles.container}> 
        <View style={{right:70}}>
        
         <LottieView
          source={require('../Content/Imgs/loading.json')}
          style={{width:400, height:400, alignSelf: 'center',}}
          autoPlay
          loop
        />
        
      
    </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    position: 'absolute',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Loading);