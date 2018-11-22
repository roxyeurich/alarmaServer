import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView  } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import NavBar from './NavBar';

class Createacc extends React.Component {
  username = "";
  email= "";
  password = "";
  


    handleProfile=async ()=>{
    if (this.email.lenght == 0 || this.password.lenght ==0 || this.username == 0){
      alert("Please fill the inputs with your info");
      return false;
    }
   
    var fd= new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
      fd.append("username", this.username);
      fd.append("location_main", this.state.description);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/register.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        //json.id 
        //alert ("Account Created");
        this.props.dispatch(ChangeUserId(json.id, null));
        this.props.dispatch(ChangePage(7));
        
      } else {
        alert ("Something went wrong!");
      }
  }
  
  handleLanding=()=>{
    this.props.dispatch(ChangePage(0));
    
  }
  //*************************************

   state={
        predictions:[],
        description:"",
        show:false,
    }
  
  
  handleTouchLoc=(obj)=>{
    this.setState({
      description:obj.description,
      show:false
    })
  }
  
  render() {
    
    
    if(this.state.show === false) {
      allP = null;
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleLanding}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.middleContainer}>
          
          <Text style={styles.textLabel}>Username</Text>
          
            <TextInput underlineColorAndroid='transparent'
            style={styles.textInput}
            onChangeText={(text) => this.username=text}
            />

          <Text style={styles.textLabel}>Email</Text>

            <TextInput underlineColorAndroid='transparent'
            style={styles.textInput}
            onChangeText={(text) => this.email=text}
            />

          <Text style={styles.textLabel}>Password</Text>

            <TextInput underlineColorAndroid='transparent'
            style={styles.textInput}
            onChangeText={(text) => this.password=text}
            secureTextEntry={true}
            />

          <TouchableOpacity style={styles.createaccBut} 
              onPress={this.handleProfile}>
              <Text style={styles.textBut}>Create Account</Text>
        </TouchableOpacity>
      
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
  },
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
  labelContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
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
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway',
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
    marginTop: 15,
    marginBottom: -5,
    //fontFamily: 'Raleway',
  },
  
  textInput: {
    color: 'black',
    fontSize: 15,
    height: 50,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
    textAlign: 'left',
    //fontFamily: 'Raleway',
  },
  
  createaccBut: {
    marginTop: 40,
    alignItems: 'center',
    alignSelf:'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    //fontFamily: 'Raleway',
  },
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Createacc);