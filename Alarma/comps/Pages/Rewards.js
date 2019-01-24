import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Timer, Font, PanResponder } from 'react-native';
import {CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';
// npm i --save react-native-circular-progress react-native-svg
// react-native link react-native-svg
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';


import NavBar from './NavBar';
const Max_Points = '';

//Need to connect the idk what to the the rewards..
//and ask henry about the flex thing, row and collumns, doesnt go past two
class Rewards extends React.Component {
  
  
timer = null;

state={
    isMoving: false,
    pointsDelta: 0,
    rewards:[],
    reward_title:"",
    reward_points:500,
    scoreT:0,
    //points:325,
}
    componentDidMount() {
        //alert("test");
  }
  handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
  }
    
  handleAlert=()=>{
    this.props.dispatch(ChangePage(5));
  }
  
  componentWillMount=()=>{
    this.handleRewards();
    /*this.timer = setInterval(()=>{
      this.handleRewards();
    },1000);*/
  }
  
  componentWillUnmount=()=>{
    clearInterval(this.timer);
  }
      
  handleRewards=async ()=>{
    
    var fd= new FormData();
    fd.append("id", this.props.userid);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getScore.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    var score = 0;
    if (json.length > 0) {
      score = parseInt(json[0].score);
         this.setState({
          scoreT:json[0].score,
        })
        
    }
    
    var fd= new FormData();
    //change id to group_id
    fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getReward.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          rewards:json
        });
        
        //get reward_title when reaching reward_points
        var str = json.map((obj)=>{
          return obj.reward_title;
        });
        
        //rewardPts = this.state.reward_points;
        //newreward = false;
        console.log("score", score);
        var titles = [];
        
        var filter = json.filter((obj,index)=>{
          if(score >= parseInt(obj.reward_points)){
             titles.push(obj.reward_title)
             }
          return (score >= parseInt(obj.reward_points))
        });
        
        if (filter.length > 0){
          alert("You have received the rewards: "+('\n')+titles.join(", \n"));
          //newreward = true;
          
          //make it disappear
        }
        
      } else {
        
      }
  }
renderRewards=(rewards)=> {
    const fill = this.state.score;
   // const prefill = this.state.score
  //  const Max_Points = this.state.rewards;



   var rewards = rewards || [];
  
   return rewards.map((reward,index) => {
        var pr = Math.round(this.state.scoreT / parseInt(reward.reward_points)*100);
        //alert(this.state.score);
     return(<View style={styles.taskCont} key={reward.id}>
     
            <View style={styles.contTitle}>
                <Text style={styles.taskName}>{reward.reward_title}</Text>
            </View>
  
{/*
      <Text style={styles.taskDesc}>    
          {reward.reward_points} points
      </Text>
*/}
      <View style={{
            position:'absolute', 
            bottom:10,
            left:19,
                   }}>

          <AnimatedCircularProgress
               size={116}
               width={7}
               fill={pr}
             // prefill={1000}
               tintColor="#49CBC6"
               backgroundColor="#4B7CB0"
               ref={(ref) => this.circularProgress = ref}
               >
                  {
                    (fill) => (
                      <Text style={styles.points}>
                            {reward.reward_points}
                           {/* { Math.round(Max_Points * fill / 100) }*/}
                      </Text>
                    )
                  }
          </AnimatedCircularProgress>
        </View>
     
    </View>)
   });
 }      

  render() {
const fill = this.state.points / Max_Points * 50;

    return (
      <View style={styles.container}>
       
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Rewards</Text>
        </View>

        <View style={styles.middleContainer}>
                         <ScrollView>


              <View style={styles.rewardsCon}>

                {this.renderRewards(this.state.rewards)} 
              </View>
                    </ScrollView>

      </View>
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
  },
    
    
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 90,
    height:38,    
    textAlign: 'center',
    color: '#49CBC6',
    fontSize: 30,
    fontWeight: "500"
  },

containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 10,
  },
  
  backImg: {
   marginLeft:40,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
  
  taskName: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    //fontFamily: 'Raleway-Regular',
    fontFamily: 'NunitoSans-Regular',
  },
  
  taskDesc: {
    fontSize: 16,
    marginTop: 0,
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
    zIndex:20,
  },
  
  middleContainer: {
    marginTop:20,
    padding:10,
    height:'70%',
      
  },
    
rewardsCon: {
   //     backgroundColor:'yellow', 
    flexDirection:'row',
    flexWrap:'wrap',
    height:'150%',
    width:'100%',
  },
  
  taskCont: {
    height: '16%',
    width: '44%',
    position:'relative',
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 4,
  },
  
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Rewards);