import {Image} from 'react-native'


const TabBarIcon = (focused, name) => {
  let iconImagePath = require('../assets/login.jpg');
  if (name == "Home"){
    iconImagePath = require('../assets/home.png');
  }
  if (name == "Chat"){
    iconImagePath = require('../assets/chat.jpeg');
  }
  if (name == "Calendar"){
    iconImagePath = require('../assets/calendar.png')
  }
  else if (name == 'Today'){
    iconImagePath = require('../assets/add.png')
  }
  else if (name == 'profile'){
    iconImagePath = require('../assets/user.jpg')
  }
  return (
    <Image style = {{
        width: focused ? 24 : 20,
        height: focused ? 24 : 20
      }}
      source = {iconImagePath}
    />
  )
}


export default TabBarIcon