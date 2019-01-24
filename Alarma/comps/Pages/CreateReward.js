import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, DatePickerIOS, KeyboardAvoidingView,ScrollView  } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class CreateReward extends React.Component {

  reward_title = "";
  reward_points= 0;
  
  


    constructor(props) {
      super(props);
      this.state = { 
        text: this.setState.text,
      };
  }

  
    handleCreateR=async ()=>{
    if (this.reward_title == '' || this.reward_points == ''){
      alert("Please fill in the inputs");
      return false;
    }
   
    var fd= new FormData();
      fd.append("reward_title", this.reward_title);
      fd.append("reward_points", this.reward_points);
      fd.append("group_id", this.props.group_id);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/createReward.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json === true) {
        
        //alert ("Reward Created");
        this.props.dispatch(ChangePage(15));
        
      } else {
        alert ("Something went wrong!");
      }
    }
  
  handleBack=()=>{
    this.props.dispatch(ChangePage(16));
  }
  
  

  render() {
    //alert(this.props.group_id);
    return (
      
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleBack}>
            <Image style={styles.backImg} 
              source={require('../Content/icons/PNG/leftarrow.png')} 
            />
          </TouchableOpacity>
          <Text style={styles.title}>Create Reward</Text>
        </View>

        <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
        <View style={styles.middleContainer}>
          <Text style={styles.textLabel}>Reward name</Text>

          <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => this.reward_title=text}
          />

          <Text style={styles.textLabel}>Total points to be reached</Text>

          <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => this.reward_points=text}
          />
          
          <TouchableOpacity style={styles.createRBut} 
            onPress={this.handleCreateR}>
            <Text style={styles.textBut}>Create Reward Meta</Text>
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
  
  KeyboardView: {
    position:'absolute',
    bottom:20,
    flex:1,
    width:'300%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor:'red',
    zIndex:-1,
    height:'70%'
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
    //fontFamily: 'Raleway',
    fontFamily: 'NunitoSans-Regular',
  },
  
  middleContainer: {
   marginTop: 5,
   alignItems: 'center',

  },
  
   textLabel: {
    color: '#4d4d4d',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 40,
    marginBottom: -5,
    //fontFamily: 'Raleway',
    fontFamily: 'NunitoSans-Regular',
  },
  
    labelContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
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
    fontFamily: 'NunitoSans-Regular',
  },
  
    textInput2: {
    color: 'black',
    fontSize: 15,
    height: 120,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
    //fontFamily: 'Raleway',
  },
  
    createRBut: {
    marginTop: 55,
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
export default connect(mapStateToProps)(CreateReward);
