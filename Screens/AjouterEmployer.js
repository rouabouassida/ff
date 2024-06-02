import React, { useState } from "react";
import { StyleSheet, Alert, Text, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("fullname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterEmployer() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // État de chargement

  const handleSubmit = async (values) => {
    setLoading(true); // Activer l'état de chargement

    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/user/ajouterEmploye",
        values
      );
      if (response.status === 201) {
        Alert.alert("Success", t("Employee_Added_Successfully"));
        navigation.goBack();
      } else {
        Alert.alert("Error", t("Error_Adding_Employee"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", t("Server_Communication_Error"));
    } finally {
      setLoading(false); // Désactiver l'état de chargement une fois la requête terminée
    }
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
            initialValues={{ fullname: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="fullname"
              placeholder={t("Name")}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={t("Email")}
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder={t("Password")}
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title={t("Add_Employer")} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />} {/* Affichage du spinner de chargement si loading est vrai */}
          </AppForm>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 210,
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default AjouterEmployer;
