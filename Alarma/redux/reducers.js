const initialPage = {
  page:0,
  userid:null,
  group_id:null,
  score:0,
  avatar:null,
  group_avatar:null,
  image:null,
  admin:1,
  rewardid:"",
  home:1,
  loading:false,
}

export function Page(state=initialPage, action){
  var obj = Object.assign({}, state);
  
  
  
  switch(action.type){
    case "CHANGE_PAGE":
      //do something for the command
      obj.page = action.page;
      return obj;
      
    case "CHANGE_USERID":
      obj.userid=action.userid;
      obj.group_id=action.group_id;
      obj.admin=action.admin;
      obj.score=action.score;
      obj.home=action.home;
      obj.avatar=action.avatar;
      obj.group_avatar=action.group_avatar;
      return obj;
      

      
    case "CHANGE_PASSCODE":
      obj.group_name=action.group_name;
      obj.passcode=action.passcode;
      return obj;
      
    case "CHANGE_LOAD":
      obj.loading=action.loading;
      return obj;

      
    default: 
      return state;
  }
  
}