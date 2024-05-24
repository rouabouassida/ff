import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ImageBackground } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import SubmitButton from "../components/forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AppPass from "../components/AppPass";
import AppText from "../components/AppText";
import { Formik } from "formik";
import AppFormField from "../components/forms/AppFormField";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().label("Mot de passe actuel"),
  newPassword: Yup.string().required().min(6).label("Nouveau mot de passe"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Les mots de passe doivent correspondre"
    )
    .label("Confirmation du nouveau mot de passe"),
});

function EditPasswordRh() {
  const [rhId, setUserId] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("rhId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserId();
  }, []);

  const handlePasswordChange = async (values) => {
    const { currentPassword, newPassword } = values;

    if (!rhId) {
      Alert.alert("Erreur", "ID utilisateur non disponible.");
      return;
    }

    try {
      const response = await axios.put(
        "http://192.168.1.15:3000/rh/edit-Password",
        {
          rhId,
          currentPassword,
          newPassword,
        }
      );

      console.log(response.data);
      Alert.alert("Succès", "Le mot de passe a été modifié avec succès.");
      navigation.goBack();
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la modification du mot de passe."
      );
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <Screen style={styles.container}>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handlePasswordChange}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <AppPass
                autoCorrect={false}
                icon="lock"
                name="currentPassword"
                placeholder={t("currentPassword")}
                style={{ flex: 1 }}
              />
              <AppText style={{ color: "red" }}>
                {errors.currentPassword}
              </AppText>

              <AppPass
                autoCorrect={false}
                icon="lock"
                name="newPassword"
                placeholder={t("newPassword")}
                style={{ flex: 1 }}
              />
              <AppText style={{ color: "red" }}>{errors.newPassword}</AppText>

              <AppPass
                autoCorrect={false}
                icon="lock"
                name="confirmPassword"
                placeholder={t("confirmPassword")}
                style={{ flex: 1 }}
              />
              <AppText style={{ color: "red" }}>
                {errors.confirmPassword}
              </AppText>

              <SubmitButton title={t("save")} />
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
    alignContent:"stretch"

  },
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default EditPasswordRh;
