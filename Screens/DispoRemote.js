import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next"; // Import de la fonction de traduction
import colors from "../config/colors";

function DispoRemote(props) {
  const { t } = useTranslation(); // Utilisation de la fonction de traduction

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.text}>{t("remote")}</Text> {/* Utilisation de la traduction pour "remote" */}
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
    alignContent:"stretch"

  },
  text: {
    fontSize: 30,
    marginTop: 100,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
});

export default DispoRemote;
