import { 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text 
} from "react-native";
import {useState, useEffect} from 'react'
import {useIsFocused} from '@react-navigation/native';
import {db} from "../DB/config.js"

const LoginScreen = (props) => {
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    readfromDB()
  }, [isFocused]);

  //user 컬렉션에 있는 값을 읽어온다.
  const readfromDB = async () => {
      try {
        const data = await db.collection("user")
        let tempArray = []
        data.get().then(snap => {
          snap.forEach((doc) => {
            tempArray.push({ ...doc.data(), documentID: doc.id})
          })
          setUser(tempArray)
        })
      } catch(err) {
        console.log(err)
      }
  }
  const loginEvent = () => {
    let bol = true
    //사용자가 입력한 값과 user 컬렉션에 있는 값들을 하나하나 비교하며 해당 사용자가 있는지 확인 
    user.map((row, idx) => {
      if (row.id == id && row.pw == password) {
        setId('')
        setPassword('')
        bol = false
        alert("로그인 성공")
        props.navigation.navigate("Home",{
          uid:row.id,
          nickname:row.nickname,
          name:row.name
        })
      } 
    })
    if(bol){
      alert("아이디 혹은 패스워드가 틀렸습니다.")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginbutton} onPress={loginEvent}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupbutton} onPress={()=>props.navigation.navigate("SignUp")}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 32,
    margin: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
  },
  loginbutton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  signupbutton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;