import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

function CongéSupprimer(props) {
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
        <Text style={styles.tagtitle}> Congé Supprimer avec succes... </Text>
        <AppButton style={styles.btn}>OKEY</AppButton>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  tagtitle: {
    fontSize: 30,
    marginTop: 100,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
  btn: {
    color: colors.caramel,
    width: "100%",
    marginBottom: 50,
  },
});

export default CongéSupprimer;
