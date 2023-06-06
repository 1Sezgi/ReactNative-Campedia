import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState('');


  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBSl67r96m7E-MoZIGoAJLzljKzvfXTw3Y",
      authDomain: "campedia-6915a.firebaseapp.com",
      projectId: "campedia-6915a",
      storageBucket: "campedia-6915a.appspot.com",
      messagingSenderId: "158058421242",
      appId: "1:158058421242:web:5d261653bc9542432a6243",
      measurementId: "G-T950F929C3"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

 const submitProfile = () => {
  const userId = firebase.auth().currentUser.uid; // Mevcut kullanıcının userId'sini alın

  firebase
    .firestore()
    .collection('Profile')
    .add({
      name: name,
      age: age,
      location: location,
      phone: phone,
      userId: userId, // Profil belgesine userId'yi ekleyin
    })
    .then(() => {
      console.log('Profil kaydedildi!');
    })
    .catch((error) => {
      console.error('Profil kaydedilirken hata oluştu: ', error);
    });
};
  const { user } = props; //proptan gelen (App.js STACK) user
  const { signOut } = props; //proptan gelen (App.js STACK) signOut fonksiyonu
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={120} color="#888" />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>
          <Ionicons name="mail-sharp" size={14} /> {email}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Feather name="user" size={24} color="#888" />
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Ad/Soyad giriniz"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="format-list-numbered" size={24} color="#888" />
        <TextInput
          style={styles.input}
          value={age}
          placeholder="Yaşınızı giriniz"
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={24} color="#888" />
        <TextInput
          style={styles.input}
          value={location}
          placeholder="Şehir bilgisi giriniz"
          onChangeText={(text) => setLocation(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="#888" />
        <TextInput
          style={styles.input}
          value={phone}
          placeholder="Telefon numarası girin"
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text title="Profil Kaydet" onPress={submitProfile} style={styles.saveButtonText}>Profil Kaydet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignOut} onPress={signOut}>
        <Text style={styles.buttonSignOutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonSignOut: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buttonSignOutText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default ProfileScreen;
