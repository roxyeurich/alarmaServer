import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, DatePickerIOS  } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';
import { Rating } from 'react-native-elements';

import AlertBox from './AlertBox';

class CreateTask extends React.Component {

  task_title = "";
  task_description = "";
  rating=0;
  end_time="";
  


    constructor(props) {
      super(props);
      this.state = { 
        text: this.setState.text,
        date:"2018-05-15",
      };
  }

  
    handleProfile=async ()=>{
    if (this.task_title.lenght == 0 || this.task_description.lenght ==0){
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
    this.props.dispatch(ChangePage(4));
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
        
        <View style={styles.middleContainer}>
          <Text style={styles.textLabel}>Title</Text>

          <TextInput underlineColorAndroid='transparent'
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
            minDate="2018-01-01"
            maxDate="2031-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
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

          <TextInput underlineColorAndroid='transparent'
            style={styles.textInput2}
            onChangeText={(text) => this.task_description=text}
              multiline = {true}
              maxLength={255}
              numberOfLines ={6}
          />


       <Rating
           type="star"
           ratingColor='#3498db'
           ratingBackgroundColor='#c8c7c8'
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
    //fontFamily: 'Raleway',
  },
  
  middleContainer: {
   marginTop: 5,
   alignItems: 'center',
  },
  
   textLabel: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: -5,
    //fontFamily: 'Raleway',
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
  
    loginBut: {
    marginTop: 15,
    alignItems: 'center',
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
export default connect(mapStateToProps)(CreateTask);