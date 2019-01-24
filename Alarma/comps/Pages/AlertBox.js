import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
// npm install react-native-linear-gradient --save


class GroupP extends Component {
  state = {
    modalVisible: false,
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
                        colors={['#49CBC6', '#fecfef', '#fecfef']} 
                        style={styles.linearGradient}>
  
                 <View style={styles.taskText}>
                    <Text style={styles.taskTitle}>Task title</Text>
                    <Text style={styles.taskDue}>Due Date</Text>
                    <Text style={styles.taskDisc}>**insert Stars Here**</Text>
                    <Text style={styles.taskDisc}>Task Description</Text>
                </View>
            <View style={styles.buttonCon}>
                <View style={styles.doneBut}>
                    <Button
                        title='Done'/>

                </View>

                <View style={styles.cancelBut}>
                    <Button 
                        title='Cancel'/>
                </View>
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
    
    height:200,
    
    
    
},
                                 
linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:280,
    position: 'absolute',
    top:30,
    left:30,
    
    },
                                 
taskText: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:150,
    marginTop:7,


    
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
buttonCon: {
    flexDirection: 'row',
    width:290,
    position:'relative',
    bottom:0,
    height:50,
    backgroundColor: 'rgba(225, 255, 255, 0.5)',
    marginBottom:7,
    marginTop:2,




    
    },                                 
doneBut: {
    flex: 1,
    flexDirection: 'row',
    borderWidth:1,
    alignItems: 'center',
    borderColor:'rgba(150, 150, 150, 0.5)',
    marginRight:1,


      


  

    
    },                                 
cancelBut: {
    flex: 1,
    flexDirection: 'row',
    borderWidth:1,
    borderColor:'rgba(150, 150, 150, 0.5)',
    alignItems: 'center',
    marginLeft:1,



    
    }
    
    
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    admin:parseInt(state.Page.admin)
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(GroupP);