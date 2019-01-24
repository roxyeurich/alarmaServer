import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
// npm install react-native-linear-gradient --save
 class AlertReward extends Component {
  state = {
    modalVisible: true,
      //change to false later
  };
   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
   render() {
    return (
<View style={styles.container}>
       
      <View style={{marginTop: 22}}>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            
            
          <View style={styles.alertBox}>
                <LinearGradient 
                        start={{ x: 0, y: 0.35 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#49CBC6','#2d9f9b', '#4B7CB0']} 
                        style={styles.linearGradient}>
  
                 <View style={styles.rewardText}>
                        <Text style={styles.rewardTitle}>Reward Sent!</Text>
                            <Image 
                    source={(this.state.image) ? {uri:this.state.image} : require('../../Content/icons/PNG/rewardSent.png')}
                    style={styles.rewardIcon}
                    resizeMode="contain"
              /> 
                     
                     <Image 
                    source={(this.state.image) ? {uri:this.state.image} : require('../../Content/Imgs/ProfilePic.png')}
                    style={styles.profilePhoto}
                    resizeMode="contain"
              />
                         <TouchableOpacity style={styles.button}>
                        <Text 
                            style={styles.butText}
                            >
                            Okay!</Text>
                        </TouchableOpacity>
            </View>
         
              </LinearGradient>
          </View>
        </Modal>
         <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>CLick here</Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}
 const styles = StyleSheet.create({
    
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    
alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
                                 
linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    position: 'absolute',
    top:30,
    left:30,
    borderRadius: 5,
    },
                                 
rewardText: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },  
    
rewardIcon: {
    width:150,
    height:150,
    },
    
profilePhoto: {
    position:'absolute',
    top:90,
    width:110,
    height:110,
    },
    
rewardTitle: {
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
export default connect(mapStateToProps)(AlertReward);