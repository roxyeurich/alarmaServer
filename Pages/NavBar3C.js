import React from 'react';
import { StyleSheet, Text, View, Button, Slider, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {Camera, Permissions, LinearGradient} from 'expo';
import Profile from "./Profile";

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class NavBar3C extends React.Component {
state={
    pages: null
}

ChangePage=(page)=>{
    this.setState({
        pages:page
        
    })
}

handleTaskPage=()=>{
    this.props.dispatch(ChangePage(6)); 
  }

handleNotifications=()=>{
    this.props.dispatch(ChangePage(12)); 
  }

handleCTask=()=>{
    this.props.dispatch(ChangePage(10)); 
  }

  render() {
      var curpage = <Profile />;
      
      switch (this.state.pages){
        case 1:
            curpage = <Profile />
            break;
            
    }
    return (
      <View style={styles.container}>
        
        <View style={styles.navbox}>

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
          
            <TouchableOpacity style={styles.touch} onPress={this.handleCTask}>
                <Image style={styles.img }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    alignSelf:'center',
  },
  
  navbox: {
    bottom: -30,
    height: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    right: 15,
    marginBottom:10,
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 10,
    bottom: 0,
    marginBottom: 0,
  },
   
  img: {
    width: 50,
    height: 50,
    margin: 30,
  },
  
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(NavBar3C);

//Questions to ask henry:
//  1) how to change the width of the actual images not the container around it :/
//  2) How can i fix the profile image?
//  3) How can i navigate through the pages
// 4)How can i make the svg clickable
