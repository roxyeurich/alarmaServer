import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font } from 'expo';


class JoinG extends React.Component {
  
    handleChooseG=()=>{
      this.props.dispatch(ChangePage(7));
    }
    
//DATABASE**********************
  passcode = "";

    constructor(props) {
      super(props);
      this.state = { text: this.setState.text };
  }
  
    handleProfile=async ()=>{
    if (this.passcode == ''){
      alert("Please fill the inputs with your info");
      return false;
    }
    //this.props.dispatch(ChangePage(4));
      var fd= new FormData();
      fd.append("passcode", this.passcode);
      fd.append("userid", this.props.userid);
    
    var resp=await fetch("https://alarmaproj2.herokuapp.com/joingroup.php", {
      method:"POST",
      body:fd
    });
    
    //console.log(resp);
    var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        //json[0].id
      //alert ("Joined Group!");
      this.props.dispatch(ChangeUserId(this.props.userid, json.id));
      this.props.dispatch(ChangePage(4));
    } else {
      alert ("Something is wrong!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleChooseG}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Join Group</Text>
        </View>
        
      <View style={styles.middleContainer}>
        <Text style={styles.textLabel}>Enter Group Pin number:</Text>
        
        <TextInput autoCapitalize="none" autoCorrect={false}
          underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => this.passcode=text}
        />
        
      
          <TouchableOpacity style={styles.joinBut} 
            onPress={this.handleProfile}>
            <Text style={styles.textBut}>Join Group</Text>
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
    justifyContent: 'flex-start',
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
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
   middleContainer: {
    marginTop:80,
    alignItems:'center',
  },
  
  textLabel: {
    color: '#4d4d4d',
    fontSize: 20,
    marginTop: 70,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
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
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
  joinBut: {
    marginTop: 70,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(11, 51, 40, 0.91)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    userid:state.Page.userid
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(JoinG);