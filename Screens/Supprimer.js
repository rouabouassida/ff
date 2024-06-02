import React, { useState } from "react";
import { StyleSheet, Alert, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function Supprimer() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleDelete = async (values) => {
    const { email } = values;
    Alert.alert(
      t("confirmation"),
      t("confirmDeleteMessage", { email }),
      [
        {
          text: t("no"),
          onPress: () => console.log("Suppression annulée"),
          style: "cancel",
        },
        {
          text: t("yes"),
          onPress: () => deleteEmployee(email),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = async (email) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://192.168.1.15:3000/user/supprimerEmploye?email=${email}`
      );
      console.log(response.data);
      Alert.alert(t("success"), t("deleteSuccessMessage"));
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      if (error.response) {
        Alert.alert(t("error"), `${t("deleteErrorMessage")} ${error.response.data}`);
      } else {
        Alert.alert(t("error"), t("networkErrorMessage"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground blurRadius={10} style={styles.background} source={require("../assets/a2.png")}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <AppForm
              initialValues={{ email: "" }}
              onSubmit={handleDelete}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCorrect={false}
                icon="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                keyboardType="email-address"
              />
              <SubmitButton title={t("deleteEmployeeButton")} />
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
    marginTop: 290,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default Supprimer;
