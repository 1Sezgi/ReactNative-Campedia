import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constant';
import Field from './Field';
import { firebase } from '../config.js';

export default function Login({ navigation }) { //Navigation prop olarak App.js STACK yapısından geliyor
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Campedia", "Giriş yapıldı.");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error.message);
      Alert.alert("Campedia", `Hata oluştu: ${error.message}`);
    }

  };
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 80,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Campedia
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Hoşgeldiniz
          </Text>
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <Field placeholder="Password" secureTextEntry={true} value={password}
            onChangeText={setPassword} />
          <View
            style={{ alignItems: 'flex-end', width: '78%', paddingRight: '15%', marginBottom: 200 }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Parolanızı mı unuttunuz?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} Press={signIn} btnLabel="Giriş" />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Hesabınız yok mu? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Kayıt ol!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}