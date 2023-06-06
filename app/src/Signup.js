import React, { useState } from 'react';
import { View, Text,TouchableOpacity,Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constant';
import Field from './Field';
import { firebase } from '../config.js';

export default function Signup({ navigation }) {
  //Navigation App.js STACK'ten geliyor
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signupUser = async () => {

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Here you can save the user's name to the database using firebase.firestore()
      await firebase.firestore().collection('users').doc(email).set({
        name: name
      });
      Alert.alert('campedia', 'Hesabınız oluşturuldu!');
      navigation.navigate('Login'); //Hesap başarılı oluşturulduysa LOGIN'e git
    } catch (error) {
      console.log(error.message);
      Alert.alert('campedia', `Hata olustu: ${error.message} `);
    }
  };
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}></Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Yeni hesap oluştur
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
            <Field
            placeholder="Ad Soyad"
            value={name}
            onChangeText={setName}
          />
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <Field
            placeholder="Şifre"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16,
            }}></View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}></View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Kayıt"
            Press={signupUser}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Zaten Hesabınız Var mı ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Giriş
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}
