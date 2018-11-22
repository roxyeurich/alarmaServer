import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Timer } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';


import NavBar from './NavBar'

class Rewards extends React.Component {
  
state={
  rewars:[],
  reward_title:"",
  reward_points:0,
}
    constructor(props) {
      super(props);
      this.state = { text: this.setState.text };
  }
  
    handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
    
  }
    
    handleAlert=()=>{
    this.props.dispatch(ChangePage(5));
    
  }
  
    componentWillMount=()=>{
    this.handleReward();
  }
      
      
   handleReward=async ()=>{
    var fd= new FormData();
     //change id to group_id
      fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getReward.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(rewars);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          rewars:json
      
        });
      } else {
        
      }
  }
   
renderRewards=(rewars)=> {

   var rewars = rewars || [];
  
   return rewars.map((rewars,index) => 
     <View style={styles.taskCont} key={rewars.reward_title}>
      <View style={styles.contTitle}>
        <Text style={styles.taskName}>{rewars.reward_points}</Text>
     </View>
    </View>
   );
 }      

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Rewards</Text>
        </View>

        <View style={styles.middleContainer}>
          <ScrollView>
           {this.renderRewards(this.state.rewars)}
          </ScrollView>
      </View>
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
    justifyContent: 'flex-start',
  },
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 10,
  },
  
  backImg: {
   marginLeft:40,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway',
  },
  
  hamMenu: {
    marginRight:20,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  taskName: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'left',
    marginTop: 10,
  },
  
  middleContainer: {
   marginTop: 30,
   alignItems: 'center',
  },
  
    textLabel: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: -5,
    //fontFamily: 'Raleway',,
  },
  
    taskCont: {
    height: 70,
    width: 350,

    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
    
  },
  
    textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway',
  },
    
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Rewards);