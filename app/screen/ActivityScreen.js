import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,Linking,Alert,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import resim1 from '../images/clubAmazonBordubet.jpg';
import resim2 from '../images/sahilkamp.jpg';
import resim3 from '../images/yedigoller.jpg';
import resim4 from '../images/adrasangonul.jpg';
import resim5 from '../images/harnup.jpg';
import resim6 from '../images/suralciftligi.jpg';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';

const data = [
  { id: '1', image: resim1, text: 'Club Amazon Bördübet Çadır,Karavan,Bungalov\nMarmaris – Muğla', rating: 0, website: 'https://clubamazon.com.tr/' },
  { id: '2', image: resim2, text: 'Sahil Kamp Çadır,Karavan,Bungalov,Bisiklet Turu,Yarış Parkuru,Havuz Paketi\nİstanbul/Şile', rating: 0, website: 'https://www.sahilkampistanbul.com/' },
  { id: '3', image: resim3, text: 'Yedigöller Kamp Alanı Çadır,Karavan,Bisiklet Turları\nBolu/Merkez', rating: 0, website: 'https://www.yedigollermillipark.com/'},
  { id: '4', image: resim4, text: 'Adrasan Gönül Camping Çadır,Karavan,Bungalov,Tekne Turları\nAntalya/Adrasan', rating: 0, website: 'https://www.instagram.com/adrasangonulcamping/' },
  { id: '5', image: resim5, text: 'Harnup Camping Çadır,Tekne Turları,Dalış\nAntalya/Kaş', rating: 0, website: 'https://harnupcamping.com/'},
  { id: '6', image: resim6, text: 'Sural Çiftliği Çadır,Özel Plaj\nBalıkesir/Ayvalık', rating: 0, website: 'https://www.suralciftligi.com/'},
];

const Rating = ({ rating, onPress }) => {
  const [starCount, setStarCount] = useState(rating);
  const [comment, setComment] = useState("");

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
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

 const submitComment = () => {
  firebase
    .firestore()
    .collection('Activity')
    .add({
      comment: comment,
      rating: starCount,
    })
    .then(() => {
      console.log('Yorumunuz gönderildi!');
      Alert.alert('Başarılı', 'Yorumunuz gönderildi!');
    })
    .catch((error) => {
      console.error('Yorum kaydedilirken hata oluştu: ', error);
    });
};

  const onStarPress = (rating) => {
    setStarCount(rating);
    onPress(rating, comment);
    Alert.alert('Kamp Alanı Değerlendirildi', `Teşekkürler ${rating} yıldız!`);
  }

return (
  <>
    <View style={[styles.rating, { flexDirection: 'row' }]}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <View>
            <Ionicons name="star" size={17} color={i <= starCount ? '#e3dd2b' : 'lightgray'} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Yorumunuzu buraya yazın..."
        value={comment}
        onChangeText={(text) => setComment(text)}      
      />
      <TouchableOpacity style={styles.sendButton}>
        <FontAwesome name="send-o" size={20} color="black"onPress={submitComment} />
      </TouchableOpacity>
    </View>
  </>
);
};

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.item} onPress={() => Linking.openURL(item.website)}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.text}>{item.text}</Text>
    <Rating rating={item.rating} onPress={(rating, comment) => {
      item.rating = rating;
      item.comment = comment;
    }} />
    {item.comment && (
      <Text style={styles.comment}>{item.comment}</Text>
    )}
  </TouchableOpacity>
);

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'flex-start', 
  justifyContent: 'center',
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginRight: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
  },
  flatList: {
    flexGrow: 1,
  },
    rating: {
    flexDirection: 'row',
  },
  commentInput: {
    height: 30,
    width:310,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginLeft: 0,
    padding: 5,
    fontSize: 12,
  },
  comment: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
 

});

export default ActivityScreen;