import React, { useState } from "react";
import { StyleSheet, Image, ImageBackground, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import axios from "axios";
import { Alert } from "react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function Login(props) {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/user/accout",
        {
          email: values.email,
        }
      );

      if (response.data.success) {
        Alert.alert(
          "Succès",
          "Un e-mail contenant votre nouveau mot de passe a été envoyé."
        );
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite lors de l'envoi de l'e-mail."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la connexion.");
    }
  };
  return (
    <Screen style={styles.container}>
      <ImageBackground
        blurRadius={50}
        style={styles.background}
        source={require("../assets/welcomebackground.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/s.png")} />

        <AppForm
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <SubmitButton title="Envoyer un mot de pass" />
        </AppForm>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  background: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 70,
  },
});

export default Login;
