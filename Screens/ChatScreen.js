import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const ChatScreen = (props) => {
  const params = props.route.params
  const nickname = params ? params.nickname : null 
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const currentDate = new Date();
  const fetchAnswer = async (questionText) => {
    try{
      const prompt = questionText;
      const apikey = "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";
      const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
      
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`
      };
      const data = {
        prompt:prompt,
        max_tokens: 1024,
        temperature: 0.7,
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      const result = await response.json()
      return result.choices[0].text.split("\n\n")[1]

    }catch(err){
      return "에러"
    }
    
  };

  //사용자가 입력한 값이랑 chatgpt api를 통해 받아온값이 다른 형식의 말풍선으로 보이게 하는 코드
  const submitQuestion = async() => {
    if (question.trim().length === 0) return;

    setConversation((prev) => [...prev, { type: 'question', content: question, time: currentDate.toISOString().split('T')[1].split('.')[0], name : nickname}]);
    setQuestion('');
    const answer = await fetchAnswer(question);
    const chatDate = new Date();
    setConversation((prev) => [...prev, { type: 'answer', content: answer, time: chatDate.toISOString().split('T')[1].split('.')[0], name:"Bot"}]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.conversation}>
        {conversation.map((message, index) => (
          <>
          <Text style = {message.type === 'question' ?styles.authorTime : styles.authorTime2}>
              {message.name}
          </Text>
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.type === 'question' ? styles.question : styles.answer,
            ]}
          >
            
            <Text style={message.type === 'question' ? styles.inputmessage : styles.answermessage}>
              {message.content}
            </Text>
          </View>
          <Text style = {message.type === 'question' ?styles.authorTime : styles.authorTime2}>
              {message.time}
          </Text>
          <View style={{marginBottom: 20}} />
          </>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={(text) => setQuestion(text)}
          placeholder="질문을 입력하세요..."
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitQuestion}>
          <Text style={styles.submitButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  conversation: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  messageContainer: {
    borderRadius: 12,
    padding: 12,
  },
  question: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  answer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  inputmessage: {
    fontSize: 16,
    color:'white'
  },
  authorTime: {
    fontSize: 12,
    color: '#777',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  authorTime2: {
    fontSize: 12,
    color: '#777',
  },
  answermessage: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
});

export default ChatScreen;