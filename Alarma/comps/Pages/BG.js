import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class BG extends React.Component {
  render() {
    return (
          <View  style={styles.container}> 
         <LinearGradient   colors={['rgba(73,176,203, 1)', 'rgba(75,124,176, 1)']}
          style={{width:420, height:'100%', alignItems: 'center', zIndex:-1}}>
            <Image 
              source={require('../Content/Imgs/jimenabg2.jpg')}
                        style={styles.jimenaBG}
                        resizeMode="cover"
                  />
            </View>
    );
  }
}

const styles = StyleSheet.create({
  
    jimenaBG: {
      zIndex:-2,
      opacity:0.1,
      height:'100%',
      width:'100%',
    },
    
    

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid
    
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(BG);