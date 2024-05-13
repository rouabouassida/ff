import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

function ModifierCongé(props) {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label("nomPrenom"),
    email: Yup.string().required().email().label("email"),
    NVdateDébut: Yup.string().required().label("nouvelledatedebut"),
    NVdateFin: Yup.string().required().label("nouvelledatefin"),
  });
  const handleEnvoyer = (values) => {
    console.log(values);
    navigation.navigate("Congé Modifié");
  };
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
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
              <Text style={styles.title}>DModifier Congé !</Text>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Nom et Prénom"
                onChangeText={handleChange("nomPrenom")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.nomPrenom}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                icon="email"
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.email}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Donner la nouvelle date de début"
                onChangeText={handleChange("nouvelledateDébut")}
                icon="calendar"
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.NVdateDébut}</AppText>

              <AppTextInput
                autoCorrect={false}
                placeholder="Donner la nouvelle date de fin de congé"
                icon="calendar"
                onChangeText={handleChange("NOUVELLEdateFin")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.NVdateFin}</AppText>

              <AppButton
                style={styles.Button}
                title="modifier Congé"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Screen>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 50,
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
