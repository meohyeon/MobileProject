import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LogoTitle from "../components/LogoTitle.js"


import LoginScreen from "../Screens/LoginScreen.js"
import SignUpScreen from "../Screens/SignUpScreen.js"

import BottomTab from "./BottomTab.js"
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {style}
      >
      <Stack.Screen name="Login" component={LoginScreen}
        options = {{ 
          headerTitle:"Login Page",
          headerRight:() => <LogoTitle/>,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen}
        options = {{ 
          headerTitle:"SignUp Page",
          headerRight:() => <LogoTitle title = "SignUp"/>,
        }}
      />
      <Stack.Screen name="Home" component={BottomTab}
        options = {{ 
          headerShown: false
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
const style = {
  cardStyle: {backgroundColor: '#ffffff'},
  headerStyle: {
      backgroundColor: '#000000',
      borderBottomWidth: 1,
  },
  headerTitleStyle: {color: '#FFFFFF', fontsize: 24},
  headerTitleAlign: 'center',
  headerTintColor: "#FFFFFF"
}
export default StackNavigator