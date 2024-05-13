import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import colors from "../config/colors";

function DispoRemote(props) {
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.Text}> Remotes</Text>
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

  Text: {
    fontSize: 30,
    marginTop: 100,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
});

export default DispoRemote;
