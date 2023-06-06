import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constant';
import logo from '../images/campedia_logo.png';

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Çadırlarımızı Alıp</Text>
        <Text style={styles.subtitle}>Kamp Yapalım mı?</Text>
        <Btn
          bgColor={green}
          textColor='white'
          btnLabel="Giriş"
          Press={() => props.navigation.navigate("Login")}
        />
        <Btn
          bgColor='white'
          textColor={darkGreen}
          btnLabel="Kayıt" 
          Press={() => props.navigation.navigate("Signup")}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:70,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginLeft:15,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginLeft:30,
  },
  subtitle: {
    color: 'white',
    fontSize: 25,
    marginBottom: 40,
    marginLeft:30,
  },
});

export default Home;
