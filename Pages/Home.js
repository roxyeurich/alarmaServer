import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class Home extends React.Component {
  
    handleProfile=()=>{
    this.props.dispatch(ChangePage(5));
    
  }
    
  render() {
    return (
      <View>
        <Text>Home page</Text>
      
          <Button style={styles.container} 
            onPress={this.handleProfile}
            title="Profile"
          /> 
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
  },
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

export default connect(mapStateToProps)(Home);