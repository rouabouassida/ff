import React from "react";
import { Text, StyleSheet, ImageBackground ,ScrollView} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppFormField from "../components/forms/AppFormField";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function ModifierCongé(props) {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Utilize the translation function

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label("Nom et prénom"),
    email: Yup.string().required().email().label("Email"),
    NVdateDébut: Yup.string().required().label("Nouvelle date de début"),
    NVdateFin: Yup.string().required().label("Nouvelle date de fin"),
  });

  const handleEnvoyer = (values) => {
    console.log(values);
    navigation.goBack();
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
                placeholder={t("Enter new start date")}
                name="NVdateDébut"
                icon="calendar"
                style={styles.input}
              />
             

              <AppFormField
                autoCorrect={false}
                placeholder={t("Enter new end date of leave")}
                name="NVdateFin"
                icon="calendar"
                style={styles.input}
              />
             

              <AppButton
                style={styles.Button}
                title={t("Modify Leave")}
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
    alignItems: "stretch",
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
