import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const BottomTab = createBottomTabNavigator();
import TabBarIcon from "../components/TabBarIcon"
import LogoTitle from "../components/LogoTitle"

import HomeScreen from "../Screens/HomeScreen.js"
import ChatScreen from "../Screens/ChatScreen.js"
import CalendarScreen from "../Screens/CalendarScreen.js"
import TodayScreen from "../Screens/TodayScreen.js"
import UserScreen from "../Screens/UserScreen.js"

const BottomTabNavigator = ({ route }) => {
  //로그인한 사용자의 id값 밎 닉네임 값 저장 
  const { uid,nickname,name } = route.params;
  return (
    <BottomTab.Navigator initialRouteName="Main" 
      tabBarOptions = {{
        activeBackgroundColor:"#000000",
        activeTintColor:"white"
      }}
        screenOptions = {({route})=> ({
          tabBarLabel:route.name,
          tabBarIcon :({focused}) => (
            TabBarIcon(focused,route.name)
          ),
          headerTitleAlign: 'center',
        })
      }
      
    >
      <BottomTab.Screen name="Home" component={HomeScreen} 
        initialParams = {{
            id:uid,
            nickname:nickname
        }}
        options ={{
          headerTitle:"Home",
          headerRight:() => <LogoTitle title="Home" />,
        }}
      />
      <BottomTab.Screen name="Calendar" component={CalendarScreen} 
        initialParams = {{
            id:uid,
            nickname:nickname
        }}
        options ={{
          headerTitle:"전체 일정",
          headerRight:() => <LogoTitle title="Calendar" />,
        }}
      />
      <BottomTab.Screen name="Today" component={TodayScreen} 
        initialParams = {{
            id:uid,
            nickname:nickname
        }}
        options ={{
          headerTitle:"일정 추가",
          headerRight:() => <LogoTitle title="Today" />,
        }}
      />
      
      <BottomTab.Screen name="Chat" component={ChatScreen} 
        initialParams = {{
            nickname:nickname
        }}
        options ={{
          headerTitle:"질의 응답",
          headerRight:() => <LogoTitle title="Chat" />,
        }}
      />
      <BottomTab.Screen name="profile" component={UserScreen} 
        initialParams = {{
            uid:uid,
            name:name,
            nickname:nickname
        }}
        options ={{
          headerTitle:nickname+"님의 개인정보",
          headerRight:() => <LogoTitle title="profile" />,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator