import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput"
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";


const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
});

function ModifierEmploye() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
  });

  const handleModifyEmployee = async () => {
    setLoading(true);
    setError(null); // Réinitialiser l'erreur

    try {
      const response = await axios.put(
        "http://192.168.1.15:3000/user/modifierEmploye",
        formData
      );

      if (response.status === 200) {
        console.log("Employé modifié avec succès !");
        Alert.alert(t("Success"), t("Employee successfully modified!"));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'employé :", error);
      setError(t("An error occurred while modifying the employee."));
    } finally {
      setLoading(false);
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
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <AppForm
              initialValues={formData}
              onSubmit={handleModifyEmployee}
              validationSchema={validationSchema}
            >
              <AppTextInput
                autoCorrect={false}
                icon="account"
                name="fullname"
                placeholder={t("Name")}
                onChangeText={(value) => handleChange("fullname", value)}
              />
              <AppTextInput
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder={t("Email")}
                textContentType="emailAddress"
                onChangeText={(value) => handleChange("email", value)}
              />
              {error && <Text style={styles.error}>{error}</Text>}
              <AppButton
                title={t("Modify Employee")}
                onPress={() => handleModifyEmployee()}
              />
            </AppForm>
          )}
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 250,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ModifierEmploye;
