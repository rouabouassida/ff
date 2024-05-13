import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

function Confirmation(props) {
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.text}>
          Un e-mail de réinitialisation de mot de passe a été envoyé à l'adresse
          que vous avez fournie. Veuillez vérifier votre boîte de réception et
          suivre les instructions pour réinitialiser votre mot de passe. Si vous
          ne recevez pas l'e-mail dans quelques minutes, veuillez vérifier votre
          dossier de courrier indésirable (spam).
        </Text>
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