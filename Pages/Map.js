import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, Switch } from 'react-native';
import {LinearGradient} from 'expo';
import NavBar from './NavBar';

import { MapView } from 'expo';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class Map extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      value: false
    };
 }
  
  state={
    
    initialPosition:{
               latitude: 49.2485,
               longitude: -123.0014,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421},
    
    address:"",
    un:"",
    scoreT:0,
  };


  componentWillMount=()=>{
    this.handleProfile();
    this.handleScore();
    //alert(this.props.group_id);
  }

  handleLanding=()=>{
    this.props.dispatch(ChangePage(0)); 
  }
    
  handleCTask=()=>{
    this.props.dispatch(ChangePage(10));
  }
      
  handleAtHome=(value)=>{
    this.props.dispatch(ChangePage(12));
  }
      
  handleProfile=async ()=>{
    var fd= new FormData();
      fd.append("id", this.props.id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUser.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Account Created");
        this.setState({
          address:json[0].location_main,
          un:json[0].username
        })
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
    if (json.length > 0) {
      //json[0].id
      //alert ("Loged in!");
       this.setState({
          scoreT:json[0].score
        })
    } else {
      alert ("Something is wrong!");
    }
 
}

  render() {
    return (
          <View  style={styles.container}> 
         <LinearGradient   colors={['#49CBC6', '#4B7CB0']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
          
           <View style={styles.profileBox}>
              <Text style={styles.title}>
                Profile: {this.state.un}
              </Text>

              <Image 
                    source={require('../Content/Imgs/ProfilePic.jpg')}
                    style={styles.profilePhoto}
                    resizeMode="cover"
              />
            </View>
          
          <View style={styles.scoresCont}>
            <TouchableOpacity style={styles.score}>
              <Text style={styles.textScore}>Total {"\n"} {this.state.scoreT}</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.score}> 
              <Text style={styles.textScore}>Weekly {"\n"} 50</Text>
            </TouchableOpacity>
          </View>
           
           <View style={styles.switchCont}>
             
              <Text style={styles.textatHome}>At Home</Text>
              <Switch
              style={styles.toogle}
              value={ this.state.value }
              onValueChange={(value) => this.handleAtHome({value: true})}
              />
           </View>
    
            <MapView
                style={styles.map}
                initialRegion={this.state.initialPosition}
                region={this.state.initialPosition}>
            </MapView>
            
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Current Address:{this.state.address}</Text>
              
            </View>
             
            <NavBar />
           
        </LinearGradient>
      </View>
      

    );
  }
}


const styles = StyleSheet.create({
    
    profileBox: {
      alignItems: 'center',
      alignSelf: 'stretch',
      bottom: 20,
    },
    
    locationContainer: {
      top:60,
      width:280,
    },
  
  
    map: {
      width:280, 
      height:280,
      margin: 30,
      top:-120,
    },
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      },
  
    scoresCont: {
      top:15,
      right:20,
      flex:1,
      flexDirection: 'column',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
    },
  
    score: {
      width:90,
      height:45,
      marginTop:-40,
      padding:2,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 50,
      borderColor:'#49CBC6',
      borderWidth:2,
      margin:55,
      left:7,
      top: -110,
},
  
    title: {
      marginTop: 45,
      fontSize: 22,
//      left: 95,
      color: 'white',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'center',//or 'stretch' to put on left side
//      textAlign: 'left',
      marginBottom: -10,
      //fontFamily: 'Raleway',
      },
  
    profilePhoto: {
      width: 150, 
      height: 150, 
      borderRadius: 75, 
      borderColor: '#49CBC6',
      borderWidth:2,
      top: 20,
      alignSelf: 'stretch',
      marginLeft: 70,
      },
  
    toogle: {
      alignSelf:'center',
      shadowColor: 'rgba(0,0,0, .6)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 0.5, // IOS
      shadowRadius: 5, //IOS
      elevation: 2, // Android
      transform: [{ scaleX: .8 }, { scaleY: .8 }],
      },

    textBut: {
      fontSize: 20,
      color: 'white',
      //fontFamily: 'Raleway',
      },
  
    textScore: {
      fontSize: 12,
      color: 'white',
      textAlign:'center',
      paddingTop:4,
      //fontWeight: 'bold', //OPTIONAL
      //fontFamily: 'Raleway',
      },
  
  
    textatHome:{
      fontSize: 15,
      color: 'white',
      textAlign:'center',
      marginTop:18,
      right:3,
      },
  
    switchCont: {
      flex:1,
      flexDirection:'row',
      top:-85,
      left:80,
      zIndex:10,
      width:100,
      },

    locationText: {
      height:50,
      fontSize: 15,
      color: 'white',
      justifyContent: 'center',
      borderColor:'#49CBC6',
      borderWidth:2,
      marginTop: -195,
      borderRadius: 15,
      padding:5,
      },
});




function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid,
    group_id:state.Page.group_id,
    
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Map);