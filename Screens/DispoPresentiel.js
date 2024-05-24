import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import colors from "../config/colors";

function DispoPresentiel(props) {
  const { t } = useTranslation(); // Utilisation de la fonction de traduction

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.text}>{t("inPerson")}</Text> {/* Utilisation de la traduction pour "inPerson" */}
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

export default DispoPresentiel;
