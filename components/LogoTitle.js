import {Image} from 'react-native'

const LogoTitle = (props) => {
  let iconImagePath = require('../assets/login.jpg')
  if (props.title == "Home"){
    iconImagePath = require('../assets/home.png')
  }
  else if (props.title == "Chat"){
    iconImagePath = require('../assets/chat.jpeg')
  }
  else if (props.title == "Calendar"){
    iconImagePath = require('../assets/calendar.png')
  }
  else if (props.title == "profile"){
    iconImagePath = require('../assets/user.jpg')
  }
  else if (props.title == 'SignUp'){
    iconImagePath = require('../assets/signup.png')
  }
  else if (props.title == 'Today'){
    iconImagePath = require('../assets/add.png')
  }
  return (
    <Image
      style = {{width:40,height:40}}      
      source = {iconImagePath}
    />
  )
  
}

export default LogoTitle