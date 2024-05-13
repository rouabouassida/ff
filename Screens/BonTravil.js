import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import colors from "../config/colors";

function BonTravail(props) {
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/bonTravail1.png")}
        ></Image>
        <Text style={styles.tagtitle}> Bon Travail ... </Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  tagtitle: {
    fontSize: 50,
    marginTop: 100,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
});

export default BonTravail;
