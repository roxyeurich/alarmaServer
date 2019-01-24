import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Asset, Font} from 'expo';


  
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class ChooseAdd extends React.Component {

  
  handleCreateT=()=>{
    this.props.dispatch(ChangePage(10));
  }
  
  handleCreateR=()=>{
    this.props.dispatch(ChangePage(14));
  }  
  
  render() {
    return (
      <LinearGradient
          colors={['#49CBC6', '#4B7CB0']}
          style={{width: '100%', height:'100%', alignItems: 'center'}}>
      <View style={styles.container}> 
    
//      <View>
//          <Text style={styles.titleAlarma}><Text style={{fontSize:65}}>A</Text>LARMA</Text>
//        </View>
        <View style={styles.buttonContainer}>   

        
           <TouchableOpacity style={styles.container} onPress={this.handleCreateT}>
            <Image style={styles.createTImg} source={require('../Content/icons/PNG/createT.png')} />
             <View style={{marginTop:10}}>
                <Text style={styles.createText}>Create Task</Text>
              </View>
           </TouchableOpacity> 

          <TouchableOpacity style={styles.container} onPress={this.handleCreateR}>
              <Image style={styles.createRImg} source={require('../Content/icons/PNG/reward.png')} />
              <View style={{marginTop:10}}>
                <Text style={styles.createText}>Create Reward</Text>
              </View>
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
  
  createTImg: {
    marginTop:0, 
    width:85,
    height: 85,
    padding:10,
    shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },
  
  createRImg: {
    marginTop:70, 
    width:85,
    height: 85,
    padding:10,
    shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },
  
  titleAlarma: {
    color: 'white',
    top: -50,
    fontSize: 50,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },
  
  buttonContainer: {
    top:-50,
    padding:50,
    width: 400,
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  createText: {
    color: 'white',
    fontSize: 20,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  }
  
  
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(ChooseAdd);