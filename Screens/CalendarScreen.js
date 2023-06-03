import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  StatusBar,
  Image
} from 'react-native';
import {useState, useEffect} from 'react'
import {db} from '../DB/config.js'
import { useIsFocused } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';  
import { Card } from 'react-native-paper';



const CalendarScreen = (props) => {
    const currentDate = new Date();
    const params = props.route.params
    const uid = params ? params.id : null 
    const [items, setItems] = useState({});
    const [selected, setSelected] = useState(currentDate.toISOString().split('T')[0]);
    const onFocused = useIsFocused();
    const [todo, setTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    //사용자가 이 페이지에 들어올떄마다 DB값 다시 읽어오게 한다. 
    useEffect(() => {
      setIsLoading(true)
      readfromDB();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [onFocused]);  

    //FIREBASE에서 데이터를 읽어와 Todo 에 저장 
    const readfromDB = async () => {
      try {
        setItems({})
        setTodo([])
        const data = await db.collection("calendar")
        let tempArray = []
        data.get().then(snap => {
          snap.forEach((doc) => {
            tempArray.push({ ...doc.data(), documentid: doc.id})
          })
        })
        setTodo(tempArray)
      } catch(error) {
        console.log(error.message)
      }
    }

    //캘린더에 데이터 로드 
    const loadItems = (day) => {
      const newItems = { ...items };
      const startDate = new Date(day.year, day.month - 1, 1);
      const endDate = new Date(day.year, day.month);

      todo.map((row, idx) => { 
        //사용자가 입력한 일정인지 확인 
        if (row.id == uid) {
          const rowDate = new Date(row.date);
          
          //사용자가 캘린더에서 선택한 날짜와 같은 날짜인 todo만 랜더링 
          if (rowDate >= startDate && rowDate <= endDate) {
            if (!newItems[row.date]) {
              newItems[row.date] = [];
            }
            //중복되지 않도록 체크
            if (!newItems[row.date].some((item) => item.id === idx)) {
              newItems[row.date].push({
              id: idx, 
              documentid: row.documentid,
              user: row.id,
              text: row.text,
              day: row.date,
            });
            }
          }
        }
      });
      setItems(newItems);
    };
    
    const renderItem = (item) => {
        return (
          <TouchableOpacity 
              style={styles.item}
          >
              <Card>
                  <Card.Content>
                      <View>
                          <Text>{item.text}</Text>
                      </View>
                  </Card.Content>
              </Card>
          </TouchableOpacity>
       );
        
    }
    //데이터가 db에서 전부다 읽어올때까지 대기 
    if(isLoading){
      return (
        <View style={styles.loding}>
          <Text style = {styles.lodingtext}> 로딩중 </Text>
          <Image source={require('../assets/Loding.gif')}/>
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
          <Agenda
              items={items}
              loadItemsForMonth={loadItems}
              refreshControl={null}
              showClosingKnob={true}
              refreshing={false}
              renderItem={renderItem}
              showOnlySelectedDayItems={true}
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'blue'}
              }}
          />
          <StatusBar />
      </View>
  );
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    loding : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    lodingtext : {
      fontSize : 32
    },
    item: {
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },

});

export default CalendarScreen;