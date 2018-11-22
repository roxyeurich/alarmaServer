import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';
import {Camera, Permissions,ImagePicker} from 'expo';


import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class CameraPg extends React.Component {
  
  state={
    mytitle:"Switch",
    camType:Camera.Constants.Type.front,
    dim: 200,
    image: null,
  }

  SwitchCam=()=>{
    if(this.state.camType === Camera.Constants.Type.front){
      this.setState({
        camType:Camera.Constants.Type.back
      })
    } else {
      this.setState({
      camType:Camera.Constants.Type.front
      })
    }
  }
  
  takePic = async () => {
    try {
      const data = await this.camera.takePictureAsync();
      console.log('Path to image: ' + data.path);
    } catch (err) {
      // console.log('err: ', err);
    }
  }
  
  
  mySlide=(range)=>{
    console.log(this.state.dim);
    this.setState({
        dim:range
      })
  }
  

  async componentWillMount() {
  var { status } = await Permissions.askAsync(Permissions.CAMERA);
  var { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        {/*<Text>Take a Picture!</Text>
        <Camera
        style={{width:this.state.dim, height:this.state.dim}}
          type={this.state.camType}
        >
        </Camera>
        <Button 
          title={this.state.mytitle}
          onPress={this.SwitchCam}
          ></Button>
        
        <Slider
          style={{width:300}} 
          minimumValue={200}
          maximumValue={400}
          onValueChange={this.mySlide}
        >
        </Slider>
      
      <Button 
        title='Take Pic'
        style={styles.capture} 
        onPress={this.takePic} />*/}
        
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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

//export after connecting to redux
export default connect(mapStateToProps)(CameraPg);
