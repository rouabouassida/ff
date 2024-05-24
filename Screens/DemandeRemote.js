import React from "react";
import { Text, StyleSheet, ImageBackground ,ScrollView} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { Formik } from "formik";
import { useTranslation } from "react-i18next"; // Importer le hook de traduction
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AppFormField from "../components/forms/AppFormField";

function DemandeRemote(props) {
  const { t } = useTranslation(); // Utiliser le hook de traduction
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label(t("Name and Surname")),
    email: Yup.string().required().email().label(t("Email")),
    dateDebut: Yup.string().required().label(t("DateDebut")),
    dateFin: Yup.string().required().label(t("DateFin")),
  });
  

  const handleEnvoyer = async (values) => {
    try {
      // Envoie des données au back-end
      const response = await axios.post(
        "http://192.168.1.15:3000/remote/submit",
        values
      );
      console.log(response.data);
      // Retour à l'écran précédent après avoir envoyé les données
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      // Gérer l'erreur ici
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
            <ScrollView  vertical={true}>

      <Screen style={styles.container}>
        <Formik
          initialValues={{ nomPrenom: "", email: "", dateDebut: "" ,dateFin: ""}}
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
                style={styles.input}
              />
              {touched.nomPrenom && errors.nomPrenom && (
                <AppText style={{ color: "red" }}>{errors.nomPrenom}</AppText>
              )}

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={t("Email")}
                keyboardType="email-address"
                name="email"
                icon="email"
                style={styles.input}
              />
              {touched.email && errors.email && (
                <AppText style={{ color: "red" }}>{errors.email}</AppText>
              )}

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={t("Date")}
                name="dateDebut"
                onChangeText={(text) => {
                  if (text.length === 2 || text.length === 5) {
                    text += "-";
                  }
                  handleChange("dateDebut")(text);
                }}
                style={styles.input}
              />
              {touched.dateDebut && errors.dateDebut && (
                <AppText style={{ color: "red" }}>{errors.dateDebut}</AppText>
              )}
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={t("Date")}
                name="dateFin"
                onChangeText={(text) => {
                  if (text.length === 2 || text.length === 5) {
                    text += "-";
                  }
                  handleChange("dateFin")(text);
                }}
                style={styles.input}
              />
              {touched.dateFin && errors.dateFin && (
                <AppText style={{ color: "red" }}>{errors.dateFin}</AppText>
              )}

              <AppButton
                style={styles.Button}
                title={t("send")}
                onPress={handleSubmit}
              />
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
    alignContent:"stretch"

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
