import React from "react";
import { StyleSheet, Alert ,ImageBackground} from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function Supprimer() {
  const { t } = useTranslation();

  const handleDelete = async (values) => {
    const { email } = values;
    Alert.alert(
      t("confirmation"),
      t("confirmDeleteMessage", { email }),
      [
        {
          text: "Non",
          onPress: () => console.log("Suppression annulée"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => deleteEmployee(email),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = async (email) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.15:3000/user/supprimerEmploye?email=${email}`
      );
      console.log(response.data);
      // Gérer toute action supplémentaire après la suppression réussie
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      // Gérer les erreurs
    }
  };

  return (
    <ImageBackground
    blurRadius={10}
    style={styles.background}
    source={require("../assets/a2.png")}
  >
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

        <SubmitButton title={t("deleteEmployeeButton")} />
      </AppForm>
    </Screen></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "auto",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default Supprimer;
