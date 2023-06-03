import { useState, useEffect } from 'react';
import Constants from "expo-constants"
import { View, TextInput, TouchableOpacity, Text, StyleSheet,ScrollView, Alert} from 'react-native';
import {db} from '../DB/config.js'
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
const TodayScreen = (props) => {
  const params = props.route.params
  const uid = params ? params.id : null 

  const [text, setText] = useState('');
  const onFocused = useIsFocused();
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    readfromDB()
  }, [onFocused]);
  const handleDelete = (idx) => {
    /* 
    웹이랑 앱이랑 todolist 삭제시 다른 alert창을 사용  
    모바일은 onPress 적용하여 삭제를 취소할수 있고 
    웹은 클릭시 바로 삭제   
    */
    if(Constants.platform.web){
      deletetext(idx)
      alert("일정을 삭제했습니다.")
    }else{
      Alert.alert(
      '삭제하시겠습니까?',
      '이 작업은 되돌릴 수 없습니다.',
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '확인',
          onPress : ()=>{deletetext(idx)},
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
    }
     
  };
  //일정 삭제시 db에서도 값을 삭제 
  const deletetext = async (idx) => {
    let tmp = todo[idx]
    
    const newArray = todo.filter((num, index) => {
      return idx != index
    })
    try {
      
      await db.collection("calendar").doc(tmp.documentid).delete().than(
        ()=> {
          alert('삭제되었습니다!')
          readfromDB()
        }   
      )  
    } catch (error) {   
      console.log(error)
    }
    setTodo(newArray)
  }

  //db데이터 읽어오는 code 
  const readfromDB = async () => {
    try {
      const data = await db.collection("calendar")
      let tempArray = []
      data.get().then(snap => {
        snap.forEach((doc) => {
          tempArray.push({ ...doc.data(), documentid: doc.id})
        })
        setTodo(tempArray)
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  //신규 일정 추가시 
  const submit = async () => {
    if (text != ""){
      const currentDate = new Date();
      try {
        await db.collection("calendar").doc().set({ 
          id : uid,
          date: currentDate.toISOString().split('T')[0],  
          text: text,
        })
        readfromDB()
      } catch (error) {
        console.log(error)
      }
      setText("")
    }else{
      alert("텍스트 입력 하시오")
    }
    
  };
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="일정 입력하시오"
        multiline
      />
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.buttonText}>Add Schedule</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style = {styles.title}> TODAY</Text>
          {
            todo.map((item, idx) => {
              const currentDate = new Date();
              if (item.id == uid && item.date == currentDate.toISOString().split('T')[0]) {
                return (
                  <TouchableOpacity style={styles.item} onPress ={()=>handleDelete(idx)}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Icon name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                )
              }
            })
          }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#4f81db',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  title:{
    fontSize:48,
    color:"#CC99FF"
  }
});

export default TodayScreen;