import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

// Importez le hook useTranslation pour accéder aux traductions
import { useTranslation } from 'react-i18next';

function CongéEnvoyer(props) {
  // Utilisez le hook useTranslation pour obtenir les fonctions de traduction
  const { t } = useTranslation();

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
        ></Image>
        {/* Utilisez t() pour traduire le texte */}
        <Text style={styles.tagtitle}>{t('Request_Sent')}</Text>
        <AppButton style={styles.btn}>{t('OK')}</AppButton>
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

export default CongéEnvoyer;
