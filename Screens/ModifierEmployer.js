import React, { useState } from "react";
import { StyleSheet, View, Alert ,ImageBackground,ScrollView} from "react-native";
import { useTranslation } from "react-i18next"; // Importer la fonction de traduction
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
  const { t } = useTranslation(); // Utiliser la fonction de traduction

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
          t("Success"),
          t("Employee successfully modified!")
        );
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'employé :", error);
      Alert.alert(
        t("Error"),
        t("An error occurred while modifying the employee.")
      );
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ImageBackground
    blurRadius={10}
    style={styles.background}
    source={require("../assets/a2.png")}
  >
                <ScrollView contentContainerStyle={styles.scrollView}>

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
          placeholder={t("Name")}
          onChangeText={(value) => handleChange("name", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder={t("Email")}
          textContentType="emailAddress"
          onChangeText={(value) => handleChange("email", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder={t("Password")}
          secureTextEntry
          textContentType="password"
          onChangeText={(value) => handleChange("password", value)}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder={t("Confirm Password")}
          secureTextEntry
          textContentType="password"
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <SubmitButton title={t("Modify Employee")} />
      </AppForm>
    </Screen>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 180,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",

  },
});

export default ModifierEmploye;
