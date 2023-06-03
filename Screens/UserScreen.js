import { StyleSheet, View, Text} from 'react-native';
import MusicList from "../components/MusicList.js"
const UserScreen = (props) => {
  const params = props.route.params
  const uid = params ? params.uid : null 
  const name = params ? params.name : null
  const selected = Math.floor(Math.random() * 5)
  /* const musicarr = ["1", "223","425","638", "889", "1027","1214","1424","1656","1853"]
  const [music,setMusic] = useState(musicarr[Math.floor(Math.random() * musicarr.length)])
  let source = `https://www.youtube.com/embed/1gERUWaafTo?start=${music}&autoplay=1&mute=1` */
  return (
    <View style = {styles.container}>
      <View style = {styles.item}>
        <Text style = {styles.itemText}> ID : {uid} {'\t\t'} 성함 : {name}</Text>
      </View>

      <Text style = {{fontSize: 32,color: '#4a4a4a',}}> 오늘 추천 노래</Text>
      <MusicList idx = {selected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 50,
    marginTop : 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  itemText: {
    fontSize: 18,
    color: '#4a4a4a',
  },
});

export default UserScreen