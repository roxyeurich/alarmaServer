import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
// npm install react-native-linear-gradient --save

import {ChangePage} from '../../redux/actions';

class AlertTask extends Component {
  
    handleOk=()=>{
      this.props.dispatch(ChangePage(4));
    }

  
  render() {
    return (
       

            
            
          <View style={{  justifyContent: 'center',
            width:400,
            height:500,
            opacity:1,
            position:'relative',
            top:0,
            backgroundColor:'rgba(255, 255, 255, 0)',
                
                       }}
              
              >
                <LinearGradient 
                        start={{ x: 0, y: 0.35 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#49CBC6','#2d9f9b', '#4B7CB0']} 
                        style={styles.linearGradient}>
                  
                 <View style={styles.taskText}>
                       <Text>You are home! Here are yout tasks:</Text>
                        <Text style={styles.taskTitle}>Task title</Text>
                        <Text style={styles.taskDue}>Due Date</Text>
                        <Text style={styles.stars}>**insert Stars Here**</Text>
                        <Text style={styles.taskDisc}>Task Description</Text>
                    <TouchableOpacity style={styles.button}
                       onPress={this.handleOk}>
                        <Text
                             style={styles.butText}>
                            Ok</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={this.bgOpacity}
                            style={styles.button}>
                                <Text 
                                    style={styles.butText}
                                    >
                                Cancel</Text>
                        </TouchableOpacity>
            </View>
         
              </LinearGradient>
          </View>

    );
  }
}

const styles = StyleSheet.create({
    
container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:0,
  
  },
    
alertBox: {
  
},
                                 
linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    position: 'absolute',
    top:95,
    left:48,
    borderRadius: 5,
    
    },
                                 
taskText: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },
    
taskTitle: {
   fontSize:25,
        marginTop:7,


    
    },    
taskDue: {
    fontSize:15,
    color: 'grey',
    marginTop:7,

    
    },
    
taskDesc: {
   fontSize:25,
    marginTop:15,

    
    },                                 
 
    
button: {
    borderWidth: 2,
    borderColor:'rgba(150, 150, 150, 0.5)',
    borderRadius: 5,
    backgroundColor: '#49CBC6',
    width:250,
    marginTop:30,
    
    

    
},                              
    
butText: {
    height:38,
    fontSize:20,
    position:'relative',
    top:6,
    color:'white', 
    textAlign:'center',


    
},                              

    
    
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    admin:parseInt(state.Page.admin)
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(AlertTask);