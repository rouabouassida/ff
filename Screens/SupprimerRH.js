import React, { useState } from "react";
import { StyleSheet, Alert, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function SupprimerRH() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (values) => {
    const { email } = values;
    setLoading(true);
    Alert.alert(
      t("confirmationTitle"),
      t("confirmationMessage", { email }),
      [
        {
          text: t("noOption"),
          onPress: () => setLoading(false),
          style: "cancel",
        },
        {
          text: t("yesOption"),
          onPress: () => deleteEmployee(email),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = async (email) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.15:3000/rh/supprimerRh?email=${email}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
    } finally {
      setLoading(false);
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

            <SubmitButton
              title={loading ? t("Deleting...") : t("deleteButton")}
              disabled={loading}
            />
            {loading && <ActivityIndicator color={colors.primary} />}
          </AppForm>
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
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

export default SupprimerRH;
