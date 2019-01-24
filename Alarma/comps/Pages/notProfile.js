import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, Switch } from 'react-native';
import {LinearGradient} from 'expo';
import NavBar from './NavBar';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class Profile extends React.Component {
  state={
    adress:"",
    predictions:[],
    description:"",
  }
  componentWillMount=()=>{
    this.handleProfile();
  }

    handleLanding=()=>{
    this.props.dispatch(ChangePage(0)); 
  }
    
        handleCTask=()=>{
    this.props.dispatch(ChangePage(10));
  }
      handleAtHome=()=>{
      
      }
      
      handleProfile=async ()=>{
    var fd= new FormData();
      fd.append("id", this.props.id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUser.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Account Created");
        this.setState({
          adress:json[0].location_main
        })
      } else {
        
      }
  }

  render() {
    return (
          <View  style={styles.container}> 
         <LinearGradient   colors={['#49CBC6', '#4B7CB0']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
          
          
          <View style={styles.scoresCont}>
            <TouchableOpacity style={styles.score}>
              <Text style={styles.textScore}>Total: 100</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.score}> 
              <Text style={styles.textScore}>Weekly: 50</Text>
            </TouchableOpacity>
          </View>
  
          <Text
            style={styles.title}>
            Username
          </Text>
          
            <Image 
            source={require('../Content/Imgs/ProfilePic.jpg')}
            style={styles.profilePhoto}
            resizeMode="cover"
            />
            
           <View style={styles.switchCont}>
             
          <Text style={styles.textatHome}>At Home</Text>
          <Switch
          style={styles.toogle}
          />
          </View>  
            <View>
              <Text style={styles.locationText}>Adress:{this.state.adress}</Text>
              
            </View>
             
      <NavBar />

    </LinearGradient>
</View>

        
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      },
  
    scoresCont: {
      width:200,
      height:100,
      top:130,
      left:7,
      position:'absolute',
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    },
  
    score: {
    width:90,
    height:70,
    marginTop:0,
      justifyContent:'center',
    alignItems:'center',
    borderRadius: 35,
    borderColor:'#49CBC6',
    borderWidth:4,
    margin:55,
},
  
    title: {
      color: 'white',
      marginTop: 60,
      fontSize: 30,
      textAlign: 'center',
      //fontFamily: 'Raleway',
    },
  
    profilePhoto: {
      width: 230, 
      height: 230, 
      borderRadius: 110, 
      borderColor: '#49CBC6',
      borderWidth:5,
      top: 110,
      },
  
  toogle: {
    marginTop: 140,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
    elevation: 2, // Android
    },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway',
  },
  
    textScore: {
    fontSize: 19,
    color: 'white',
    textAlign:'center',
    paddingTop:4,
    //fontFamily: 'Raleway',
  },
  
  
  textatHome:{
    fontSize: 20,
    color: 'white',
    textAlign:'center',
    padding:10,
    width:100,
    height:50,
    marginTop:135,
  },
  
  switchCont: {
    flex:1,
    flexDirection:'row',
  },
  
  locationText: {
    width:300,
    height:60,
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    marginTop:0,
    borderColor:'#49CBC6',
    borderWidth:2,
    marginTop: -160,
    borderRadius: 15,
    padding:5
   
  },
});




function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid
    
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Profile);