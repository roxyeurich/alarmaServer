import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import {MapView} from 'expo';


class CreateG extends React.Component {


handleChooseG=()=>{
  this.props.dispatch(ChangePage(7));
}
  
  handleCopy=()=>{

    }  
  
//DATABASE**********************
    group_name:"default";
    passcode: "default";

    adminNum="2";
  
  handleCreateG=async ()=>{
    
    
    var fd= new FormData();
      
      fd.append("group_name", this.group_name);
      fd.append("passcode", this.state.rannum);
      fd.append("userid", this.props.userid);
      fd.append("location", this.state.description);
    
    var resp=await fetch("https://alarmaproj2.herokuapp.com/group.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        if (this.props.admin === 1) { 
        admin=adminNum 
        }
        //alert ("Group Created");
        this.props.dispatch(ChangePage(4));
        this.props.dispatch(ChangeUserId(this.props.userid, json.id, json[0].admin));
        
        
      } else {
        alert ("Something went wrong!");
      }
  }
  
    componentDidMount=()=>{
    this.random();
  };

   state={
        predictions:[],
       description:"",
      show:false,
    }
  
    
handleTextInput= async(text)=>{
    this.setState({
      description:text
    })
    if(text.length < 5) {
      return false;
    }
        var resp = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&input="+text);
        console.log(resp);
        
        var json = await resp.json();
        this.setState({
          predictions: json.predictions,
          show:true
        });
        console.log(json);
    }
  
  random =()=>{
    var num ='';
      for (var i=0;i<6; i++){
         var t = 
        Math.round(
          Math.random()*9)
        num+= t
      }
    console.log(num); 
    this.setState({
      rannum:num
    });
  }
  
    handleTouchLoc=(obj)=>{
    this.setState({
      description:obj.description,
      show:false
    })
  }
  render() {
      
var allP = this.state.predictions.map((obj,index)=>{
      return(
        
        <TouchableOpacity key={index}
         onPress={this.handleTouchLoc.bind(this, obj)}
         >
          <Text> {obj.description} </Text>
        </TouchableOpacity>
      )
      
    })
    
    if(this.state.show === false) {
      allP = null;
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleChooseG}>
              <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Group</Text>
        </View>
        
        <View style={styles.middleContainer}>

        <TouchableOpacity style={styles.touch} onPress={this.handlePic}>
          <Image style={styles.cameraImg} source={require('../Content/icons/PNG/takepic.png')} />
        </TouchableOpacity>

        <TextInput underlineColorAndroid='transparent'
          style={styles.textInput}
          placeholder="Name The Group"
          onChangeText={(text) => this.group_name=text}
        />
        
        <Text style={styles.textLabel}>Click to copy the group ID:</Text>
        <TouchableOpacity style={styles.pinBut}
          onPress={this.handleCopy}>
          <Text style={styles.textBut}
          >{this.state.rannum}</Text>
          <Image style={styles.pinImg} source={require('../Content/icons/PNG/pin.png')} />
        </TouchableOpacity>
             <Text style={styles.textLabel}>Type in the location</Text>

            <TextInput underlineColorAndroid='transparent'
            style={styles.locText}
            onChangeText={this.handleTextInput}
            value={this.state.description}
            />
            
            {allP}
              
            <MapView
                style={styles.map}
                initialRegion={this.state.initialPosition}
                region={this.state.initialPosition}
                >
            </MapView>
            
        <TouchableOpacity style={styles.createG}
        onPress={this.handleCreateG}>
          <Text style={styles.textBut}>Create</Text>
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
  
  cameraImg: {
    marginLeft:0,
    marginTop: 20,
    width: 70,
    height: 50,
  },
  
  pinImg: {
    width: 30,
    height: 30,
    padding:2,
    marginLeft:180,
    marginTop:-25,
    zIndex: 1,
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
    marginTop:5,
  },
    
    map: {
      width:300, 
      height:140,
    position:'absolute',
        borderColor: 'red',
        borderRadius: 8,
        bottom:75,
        left:0
    },
  
  
  textLabel: {
    color: 'black',
    fontSize: 20,
      marginTop:-10
    //fontFamily: 'Raleway',
  },
  
  textInput: {
      position: 'absolute',
      top:15,
      right:0,
    color: 'black',
    fontSize: 15,
    height: 60,
    width: 215,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 0,
    borderColor: '#49CBC6',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 8,
    //fontFamily: 'Raleway',
  },  
    
    locText: {
    color: 'black',
    fontSize: 15,
    height: 60,
    width: 300,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#49CBC6',
    borderRadius: 8,
            marginTop: 5,


    //fontFamily: 'Raleway',
  },
  
  pinBut: {
    marginTop: 5,
    marginBottom: 30,
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
  
  createG: {
    marginTop: 170,
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
    userid:state.Page.userid,
    admin:state.Page.admin,
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(CreateG);