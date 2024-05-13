import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Yup from "yup";
import axios from "axios";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

function ModifierEmploye() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleModifyEmployee = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/user/modifierEmploye",
        formData
      );

      if (response.status === 201) {
        console.log("Employé modifié avec succès !");
        // Envoyer un nouvel email avec les nouvelles informations
        sendUpdateInfo(formData.email, formData.name, formData.password);
        navigation.goBack();

        // Afficher une alerte pour confirmer la modification
        Alert.alert(
          "Modification réussie",
          "Les informations de l'employé ont été modifiées avec succès."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'employé :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la modification de l'employé."
      );
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={formData}
        onSubmit={handleModifyEmployee}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          onChangeText={(value) => handleChange("name", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(value) => handleChange("email", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={(value) => handleChange("password", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <SubmitButton title="Modify Employee" />
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

export default ModifierEmploye;
