import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, DatePickerIOS,  ScrollView, KeyboardAvoidingView   } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';
import { Rating } from 'react-native-ratings';

import { Asset, Font } from "expo";

class CreateTask extends React.Component {

  task_title = "";
  task_description = "";
  rating=0;
  end_time="";
  


    constructor(props) {
      super(props);
      this.state = { 
      date:"2018-12-01",
      };
  }

  
    handleProfile=async ()=>{
    if (this.task_title === '' || this.task_description === '' || this.date === '' || this.rating === 0){
      alert("Please fill in the inputs");
      return false;
    }
   
    var fd= new FormData();
      fd.append("task_title", this.task_title);
      fd.append("task_description", this.task_description);
      fd.append("end_time", this.state.date+" 00:00:00");
      fd.append("score", this.rating);
      fd.append("group_id", this.props.group_id);

      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/createTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json === true) {
        
        //alert ("Task Created");
        this.props.dispatch(ChangePage(6));
        
      } else {
        alert ("Something went wrong!");
      }
    }
  
  handleBack=()=>{
    this.props.dispatch(ChangePage(16));
  }
  
  
  
  ratingCompleted=(rating)=> {
  this.rating = rating;
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
          <Text style={styles.title}>Create Task</Text>
        </View>
        
        <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
        <View style={styles.middleContainer}>
          <Text style={styles.textLabel}>Title</Text>

          <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => this.task_title=text}

          />
          <Text style={styles.textLabel}>Due Date</Text>

        <DatePicker
            style={{width: 300, marginTop:15,marginBottom:5          
                   }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-12-01"
            maxDate="2031-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: -5,
                marginLeft: 0,
                marginTop:10
                },
                dateInput: {
                marginLeft: 36,
                borderColor: '#49CBC6',
                borderRadius: 8,
                height:50,
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          <Text style={styles.textLabel}>Description</Text>

          <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
            style={styles.textInput2}
            onChangeText={(text) => this.task_description=text}
              multiline = {true}
              maxLength={255}
              numberOfLines ={6}
          />
   
    <Text style={styles.textLabel}>Score</Text>
       <Rating
           type="custom"
           ratingColor='#49cbc6'
           ratingBackgroundColor='#c8c7c8'
            startingValue={0}
            ratingCount={5}
            imageSize={30}
            onFinishRating={this.ratingCompleted}
            onStartRating={this.ratingStarted}
            style={{ paddingVertical: 10 }}
          /> 

          <TouchableOpacity style={styles.loginBut} 
            onPress={this.handleProfile}>
          <Text style={styles.textBut}>Create Task</Text>
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
    //fontFamily: 'Raleway-Regular',
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
    marginTop: 10,
    marginBottom: -5,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
    labelContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  
    textInput: {
    color: '#4d4d4d',
    fontSize: 15,
    height: 50,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 6,
    textAlign: 'left',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
   textInput2: {
    color: '#4d4d4d',
    fontSize: 15,
    height: 100,
    width: 300,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 6,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
    loginBut: {
    marginTop: 10,
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
    group_id:state.Page.group_id
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(CreateTask);