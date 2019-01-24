import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, Switch, AsyncStorage } from 'react-native';
import NavBar from './NavBar';
import HamMenu from './HamMenu';
import AlertLocation from './AlertLocation';
import ABox from './AlertBox';
 import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient} from 'expo';
import LottieView from 'lottie-react-native';
import firebase from 'firebase';
//import firebase from 'react-native-firebase';
//import RNFetchBlob from 'react-native-fetch-blob';
//
//const Blob = RNFetchBlob.polyfill.Blob;
//const fs = RNFetchBlob.fs
//window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//window.Blob = Blob
var config = {
  storageBucket: "alarma-221801.appspot.com"
};
var fbapp = firebase.initializeApp(config);
var storageRef = firebase.storage().ref();

 class Profile extends React.Component {
  
  nextlvl = null;
  home = "";
  atHome = 2;
  avatar = "";
  state={
    
    initialPosition:{
               latitude: 49.2485,
               longitude: -123.0014,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421},
    
    address:"",
    un:"",
    scoreT:0,
    lvlTitle:"",
    value:null,
    //image: "",
    image: this.props.avatar,
    location: null,
    errorMessage: null,
    alertOpacity:0,
    opacityChange:1,
  };
   componentWillMount=async()=>{
    
    var { status } = await Permissions.askAsync(Permissions.CAMERA);
    var { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  
    //
    try {
      const value = await AsyncStorage.getItem('nextlvl');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.nextlvl=parseInt(value);
      } else {
        await AsyncStorage.setItem('nextlvl', "50")
      }
    } catch (error) {
     // Error retrieving data
      console.log(error);
    }
    
    this.handleProfile();
    this.handleScore();
    //alert(this.props.group_id);
    
    
    
    //current location
   
  }
   handleLanding=()=>{
    this.props.dispatch(ChangePage(0)); 
  }
    
  handleCTask=()=>{
    this.props.dispatch(ChangePage(10));
  }
      
  handleAtHome=async (id)=>{
    this.props.dispatch(ChangePage(11));
    
  }
  
  handleAlert=async ()=>{
    var fd= new FormData();
     //change id to group_id
      fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        var str = json.map((obj)=>{
          return obj.task_title;
        });
        alert("You are home! Here are your list of tasks:" + str.join("\n"));
        
      } else {
        
      }
  }
   
      
  handleProfile=async ()=>{
    
    var fd= new FormData();
      fd.append("id", this.props.id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUser.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log("user",json);
      if (json.length > 0) {
        //json.id 
        //alert ("Account Created");
       var resp=await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&fields=geometry&inputtype=textquery&input="+json[0].location_main);
       var json2=await resp.json();
        console.log(json2);
        
        var initialPosition={
               latitude: json2.candidates[0].geometry.location.lat,
               longitude:  json2.candidates[0].geometry.location.lng,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421}
       
        
        this.setState({
          address:json[0].location_main,
          un:json[0].username,
          initialPosition:initialPosition,
        })
        
         let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
      let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        lat_difference= Math.abs(location.coords.latitude - initialPosition.latitude)
        
        long_difference= Math.abs(location.coords.longitude - initialPosition.longitude)
        
        console.log(lat_difference, long_difference);
        
//real distance
        if(lat_difference < 0.004 && long_difference < 0.004){
          //this.handleAlert();
          
          <AlertLocation/>
        }
          
        
        var fd= new FormData();
        fd.append("user_id", this.props.id);
        fd.append("latitude", location.coords.latitude);
        fd.append("longitude", location.coords.longitude);
          
        var resp=await fetch("https://alarmaproj2.herokuapp.com/UpdateLocation.php", {
          method:"POST",
          body:fd
        });
          console.log(resp);
//for testing
//          if(lat_difference < 0.08 && long_difference < 0.08){
//            this.handleAlert();
//        }
        /*
        get your geolocation latitude and longitude
        lat_difference= Math.abs(myLatitude - initialPosition.latitude)
        
        lng_difference= Math.abs(myLng - initialPosition.longitude)
        
        if(lat_difference < 0.0001 && lng_difference < 0.0001){
          alert(whatever)
        }
        */
      } else {
        
      }
  }
  
  handleScore=async ()=>{
    
    var fd= new FormData();
      fd.append("id", this.props.id);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getScore.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    console.log(json);
    var score = 0;
    if (json.length > 0) {
      score = parseInt(json[0].score);
      //json[0].id
      //alert ("Loged in!");
       this.setState({
          scoreT:json[0].score,
        })
     } else {
      alert ("Something is wrong!");
    } 
    
      var newlvl = false;
      console.log(score, this.nextlvl);
    if (score > this.nextlvl && this.nextlvl != null){
        alert("You've reached a new level!");
        //this.props.dispatch(ChangePage(17));
        newlvl = true;
      }
    
    if(score === null){
      this.setState({
        lvlTitle:'Recruit'
      })
    } else if(score >= 0 && score < 50){
      this.setState({
        lvlTitle:'Learner'
      })
      if (newlvl === true){
        await AsyncStorage.setItem('nextlvl', "50")
      }
    } else if(score >= 50 && score < 100){
      this.setState({
        lvlTitle:'Apprentice'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "100")
        }
    } else if(score >= 100 && score < 250){
      this.setState({
        lvlTitle:'Officer'
      })
        if (newlvl === true){
            await AsyncStorage.setItem('nextlvl', "250")
          }
    } else if(score >= 250 && score < 500){
      this.setState({
        lvlTitle:'Intermediate'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "500")
        }
    } else if(score >= 500 && score < 1000){
      this.setState({
        lvlTitle:'Elite'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "1000")
        }
    } else if(score >= 1000 && score < 2000){
      this.setState({
        lvlTitle:'Master'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "2000")
        }
    } else if(score >= 2000 && score < 2500){
      this.setState({
        lvlTitle:'Senior'
      })
 
}
  }
   handleSettings=()=>{
    
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
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      });
       console.log("blob", blob);
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
        console.log("ref", ref);
        try {
          var snapshot = await ref.put(blob, {contentType:"image/jpg"});
          console.log(snapshot)
          var url = await snapshot.ref.getDownloadURL();
          
          console.log(url);
          //update user avatar in mysql
          
          var fd= new FormData();
          fd.append("user_id", this.props.id);
          fd.append("avatar", url);

          var resp=await fetch("https://alarmaproj2.herokuapp.com/avatar.php", {
            method:"POST",
            body:fd
          });

          var json=await resp.json();
          //setState for the image
          this.setState({
          image:url,
        })
          
        } catch(err) {
          console.log(err)
        }
       //console.log("snap", snapshot);
//      console.log("fin");
       
    }
  };
 handleOpacity=()=>{
  this.setState({
    alertOpacity:this.state.opacityChange
  })
}
   render() {
    return (
          <View  style={styles.container}> 
         <LinearGradient   colors={['#49CBC6', '#4B7CB0']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
          
         
            <View style={styles.topNav}> 
              
            </View>
           <View style={styles.profileBox}>
              <Text style={styles.title}>
                {this.state.un}
              </Text>
            <TouchableOpacity style={styles.touchPic}
             onPress={this._pickImage}>
            
              <Image 
                    source={(this.state.image) ? {uri:this.state.image} : require('../Content/Imgs/ProfilePic.png')}
                    style={styles.profilePhoto}
                    resizeMode="cover"
              />
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchPic}
                onPress={this._pickImage}>
              <LottieView
                source={require('../Content/Imgs/cam.json')}
                style={styles.lottietwo}
                autoPlay
                loop
              />
            </TouchableOpacity>
            </View>
          
          <View style={styles.scoresCont}>
            <TouchableOpacity style={styles.score}>
              <Text style={styles.textScore}>Total {"\n"} {(this.state.scoreT)?this.state.scoreT : 0}</Text>
            </TouchableOpacity>
          </View>
            
            <View style={styles.lvlCont}>
             <TouchableOpacity style={styles.touchPic}
                onPress={this._pickImage}>
              
            </TouchableOpacity>
              <Text style={styles.lvlText}>Level: {(this.state.lvlTitle)? this.state.lvlTitle : 'Recruit'}</Text>
              <LottieView
                source={require('../Content/Imgs/star.json')}
                style={styles.lottie}
                autoPlay
                loop
              />
           </View>
           
{/*<View style={styles.switchCont}>
             
              <Text style={styles.textatHome}>Home</Text>
              <Switch
              style={styles.toogle}
              value={ this.state.value }
              onValueChange={(value) => this.handleAtHome({value: true})}
              />
           </View>*/}
    
            <MapView
                style={styles.map}
                initialRegion={this.state.initialPosition}
                region={this.state.initialPosition}>
            
           <MapView.Marker
             coordinate={this.state.initialPosition}
             title={"Home"}
             description={this.state.address}
             />
           
           </MapView>
           
            
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Current Address: {this.state.address}</Text>
              
            </View>
                <HamMenu />

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
  
   
  lottie: {
    width:50, 
    height:50, 
    top:-5, 
    left:0,
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 0.5, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
    zIndex:-100,
  },
   
  lottietwo: {
    width:130, 
    height:130, 
    top:-25, 
    left:35,
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
   // shadowOpacity: 0.5, // IOS
   // shadowRadius: 0.5, //IOS
    elevation: 2, // Android
    zIndex:1,
  },
    
  locationContainer: {
    top:70,
    width:280,
    height:'auto',
    top:60,
    
  },

  topNav: {
    position: "absolute",
    top:10,
    right: 50,
    height: 50,
    width:50,
  //  shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 0.5, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },

  touch: {
    width: 100,
    height: 100,
    zIndex: 15,
    bottom: 0,
    marginBottom: 0,
  },



  img: {
    width: 45,
    height: 45,
    margin: 10,
    position:'absolute',
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
   // shadowOffset: { height: 1, width: 1 }, // IOS
   // shadowOpacity: 0.5, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },

  scoresCont: {
    top:-100,
    right:30,
    flex:1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 0.5, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },

  rewardCont: {
    width:50,
    height:50,
    top:-120,
    justifyContent: 'center',
    alignItems: 'center',
  },


  score: {
    width:52,
    height:52,
    //marginTop:-40,
    padding:1,
    //justifyContent:'center',
    //alignItems:'center',
    borderRadius: 10,
    borderColor:'#fff',
    borderWidth:1,
    //margin:80,
    right:290,
    bottom: 237,
},

 editP: {
     width: 35, 
     height: 35, 
     borderRadius: 5, 
     borderColor: '#FFF',
     position:'absolute',
     top: 100,
     left:10,
     alignSelf: 'stretch',
     marginLeft: 70,
     backgroundColor:'rgba(255, 255, 255, 0.6)',
     },

  reward: {
     width: 70, 
     height: 70, 
     borderRadius: 5, 
     borderColor: '#FFF',
     position:'absolute',
    },


/*
  switchCont: {
    flex:1,
    flexDirection:'row',
    top:-220,
    left:77,
    zIndex:10,
    width:100,
    justifyContent: 'center',
    },

  toogle: {
    //alignSelf:'center',
    shadowColor: 'rgba(0,0,0, .6)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 5, //IOS
    elevation: 2, // Android
    transform: [{ scaleX: .8 }, { scaleY: .8 }],
    bottom:105,
    left:15,
    },

  textatHome:{
    fontSize: 15,
    color: 'white',
    textAlign:'center',
    marginTop:-76,
    right:-62,
    fontFamily: 'Raleway-Regular',
    }, */
   
   textBut: {
    fontSize: 25,
    color: 'white',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    },

  textScore: {
    fontSize: 14,
    color: 'white',
    margin:1,
    padding:2,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    textAlign:'center',
    //fontWeight: 'bold', //OPTIONAL

    },
  
  profileBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 20,
    },
  
   touchPic: {
    right: 40,
    top: 30,
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 0.5, // IOS
   // shadowRadius: 0.5, //IOS
    elevation: 2, // Android
    },
    
  title: {
    marginTop: 45,
    fontSize: 24,
//  left: 95,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',//or 'stretch' to put on left side
//  textAlign: 'left',
    marginBottom: -10,
//  fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  //  shadowColor: 'rgba(33, 11, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 1, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
    },
 

  profilePhoto: {
    width: 180, 
    height: 180, 
    borderRadius: 90, 
    borderColor: '#49CBC6',
    borderWidth:2,
    bottom: -10,
    alignSelf: 'stretch',
    marginLeft: 70,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    },

  lvlCont: {
    width:160,
    height:40,
    bottom:80,
    left: 10,
    padding:4,
    zIndex:-21,
    flexDirection: 'row',
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
   // shadowOpacity: 0.5, // IOS
   // shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },

  lvlText:{
      position:'relative',
    fontSize: 18,
    fontWeight:'500',
    color: 'white',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    zIndex:-100,
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
   // shadowOffset: { height: 1, width: 1 }, // IOS
   // shadowOpacity: 0.5, // IOS
  //  shadowRadius: 0.5, //IOS
    elevation: 2, // Android
  },

  map: {
    width:280, 
    height:120,
    margin: 25,
    bottom:160,
    position:'absolute',
    borderRadius:10,
   // shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
  //  shadowOpacity: 0.5, // IOS
  //  shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
    
  locationText: {
    height:80,
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
    borderColor:'#49CBC6',
    borderWidth:2,
    marginBottom: 150,
    borderRadius: 15,
    padding:8,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  //  shadowColor: 'rgba(11, 28, 51, 0.6)',// IOS
  //  shadowOffset: { height: 1, width: 1 }, // IOS
   // shadowOpacity: 0.5, // IOS
   // shadowRadius: 0.5, //IOS
    elevation: 2, // Android
    },
    
});
 function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid,
    group_id:state.Page.group_id,
    avatar:state.Page.avatar
    
  }
 }
 //export after connecting to redux
export default connect(mapStateToProps)(Profile);