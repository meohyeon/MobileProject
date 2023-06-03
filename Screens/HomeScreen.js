import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';
const HomeScreen = (props) => {
  const params = props.route.params
  const nickname = params ? params.nickname : null 
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    //현재 시간 보여주는 timer
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {nickname}'s
        {'\n'}
        To Do List
        {'\n'}
        {currentDate.toLocaleTimeString()}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Calendar')}>
        <Text style={styles.buttonText}>캘린더</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Today')}>
        <Text style={styles.buttonText}>오늘 할 일</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Chat')}>
        <Text style={styles.buttonText}>쳇봇으로 이동</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            alert("안녕히가세요")
            props.navigation.navigate("Login")
        }}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9966CC',
  },
  button: {
    backgroundColor: '#8A4FFF', 
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 32,
    width: '70%',
    height: '40%',
    textAlign: 'center',
    marginBottom: 16,
    color:"white"
  },
});

export default HomeScreen;