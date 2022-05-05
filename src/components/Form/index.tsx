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

import {FeedbackType}  from '../../components/Widget'
import {ScreenshotButton}  from '../../components/ScreenshotButton'
import {Button}  from '../../components/Button'

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes'


interface Props {
  feedbackType : FeedbackType;
}

export function Form({feedbackType} : Props) {


  const [ screenshot, setScreenShot ] = useState<string | null>(null)

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

  const feedBackTypeInfo =  feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity>
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
      />
      
     <View style={styles.footer}>
      <ScreenshotButton 
        onTakeShot={handleScreenshot}
        onRemoveShot={handleRemoveScreenshot}
        screenshot={screenshot}
      />

      <Button 
        isLoading={false}
      />  
     </View>

     

    </View>
  );
}