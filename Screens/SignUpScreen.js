import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {db} from "../DB/config.js"
import {useState, useEffect} from 'react'

const SignUpScreen = (props) => {
  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,setConfirm] = useState('')
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
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
    readfromDB()
  }, [isFocused]);

  const submitUser = async () => {
    let bool = true;
    //이미 존재하는 id인지 확인 
    user.map((row, idx) => {
      if (row.id == id) {
        bool = false
      } 
    })
    if (bool) {
      //비밀번호 재확인 
      if (password == confirm) {
        //db에 넣어라
        try {
          //만약 값이 비어있는 칼럼이 있는지 확인 
          if (id && password && name && nickname){
            await db.collection("user").doc().set({
            id : id,
            pw : password,
            name : name,
            nickname : nickname,
            })
            props.navigation.navigate("Login")
          }
          else{
            alert("입력하지 않은 값이 존재합니다")
          }
          
        } catch (error) {
          console.log(error)
        }
      }
      else{
        alert("비밀번호 랑 비밀번호 재확인 값이 일치하지 않습니다")
      }
    } else {
      alert('아이디가 이미 존재합니다')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="비밀번호 재확인"
        onChangeText={setConfirm}
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.button} onPress={submitUser}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5DB075',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUpScreen;