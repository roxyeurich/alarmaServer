import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient} from 'expo';
// npm install react-native-dialogbox --save;
//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';

// npm install react-native-table-component
// https://www.npmjs.com/package/react-native-table-component
import NavBar from './NavBar'

class GroupP extends React.Component {
  
  
    handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
    
  };
  
// FETCH DATA FOR THE TASKS*************
  
  state={
    userid:[],
    gname:[],
    pin:[],
    score:[],
    group_id:"",
    group_name:"",
    passcode:"",
    image:null,
  }
    componentWillMount=()=>{
    this.handleUsers();
    //this.handlePoints();
    this.handleGroupName();
    this.handleGroupPin();
  }
    
    handleCamera=()=>{
this.props.dispatch(ChangePage(13));
}


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
//      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
//      var snapshot = await ref.put(blob, 'image/jpg');
//      console.log("fin");

      
    }
  };
    
  handleUsers=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
      console.log(this.props.group_id);
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUsers.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          userid:json
        });
      } else {
        
      }
    console.log(userid);
  };

 handlePoints=async ()=>{
    var fd= new FormData();
      fd.append("user_id", this.props.userid);
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getPoints.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          score:json
        });
      } else {
        
      }
    console.log(score);
  };


  handleGroupName=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
    
    var resp=await
    fetch("https://alarmaproj2.herokuapp.com/getGroupName.php", {
      method:"POST",
      body:fd
    });
    
    var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          gname:json[0].group_name
        });
      } else {
        
      }
    
    console.log(gname);
  };

  handleGroupPin=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
    
    var resp=await
    fetch("https://alarmaproj2.herokuapp.com/getGroupName.php", {
      method:"POST",
      body:fd
    });
    
    var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          pin:json[0].passcode
        });
      } else {
        
      }
    
    console.log(pin);
  };
    

  alertIndex(index) {
    Alert.alert(
        

  'Task Title',
  'Task Description',
  [
    {
      text: 'Done task',
      onPress: () => console.log('Done Pressed'),
      style: 'cancel',
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
    },
  ],               
               
               );
  }


      render(){
        const state = this.state;
        var allusers=this.state.userid.map((obj, index)=> {
          return (
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
                <Text>{obj.username}</Text>
            </TouchableOpacity>
          )
        })  
        
        var allpoints=this.state.score.map((obj, index)=> {
          return (
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
                <Text>{obj.score}</Text>
            </TouchableOpacity>
          )
        })
          
        return ( 
                    
      <View style={styles.container}>
             
            <View style={styles.containerTop}>
               
                {/*-- Back button +  Name of the page + Icon */}
                <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>
                    <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
                </TouchableOpacity>
                
                <Text style={styles.title}>{this.state.gname}</Text>
            </View>

            <View style={styles.groupBox}>
            <TouchableOpacity onPress={this._pickImage}>
              <Image 
                   source={(this.state.image) ? {uri:this.state.image} : require('../Content/Imgs/family.jpeg')}
                    style={styles.groupPhoto}
                    resizeMode="cover"
                    
                />
               </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.textBtn}>Group Passcode: {this.state.pin}</Text>
                </TouchableOpacity>
            </View>
             
            <View style={styles.groupMembers}>
              <Text style={styles.membersText}>{allusers}{'\n'}</Text>
            </View>
            
//            <View style={styles.groupPoints}>
//              {allpoints}
//            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff',
  },
  
  groupMembers: {
    left:50,
    position:'relative',
    backgroundColor:'#ffffff',
    borderRadius:10,
    width:100,
    height:300,
    top:10,
    zIndex:0,
    padding:30,
  },
  
  groupPoints: {
    left:170,
    position:'relative',
    flex:1,
    flexDirection:'row',
    backgroundColor:'#ffffff',
    borderRadius:10,
    width:100,
    height:300,
    zIndex:0,
    padding:30,
  },
  
  membersText: {
    fontSize:50,
    flexDirection:'column',
    zIndex:2,
  },
    
  text: { 
    margin: 6,
    textAlign: 'center',
  },
    
  row: { 
    flexDirection: 'row', 
    backgroundColor: '#E0E8F5',
    height: 50,
    borderColor: '#CEDBEB',
    borderWidth:3
  },
    
  btn: { 
    width: 60, 
    height: 30, 
    backgroundColor: '#F2F6F9',  
    borderRadius: 5,
    borderColor: '#4B7CB0',
    borderWidth:1,
  },   
    
  textBtn: { 
    height: 25,
    width:230,
    color:'#49CBC6',
    fontSize:20,
    position:'relative',
    left:125,
    top:-30,
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
    
  dialogBox: {
    position: 'absolute',
    top:0,
    left:34.5,
    marginLeft:0,
    marginTop: 0,
    width: 30,
    height: 30,
  }, 
  
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
  },
  
  hamMenu: {
    marginRight:20,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  groupBox: {
      bottom: 20,
    },
    
  groupPhoto: {
    marginTop: 10, 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderColor: '#49CBC6',
    borderWidth:2,
    top: 20,
    alignSelf: 'stretch',
    marginLeft: 35,
      },
  
    
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid,
    gname:state.Page.gname,
    group_name:state.Page.group_name,
    passcode:state.Page.passcode,
    score:state.Page.score,
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(GroupP);