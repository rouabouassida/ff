import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next"; // Importez la fonction useTranslation

function Confirmation(props) {
  const { t } = useTranslation(); // Obtenez la fonction de traduction t()

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.text}>{t("Reset_Password_Email_Sent")}</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"
  },
  logoContainer: {
    position: "absolute",
    padding: 15,
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default Confirmation;
