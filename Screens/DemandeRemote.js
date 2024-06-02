import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AppFormField from "../components/forms/AppFormField";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DemandeRemote(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // État local de chargement

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label(t("Name and Surname")),
    email: Yup.string().required().email().label(t("Email")),
    dateDebut: Yup.string().required().label(t("DateDebut")),
    dateFin: Yup.string().required().label(t("DateFin")),
  });

  const handleEnvoyer = async (values) => {
    setLoading(true); // Mettre l'état de chargement à true lors de l'envoi des données
    try {
      const { dateDebut, dateFin } = values;
      const fullname = await AsyncStorage.getItem("fullname");
      const email = await AsyncStorage.getItem("email");

      const response = await axios.post(
        "http://192.168.1.15:3000/remote/submit",
        {
          email,
          nomPrenom: fullname,
          dateDebut,
          dateFin,
        }
      );

      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      Alert.alert(t("error"), error.response.data.message);
      console.error("Erreur lors de l'envoi des données :", error.response.data.message);
    } finally {
      setLoading(false); // Mettre l'état de chargement à false après la réception de la réponse
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
          <Formik
            initialValues={{ nomPrenom: "", email: "", dateDebut: "", dateFin: "" }}
            onSubmit={handleEnvoyer}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors, touched }) => (
              <>
                <Text style={styles.title}>{t("remoteWorkRequest")}</Text>

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
                  name="dateDebut"
                  icon="calendar"
                  onChangeText={(text) => {
                    if (text.length === 2 || text.length === 5) {
                      text += "-";
                    }
                    handleChange("dateDebut")(text);
                  }}
                  style={styles.input}
                />

                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={t("endDatePlaceholder")}
                  name="dateFin"
                  icon="calendar"
                  onChangeText={(text) => {
                    if (text.length === 2 || text.length === 5) {
                      text += "-";
                    }
                    handleChange("dateFin")(text);
                  }}
                  style={styles.input}
                />

                <AppButton
                  style={styles.Button}
                  title={t("send")}
                  onPress={handleSubmit}
                />

                {loading && <ActivityIndicator size="large" color={colors.primary} />}
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
    alignContent: "stretch",
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 300,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  Button: {
    backgroundColor: colors.beige,
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default DemandeRemote;
