'use strict';

import React, {Component} from 'react';
import ReactNative, {TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';



const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} = ReactNative;


var isHidden = true;

class HamMenu extends Component {
    
    state={
    pages: null,
}

ChangePage=(page)=>{
    this.setState({
        pages:page
        
    })
}

handleSettings=()=>{
    this.props.dispatch(ChangePage(4)); 
  }

handleLeaveGroup=()=>{
    this.props.dispatch(ChangePage(7)); 
  }

handleLogOut=()=>{
    this.props.dispatch(ChangePage(0)); 
  }



  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(400),  //This is the initial position of the subview
      buttonText: "Show Subview"
    };
  }


  _toggleSubview() {    
    this.setState({
      buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    });

    var toValue = 400;

    if(isHidden) {
      toValue = 225;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
              <Image 
                    style={styles.img }
                     source={require('../Content/icons/PNG/menu.png')}
                  /> 
          </TouchableHighlight>
          <Animated.View
            style={[styles.subView,
              {transform: [{translateX: this.state.bounceValue}]}]}
          >
            <TouchableOpacity 
                onPress={this.handleSettings}
                style={styles.subViewSections} >
                    <Text  style={styles.subViewText}>Settings</Text>
            </TouchableOpacity >  
              
            <TouchableOpacity
                onPress={this.handleLeaveGroup}
                style={styles.subViewSections} >
                    <Text  style={styles.subViewText}>Leave Group</Text>
            </TouchableOpacity>  
              
            <TouchableOpacity
                onPress={this.handleLogOut}
                style={styles.subViewSections} >
                    <Text style={styles.subViewText}>Log Out</Text>
            </TouchableOpacity>
          </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    marginTop: 66,
    zIndex:15,
    position: 'absolute',
    left:20,
    
  },
    
button: {
    padding: 8,
    position:'absolute',
    top:-40,
    left:305,
   
  },
buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
    
img: {
    width:35,
    height:35,
    

},
subView: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 111, 108,0.8)',
    height: 600,
    width:200,
    borderTopLeftRadius:5,
  },
    
subViewText: {
    color:'white',
    fontSize:20,
    marginLeft:10,
    height:30,
    

  },
    
    
subViewSections: {
    marginLeft:5,
    borderBottomWidth :1,
    borderBottomColor: '#9FE4E1',
    height:35,
    marginTop:15,
    padding:5,

  },
    
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid,
    group_id:state.Page.group_id
    
  }

}

export default connect(mapStateToProps)(HamMenu);