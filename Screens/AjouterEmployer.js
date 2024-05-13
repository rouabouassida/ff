import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import axios from "axios"; // Importez Axios

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("fullname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterEmployer() {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/user/ajouterEmploye",
        values
      );
      if (response.status === 201) {
        // Employé ajouté avec succès
        Alert.alert("Success", "Employé ajouté avec succès !");
        navigation.goBack();

        // Envoyer une alerte à l'utilisateur pour l'informer que son compte a été créé avec succès
      } else {
        // Erreur lors de l'ajout de l'employé
        Alert.alert(
          "Error",
          "Une erreur est survenue lors de l'ajout de l'employé."
        );
      }
    } catch (error) {
      // Erreur réseau ou erreur serveur
      console.error(error);
      Alert.alert(
        "Error",
        "Une erreur est survenue lors de la communication avec le serveur."
      );
    }
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ fullname: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="fullname"
          placeholder="Name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Add Employer" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default AjouterEmployer;
