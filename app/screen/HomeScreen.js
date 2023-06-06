import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image, ImageBackground, TextInput } from "react-native";


export default class HomeScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/homeback.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            alignItems: "center",
            paddingHorizontal: 40,
          }}
        >
        </View>

        <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
          <View style={{alignItems:'center'}}>
            <Image
              source={require("../images/campedia_logo.png")} //logo
              style={{ width: 140, height: 140 }}
            />
          </View>

          <Text
            style={{
              fontSize: 40,
              color: "#522289",
              fontFamily: "RobotoBold",
            }}
          >
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white", //search arka plan
              borderRadius: 40,
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Icon
              name="briefcase-search-outline"
              size={14}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ paddingHorizontal: 20, fontSize: 15, color: "#ccccef" }}
              placeholderTextColor="#ccccef"
            />
          </View>

          <Text
            style={{
              color: "#FFF",
              fontFamily: "RobotoRegular",
              marginTop: 50,
              fontSize: 17,
            }}
          >
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -40, marginTop: 50 }}
          >
            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
              }}
            >
              <Image
                source={require("../images/card1.jpg")} //ilk card
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RobotoRegular",
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                    Kamp yapmak özgürlüğe sessizce açılmaktır.
                  </Text>
                </View>
                <Icon name="map-marker" size={25} color="#ff5c83" />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
                marginHorizontal: 20,
              }}
            >
              <Image
                source={require("../images/card2.jpg")} //ikinci card
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View //arama buton kısmı
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RobotoRegular",
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                    Dünyayı dolaşın,görebileceğiniz rüyaların en muhteşemi!
                  </Text>
                </View>
                <Icon name="map-marker" size={25} color="#5facdb" />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
              }}
            >
              <Image
                source={require("../images/card3.jpg")} //üçüncü card
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RobotoRegular",
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                    Çadırlarımızı alıp kamp yapalım mı? Jostein Gaarder
                  </Text>
                </View>
                <Icon name="map-marker" size={25} color="#bb32fe" />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}