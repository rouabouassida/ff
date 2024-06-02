import React, { useState } from "react";
import { Text, StyleSheet, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppFormField from "../components/forms/AppFormField";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

function ModifierCongé(props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label("Nom et prénom"),
    email: Yup.string().required().email().label("Email"),
    NVdateDébut: Yup.string().required().label("Nouvelle date de début"),
    NVdateFin: Yup.string().required().label("Nouvelle date de fin"),
  });

  const handleEnvoyer = (values) => {
    setLoading(true);
    console.log(values); // Placeholder for sending data to the server

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          <Formik
            initialValues={{
              nomPrenom: "",
              email: "",
              NVdateDébut: "",
              NVdateFin: "",
            }}
            onSubmit={handleEnvoyer}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors, touched }) => (
              <>
                <Text style={styles.title}>{t("Modify Leave")}!</Text>

                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={t("Name and Surname")}
                  name="nomPrenom"
                  icon="account"
                  style={styles.input}
                />
              
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={t("Email")}
                  keyboardType="email-address"
                  name="email"
                  icon="email"
                  style={styles.input}
                />

                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={t("startDatePlaceholder")}
                  name="NVdateDébut"
                  icon="calendar"
                  style={styles.input}
                />

                <AppFormField
                  autoCorrect={false}
                  placeholder={t("endDatePlaceholder")}
                  name="NVdateFin"
                  icon="calendar"
                  style={styles.input}
                />

                <AppButton
                  style={styles.Button}
                  title={loading ? t("Modifying...") : t("Modify Leave")}
                  onPress={handleSubmit}
                  disabled={loading}
                />

                {loading && <ActivityIndicator color={colors.primary} />}
              </>
            )}
          </Formik>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  container: {
    padding: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 260,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    padding: 5,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: colors.beige,
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default ModifierCongé;
