import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView, Clipboard} from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';
import {MapView, Asset, Font, ImagePicker} from 'expo';


class CreateG extends React.Component {

   state={
    predictions:[],
    description:"",
    show:false,
    image:null,

  }

handleChooseG=()=>{
  this.props.dispatch(ChangePage(7));
}
  
  handleCopy=async ()=>{
    await Clipboard.setString(this.state.rannum);
    alert('Copied to Clipboard!');
  }  
  
//DATABASE**********************
    group_name="";
    passcode= "";

    adminNum="2";
  
  handleCreateG=async ()=>{
    if (this.group_name.length === 0 || this.state.description.length === 0){
      alert("Please fill in the inputs");
      return false;
    }
    
    var fd= new FormData();
      
      fd.append("group_name", this.group_name);
      fd.append("passcode", this.state.rannum);
      fd.append("userid", this.props.userid);
      fd.append("location", this.state.description);
    
    var resp=await fetch("https://alarmaproj2.herokuapp.com/group.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        if (this.props.admin === 1) { 
        admin=adminNum 
        }
     
        this.props.dispatch(ChangePage(4));
        this.props.dispatch(ChangeUserId(this.props.userid, json.id, json.admin));
        
      } else {
        alert ("Something went wrong!");
      }
  }
  
    componentDidMount=()=>{
    this.random();
  };
  
    
handleTextInput= async(text)=>{
    this.setState({
      description:text
    })
    if(text.length < 5) {
      return false;
    }
        var resp = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&input="+text);
        console.log(resp);
        
        var json = await resp.json();
        this.setState({
          predictions: json.predictions,
          show:true
        });
        console.log(json);
    }
  
  random =()=>{
    var num ='';
      for (var i=0;i<6; i++){
         var t = 
        Math.round(
          Math.random()*9)
        num+= t
      }
    console.log(num); 
    this.setState({
      rannum:num
    });
  }
  
    handleTouchLoc=(obj)=>{
    this.setState({
      description:obj.description,
      show:false
    })
  }
    
    
    _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
//      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
//      var snapshot = await ref.put(blob, 'image/jpg');
//      console.log("fin");

      
    }
  };
  render() {
      
var allP = this.state.predictions.map((obj,index)=>{
      return(
        <TouchableOpacity key={index} style={{ borderBottomWidth:1,
                borderLeftWidth:1,
                borderRightWidth:1, 
                borderColor:'#49CBC6', 
                padding:8,
                borderBottomLeftRadius:2,
                borderBottomRightRadius:2,

          }}
         onPress={this.handleTouchLoc.bind(this, obj)}
         >
          <Text style={{ color: '#49CBC6'}}> {obj.description} </Text>
        </TouchableOpacity>
      )
      
    })
    
    if(this.state.show === false) {
      allP = null;
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleChooseG}>
              <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Group</Text>
        </View>
 <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
          <View style={styles.middleContainer}>
            
            <TouchableOpacity style={styles.touch} onPress={this._pickImage}>
              <Image 
                   source={(this.state.image) ? {uri:this.state.image} : require('../Content/icons/PNG/takepic.png')}
                    style={styles.cameraImg}
                    resizeMode="cover"
                />
             
               </TouchableOpacity>

            <TextInput underlineColorAndroid='transparent'
              style={styles.textInput}
              placeholder="Name The Group"
              onChangeText={(text) => this.group_name=text}
            />

            <Text style={styles.textLabel}>Click to copy the group ID:</Text>
            <TouchableOpacity style={styles.pinBut}
              onPress={this.handleCopy}>
              <Text style={styles.textBut}
              >{this.state.rannum}</Text>
              <Image style={styles.pinImg} source={require('../Content/icons/PNG/pin.png')} />
            </TouchableOpacity>
                 <Text style={styles.textLabel}>Type in the location</Text>

                <TextInput underlineColorAndroid='transparent'
                style={styles.locText}
                onChangeText={this.handleTextInput}
                value={this.state.description}
                />

                <View style={styles.dropDown}>

                {allP}

                </View>

                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    region={this.state.initialPosition}
                    >
                </MapView>

            <TouchableOpacity style={styles.createG}
            onPress={this.handleCreateG}>
              <Text style={styles.textBut}>Create</Text>
            </TouchableOpacity>
          </View>
     </ScrollView>
            </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
    dropDown: {
    zIndex: 1,
    width: 300,
    marginRight: 40,
    position: 'absolute',
    top: 280,
    backgroundColor: '#E8FFFF',
    borderColor: '#FFF',
    borderTopWidth:0,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
    borderBottomLeftRadius:2,
    borderBottomRightRadius:2,
    
   
  }, 
  
  backImg: {
   marginLeft:40,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  cameraImg: {
    marginLeft:0,
    marginTop: 20,
    width: 70,
    height: 50,
    alignSelf: 'stretch',
  },
  
  pinImg: {
    width: 30,
    height: 30,
    padding:2,
    marginLeft:180,
    marginTop:-25,
    zIndex: 1,
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 10,
  },
            
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
  middleContainer: {
    marginTop:5,
  },
    
    map: {
      width:300, 
      height:140,
    position:'absolute',
        borderColor: 'red',
        borderRadius: 8,
        bottom:75,
        left:0
    },
  
  
  textLabel: {
    color: '#4d4d4d',
    fontSize: 20,
      marginTop:-10,
    //fontFamily: 'Raleway-Regular',
  },
  
  textInput: {
    position: 'absolute',
    top:15,
    right:0,
    color: '#4d4d4d',
    fontSize: 15,
    height: 60,
    width: 215,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 0,
    borderColor: '#49CBC6',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 8,
    // fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },  
    
    locText: {
      color: '#4d4d4d',
    fontSize: 15,
    height: 60,
    width: 298,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#49CBC6',
    borderRadius: 8,
    marginTop: 5,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
    paddingLeft: 10,
  },
  
  pinBut: {
    marginTop: 5,
    marginBottom: 30,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(11, 51, 40, 0.91)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  
  createG: {
    marginTop: 170,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
    shadowColor: 'rgba(11, 51, 40, 0.91)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'Raleway-Regular',
  },
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    userid:state.Page.userid,
    admin:state.Page.admin,
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(CreateG);