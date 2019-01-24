
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font} from 'expo';
import LottieView from 'lottie-react-native';
//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';
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
    initialPosition:{
       latitude: 49.2485,
       longitude: -123.0014,
       latitudeDelta: 0.1122,
       longitudeDelta: 0.021},
  }


    componentWillMount=()=>{
    this.handleUsers();
    //this.handlePoints();
    this.handleGroupName();
    this.handleGroupPin();
    this.handlePoints();
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
      //console.log(resp);
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
    /*var fd= new FormData();
      fd.append("user_id", this.props.userid);
      fd.append("group_id", this.props.group_id);
    var resp=await fetch("http://localhost:8888/alarma_DB/getPoints.php", {
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
    console.log(score);*/
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



SortArray=async (getScore)=>{
  sortedScore = getScore;
  
  sortedScore.sort(this.sortByScore);
  //sortedScore.reverse();
  
  //sortedScore = obj;
  return sortedScore;
}

sortByScore=(a, b)=>{
  if (parseInt(a.score) > parseInt(b.score)){
    return -1;
  }
  if (parseInt(a.score) < parseInt(b.score)){
    return 1;
  }
    return 0;
}


      render(){
        const state = this.state;
        var markers = [];
        
        //sort before map
        var sortedScore = this.SortArray(this.state.userid);
        
        var allusers=this.state.userid.map((obj, index)=> {
          
          if(obj.latitude){
            console.log(obj.latitude, obj.longitude);
            var comp = (
              <MapView.Marker
               coordinate={{
                latitude: obj.latitude,
                longitude: obj.longitude,
                latitudeDelta: 0.9122,
                longitudeDelta: 0.421
              }}
               title={obj.username}
               description="test"
                />
            );
            markers.push(comp)
          }
          
          
          return (
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
              <View style={styles.usersTxt}>
                <Text style={{fontFamily: 'NunitoSans-Regular', color:'#6f6f6f', fontSize:20,}}>{(obj.score)? obj.score : 0} </Text>
                <Text style={{fontFamily: 'NunitoSans-Regular', color:'#6f6f6f', fontSize:20,}}>{"  "}{obj.username}</Text>
              </View>
            </TouchableOpacity>
          )
        })
        
        //console.log(markers);
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
                    <Text style={styles.textBtn}>Group Pin: {this.state.pin}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.groupMembers}>
                  <Text style={styles.scoreTxt}> Scoreboard </Text>
                  {allusers}
                   <LottieView
                  source={require('../Content/Imgs/trophy.json')}
                    style={{width:40, height:40, top:-24, left:-30, shadowColor: 'rgba(33, 11, 51, 0.85)',// IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 0.5, // IOS
                    shadowRadius: 0.5, //IOS
                    elevation: 2, // Android
                  }}
                  autoPlay
                  loop
                />
              </View> 

              <View>
               <Text style={styles.locText}>Users location</Text>
                <MapView
                  style={styles.map}
                  initialRegion={this.state.initialPosition}
                  region={this.state.initialPosition}>
                >
                    {markers}
                 title={"test2"}
                 description="test2"
                  />
                </MapView>
              </View>          
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
  
  groupMembers: {
    alignItems:'center',
    position:'absolute',
    //backgroundColor:'rgba(100,100,225,0.05)',
    width:130,
    height:135,
    top:10,
    alignSelf:'center',
    zIndex:5,
  },
  
  membersText: {
    fontSize:20,
    zIndex:2,
    position:'absolute',
    color:'#4B7CB0',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
    
  text: { 
    margin: 6,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
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
    position:'absolute',
    right:0,
    top:-10,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
    
containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
  middleContainer: {
    marginTop:20,
    padding:10,
    height:'70%',
    width:'100%',
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
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
  hamMenu: {
    marginRight:20,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  groupBox: {
    bottom: 20,
    width:'100%',
    },
    
  groupPhoto: {
    marginTop: 10, 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderColor: '#49CBC6',
    borderWidth:2,
    top: 40,
    alignSelf: 'stretch',
    left:'10%',
    shadowColor: 'rgba(11, 51, 51, 0.85)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },
  
  map: {
    width:280, 
    height:150,
    margin: 25,
    top:1,
    borderRadius:10,
    alignSelf:'center',
    shadowColor: 'rgba(11, 45, 51, 0.85)',// IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },
  
  locText: {
    color: '#49CBC6',
    marginTop: 150,
    fontSize: 20,
    textAlign: 'center',
  },
  
  scoreTxt: {
    color: '#49CBC6',
    fontSize: 20,
    textAlign: 'center',
  },
  
  usersTxt: {
    marginTop:5,
    textAlign: 'center',
    flexDirection: "row",
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