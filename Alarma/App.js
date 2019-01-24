import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View } from 'react-native';

import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import { Font, Asset } from 'expo';

import combine from './redux/combine';
import Nav from './comps/Nav';


const store = createStore(
  combine,
  applyMiddleware(
    Thunk
  )
)


export default class App extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        fontLoaded: false
      }
    }
  
    async componentDidMount (){
    await Font.loadAsync({
      'Raleway-Regular':require('./assets/fonts/Raleway/Raleway-Regular.ttf'), 
      'NunitoSans-Regular':require('./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf'),
      'Raleway-Bold':require('./assets/fonts/Raleway/Raleway-Bold.ttf')
    }).then(()=> {
    this.setState({fontLoaded: true})
      
    })
  }
  
  
  render() {
    return (
      
      <Provider store={store}>
        {this.state.fontLoaded ? <Nav /> : <View></View>}
      </Provider>
      
      

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

AppRegistry.registerComponent('App', () => App)