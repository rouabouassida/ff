import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import colors from "../config/colors";

function DemandeEnvoyer(props) {
  const { t } = useTranslation(); // Utilisation de la fonction de traduction

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/bonTravail1.png")}
        />
        <Text style={styles.tagtitle}>{t("requestSent")}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent:"stretch"

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

export default DemandeEnvoyer;
