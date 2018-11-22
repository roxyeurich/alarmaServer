import React from 'react';
import { StyleSheet, Text, View, Button, Slider, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {Camera, Permissions, LinearGradient} from 'expo';
import Profile from "./Profile";

import {connect} from 'react-redux';
import {ChangePage, ChangeAvatar} from '../../redux/actions';

class NavBar extends React.Component {

  
state={
    pages: null,
}

ChangeAvatar=(avatar)=>{
      this.setState({
        avatar:avatar
        
    })
}

ChangePage=(page)=>{
    this.setState({
        pages:page
        
    })
}

handleProfile=()=>{
    this.props.dispatch(ChangePage(4)); 
  }

handleTaskPage=()=>{
    this.props.dispatch(ChangePage(6)); 
  }

handleNotifications=()=>{
    this.props.dispatch(ChangePage(11)); 
  }

handleCTask=()=>{
    this.props.dispatch(ChangePage(10)); 
  }

handleGroupP=()=>{
    this.props.dispatch(ChangePage(12)); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbox}>
            
          <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>   
            <Image 
                source={(this.state.avatar) ? {uri:this.state.avatar} : require('../Content/icons/PNG/profileIcon.png')}
                style={styles.profilephoto}
                resizeMode="cover"
            />
          </TouchableOpacity>
          
            <TouchableOpacity style={styles.touch} onPress={this.handleTaskPage}>
                <Image style={styles.img }
                        source={require('../Content/icons/PNG/task.png')}
                        />
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={this.handleNotifications}>
                <Image style={styles.img }
                        source={require('../Content/icons/PNG/noti.png')}
                        />
              </TouchableOpacity>
          
            <TouchableOpacity style={styles.touch} onPress={this.handleGroupP}>
                <Image style={styles.imgG }
                        source={require('../Content/icons/PNG/group.png')}
                        />  
              </TouchableOpacity>
            
            <TouchableOpacity style={styles.touch} onPress={this.handleCTask}>
                <Image style={styles.imgAdd}
                        source={require('../Content/icons/PNG/addButt.png')}
                        />  
              </TouchableOpacity>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom:-2,
    left:-20,
    alignSelf:'stretch',
    height: 70,
  },
  
  navbox: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft:21,  
    backgroundColor:"rgba(73, 203, 198,0.3)",
  }, 
  
  profilephoto: {
    width: 45,
    height: 45,
    borderRadius: 24,
    borderColor:'#49CBC6',
    borderWidth:3,
    bottom: -9,
    left:20,
    
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 15,
    bottom: 0,
    marginBottom: 0,
  },
   
  img: {
    width: 45,
    height: 45,
    margin: 10,
  },
  
  imgG: {
    width: 45,
    height: 40,
    margin: 12,
  },
  
  imgAdd: {
    width: 40,
    height: 40,
    margin: 12,
    left:-13,
  },
  
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    avatar:state.Page.avatar
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(NavBar);

//Questions to ask henry:
//  1) how to change the width of the actual images not the container around it :/
//  2) How can i fix the profile image?
//  3) How can i navigate through the pages
// 4)How can i make the svg clickable
