import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook, Asset, Font} from 'expo';
import LottieView from 'lottie-react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class Intro extends React.Component {
 handleIntro=()=>{
   this.props.dispatch(ChangePage(19));
 }
  
  render() {
    return (
      
      
  <LinearGradient
      colors={['#49CBC6', '#4B7CB0']}
      style={{width: '100%', height:'100%', alignItems: 'center'}}>
    <TouchableOpacity onPress={this.handleIntro}>
      <View style={styles.container}> 
         <Text style={styles.titleAlarma} ><Text style={{fontSize:65}}>A</Text>LARMA</Text>
         <LottieView
          source={require('../Content/Imgs/task_done.json')}
          style={styles.lottie}
          autoPlay
          loop
        />
        <View style={styles.buttonContainer}>   

             <Text style={styles.textBut}>Complete tasks and level up while you get points. It is fun!</Text>
          
        </View>
      </View>
    </TouchableOpacity>
</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  
  titleAlarma: {
    color: 'white',
    top: 150,
    fontSize: 50,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    textAlign:'center',
    shadowColor: 'rgba(9, 49, 38, 0.67)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  
  lottie: {
    width:300, 
    height:300, 
    top:30, left:0, 
    justifyContent: 'center',
    shadowColor: 'rgba(11, 51, 40, 0.91)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android 
  },

  buttonContainer: {
    top:0,
    width: 300,
    height: 200,
    justifyContent: 'center',
    
  },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    lineHeight:30,
    textAlign: 'center',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Intro);