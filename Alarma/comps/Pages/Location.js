import React from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';




//uninstall library
//https://maps.googleapis.com/maps/api/place/autocomplete/json?key=api_key&input=text_input_text

export default class Gmap extends React.Component {
   
  state={
        predictions:[],
        description:"",
    }
  


  
  handleTextInput= async(text)=>{
        //get items later
        //http://testserver1234.herokuapp.com/getItems
  //console.log(text);
        var resp = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&input="+text);
        console.log(resp);
        
        var json = await resp.json();
        this.setState({
          predictions: json.predictions
        });
        console.log(json);
        //console.log(this.state.predictions);
        
      
        
        /*
            fetch("http://testserver1234.herokuapp.com/getItems").then((resp)=>{
                return resp.json();
            }).then((json)=>{
                console.log(json);
            })
        */
    }
  
  render(){
  
    var allP = this.state.predictions.map((obj,index)=>{
      return(
        
      <Text> {obj.description} </Text>
      )
      
    })
    return (
      <View style={styles.container}>
        
        <TextInput
            placeholder="location"
            onChangeText={this.handleTextInput}
        />
      {allP}
      </View>
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

});
