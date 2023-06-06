import React, { useState, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import ActivityScreen from './screen/ActivityScreen';
import ProfileScreen from './screen/ProfileScreen';
import Home from './src/Home';
import Login from './src/Login';
import Signup from './src/Signup';
import { firebase } from './config';




const AuthContext = React.createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const [user, setUser] = useState(null);

  useEffect(() => { //Girişteki auth kontrolü
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
          console.log(error.message);
        }
      },
      signOut: async () => {
        try {
          await firebase.auth().signOut();
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
    []
  );

  const signOut = () => { //SignOut Fonksiyonu

    firebase.auth().signOut().then(() => {
      console.log("Signed Out Successfully.");
    }).catch((error) => {
      console.log("Error signing out: ", error);
    })

  }

  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Hoşgeldiniz" component={Home} />
      <Stack.Screen name="Giriş" component={Login} />
      <Stack.Screen name="Kayıt" component={Signup} />
    </Stack.Navigator>
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'black',
              style: {
                backgroundColor: '#ffc125',
                height: 60,
              },
            }}>
            <Tab.Screen
              name="Anasayfa"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Kamp Alanları"
              component={ActivityScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="campground" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profil"
              children={(props) => <ProfileScreen {...props} user={user} signOut={signOut} />}  
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="user" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (

          <Stack.Navigator>
            <Stack.Screen name="Hoşgeldiniz" component={HomeStack} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
