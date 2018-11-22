import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook} from 'expo';


  
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class Landing extends React.Component {
  
  handleLogin=()=>{
    this.props.dispatch(ChangePage(1));
    
  }
  
  handleFBlogin=async()=>{
    try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('966865153515286', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      //this.props.dispatch(ChangePage(4));
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
    
  }
  
  handleCreateacc=()=>{
    this.props.dispatch(ChangePage(3));
  }  
  
  render() {
    return (
      <LinearGradient
          colors={['#49CBC6', '#4B7CB0']}
          style={{width: '100%', height:'100%', alignItems: 'center'}}>
      <View style={styles.container}> 
    
        <Image style={styles.logoImg} source={require('../Content/icons/PNG/AlarmaLogo.png')} />
        
        <Text style={styles.titleAlarma} ><Text style={{fontSize:65}}>A</Text>LARMA</Text>
       
        <View style={styles.buttonContainer}>   

           <TouchableOpacity style={styles.containerBut} onPress={this.handleLogin}>
             <Text style={styles.textBut} >Log In</Text>
           </TouchableOpacity> 

          <TouchableOpacity style={styles.containerButFB} onPress={this.handleFBlogin}>
             <Text style={styles.textBut}><Text style={{color: 'white'}}>Connect with Facebook</Text></Text>
          </TouchableOpacity> 


          <TouchableOpacity style={styles.containerBut} onPress={this.handleCreateacc}>
             <Text style={styles.textBut} >Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',

  },
  
  logoImg: {
    marginTop:50, 
    width:163,
    height: 172
  },
  
  titleAlarma: {
    color: 'white',
    marginTop: 20,
    fontSize: 50,
    //fontFamily: 'Raleway',
  },
  
  buttonContainer: {
    padding:50,
    width: 400,
    height: 300,
    justifyContent: 'space-between',
    
  },
  
  containerBut: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    backgroundColor: 'white',
    width:300,
    height:50,
    shadowColor: 'rgba(17, 35, 56, 0.9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  
  containerButFB: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    backgroundColor: '#475993',
    width:300,
    height:50,
    shadowColor: 'rgba(17, 35, 56, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  
  textBut: {
    fontSize: 20,
    color: 'black',
    //fontFamily: 'Raleway',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Landing);