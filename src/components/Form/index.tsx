import React, {useState} from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import {FeedbackType}  from '../../components/Widget'
import {ScreenshotButton}  from '../../components/ScreenshotButton'
import {Button}  from '../../components/Button'

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';


interface Props {
  feedbackType : FeedbackType;
  onFeedbackReset: () => void;
  onFeedbackSend: () => void
}

export function Form({feedbackType, onFeedbackReset, onFeedbackSend} : Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [ screenshot, setScreenShot ] = useState<string | null>(null)
  const [comment, setComment] = useState("")

  function handleScreenshot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
    .then(uri=>{setScreenShot(uri)})
    .catch(err=>console.log(err))
  }

  function handleRemoveScreenshot(){
    setScreenShot(null);
  }

  async function handleSendFeedback(){

    console.log('oi')
      if(isSendingFeedback) {
        return;
      } 

      setIsSendingFeedback(true);

      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

      try{
          await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot: `data:image/png;base64, ${screenshotBase64}`,
          })

          onFeedbackSend()
      }
      catch(error){
        console.log(error);
        setIsSendingFeedback(false)
      }
  }


  const feedBackTypeInfo =  feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={onFeedbackReset}>
            <ArrowLeft 
            size={24} 
            weight="bold"
            color={theme.colors.text_secondary}/>
          </TouchableOpacity >

          <View style={styles.titleContainer}>
            <Image 
            source={feedBackTypeInfo.image}
            style={styles.image}/>
            <Text style={styles.titleText}>
              {feedBackTypeInfo.title}
            </Text>
          </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não esta funcionando? Queremos corrigir. Conte com detalhes o que esta acontecendo"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect= {false}
        onChangeText={setComment}
      />
      
     <View style={styles.footer}>
      <ScreenshotButton 
        onTakeShot={handleScreenshot}
        onRemoveShot={handleRemoveScreenshot}
        screenshot={screenshot}
      />

      <Button 
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback}
      />  
     </View>

     

    </View>
  );
}