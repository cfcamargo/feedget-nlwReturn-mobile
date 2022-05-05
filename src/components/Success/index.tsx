import React from 'react';
import { 
  View,
  Image, 
  TouchableOpacity,
  Text,

} from 'react-native';

import suceesImg from '../../assets/success.png'
import { Copyright } from '../Copyright';

import { styles } from './styles';

export function Success() {
  return (
    <View style={styles.container}>
        <Image 
        source={suceesImg}
        style={styles.image}/>


        <Text style={styles.title}>Agradecemos o feedback !</Text>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Quero enviar outro</Text>
        </TouchableOpacity>

        <Copyright />
    </View>
  );
}