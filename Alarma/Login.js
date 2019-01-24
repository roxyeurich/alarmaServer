import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, KeyboardAvoidingView,ScrollView, TouchableHighlight, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font } from "expo";

class Login extends React.Component {
  
   handleLanding=()=>{
    this.props.dispatch(ChangePage(18));
    
  }
   
//DATABASE*********************************   
  email = "default@gmail.com";
  password = "default";
  admin = "";

    constructor(props) {
      super(props);
  }
  
    handleProfile=async ()=>{
    
    var fd= new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
    var resp=await fetch("https://alarmaproj2.herokuapp.com/login.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    console.log(json);
    if (json.length > 0) {
      //json[0].id
      //alert ("Loged in!");
      var len = json.length -1;
      this.props.dispatch(ChangeUserId(json[len].id, json[len].group_id, json[len].admin));
      this.props.dispatch(ChangePage(4));
    } else {
      alert ("Something is wrong!");
    }
      
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleLanding}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Log In</Text>
        </View>
        
        <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
      <View style={styles.middleContainer}>
          
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
      
          <TouchableOpacity style={styles.loginBut} 
            onPress={this.handleProfile}>
            <Text style={styles.textBut}>Log In</Text>
          </TouchableOpacity>
      
        </View>
                             </ScrollView>

              </KeyboardAvoidingView>
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
    fontFamily: 'Raleway-Regular',
  },
  
   middleContainer: {
    marginTop:50,
    alignItems: 'center',
  },
    
    KeyboardView: {
    position:'absolute',
        width:'300%',
    bottom:20,
    flex:1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
   // backgroundColor:'red',
    zIndex:-1,
    height:'70%'
        
  },
  textLabel: {
    color: '#4d4d4d',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 15,
    marginBottom: -5,
    fontFamily: 'Raleway-Regular',
  },
  
  textInput: {
    color: '#4d4d4d',
    fontSize: 15,
    height: 60,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'Raleway-Regular',
    
  },
  
    loginBut: {
    marginTop: 70,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(11, 51, 40, 0.91)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    },
  
    textBut: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    admin:parseInt(state.Page.admin)
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Login);