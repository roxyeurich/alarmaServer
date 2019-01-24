import React from 'react';
import { StyleSheet, Text, View, Button, Slider, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {Camera, Permissions, LinearGradient} from 'expo';
import Profile from "./Profile";

import {connect} from 'react-redux';
import {ChangePage, ChangeAvatar} from '../../redux/actions';

class NavBar extends React.Component {

  
state={
    pages: null,
    imgOpacity: 1,
    bgColor:null
}

ChangeAvatar=(avatar)=>{
      this.setState({
        avatar:avatar
        
    })
}

ChangePage=(page)=>{
    this.setState({
        pages:page,
        
    })
}

handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
    this.setState({       
        imgOpacity:0.2,
        //bgColor:'red'
    })
    
  }

handleTaskPage=()=>{
    this.props.dispatch(ChangePage(6));
    
  }

handleNotifications=()=>{
    this.props.dispatch(ChangePage(11)); 
  }

handleChooseAdd=()=>{
    this.props.dispatch(ChangePage(16)); 
  }

handleReward=()=>{
    this.props.dispatch(ChangePage(15)); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbox}>
            
            <TouchableOpacity style={[
                    
                styles.touch, 
                {opacity:this.state.imgOpacity , 
                // backgroundColor: this.state.bgColor,
                }
            ]} onPress={this.handleProfile}>   
                
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

            <TouchableOpacity style={styles.touch} onPress={this.handleReward}>
              <Image style={styles.rewardIcon }
                  resze="contain"
                      source={require('../Content/icons/PNG/rewardNav.png')}
                      />  
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={this.handleNotifications}>
              <Image style={styles.img }
                      source={require('../Content/icons/PNG/noti.png')}
                      />
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={this.handleChooseAdd}>
              <Image style={styles.addIcon}
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
    width:'110%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom:0,
    left:0,
    alignSelf:'stretch',
    height: '11%',
  },
  
  navbox: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    position:'absolute',
    backgroundColor:"rgba(73, 203, 198,0.3)",
  }, 
  
  profilephoto: {
    width: '90%',
    height: '58%',
    borderRadius: 20,
    borderColor:'#49CBC6',
    borderWidth:2,
    position:'relative',
    top:3,
    left:2
    
  },
  
  touch: {
    zIndex: 15,
    borderRadius: 4,
    height: '66%',
    width:'12%',
    position: 'relative',
    top:2,
    margin:'3.5%',
  
  },
   
  img: {
    width: '75%',
    height: '61%',
    position:'relative',
    top:2.5,
    left:6,
    
  },
  
  rewardIcon: {
    width: 44,
    height: 41,
      position:'relative',
    top:2,
    left:1.5,
  },
  
  addIcon: {
    width: '95%',
    height: '65%',
    position:'relative',
    left:1,
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
