import React from "react";
import {
  Alert,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormField from "../components/forms/AppFormField";
import axios from "axios";

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("Nom et Prénom"),
  email: Yup.string().required().email().label("Email"),
  dateDebut: Yup.string().required().label("Date début"),
  dateFin: Yup.string().required().label("Date fin"),
});

function SupprimerConge({ navigation }) {
  const handleSubmit = async (values) => {
    try {
      // Correction ici : Assurez-vous que la structure de données envoyée correspond à celle attendue par votre API.
      const response = await axios.delete(
        "http://192.168.1.15:3000/conge/supprimer-conge",
        {
          data: values,
        }
      );

      console.log(response.data);
      Alert.alert("Succès", "Congé supprimé avec succès!");
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la suppression du congé:", error);
      // Amélioration ici : Affichage d'un message d'erreur plus informatif pour l'utilisateur.
      let errorMessage = "Erreur lors de la suppression du congé.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Erreur", errorMessage);
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          <Text style={styles.title}>Supprimer Congé</Text>
          <AppForm
            initialValues={{
              nomPrenom: "",
              email: "",
              dateDebut: "",
              dateFin: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="nomPrenom"
              placeholder="Nom et Prénom"
              icon="account"
            />
            <AppFormField
              name="email"
              placeholder="Email"
              icon="email"
              keyboardType="email-address"
            />
            <AppFormField
              name="dateDebut"
              placeholder="Date de début (JJ/MM/AAAA)"
              icon="calendar-range"
            />
            <AppFormField
              name="dateFin"
              placeholder="Date de fin (JJ/MM/AAAA)"
              icon="calendar-range"
            />
            <SubmitButton title="Supprimer" />
          </AppForm>
        </Screen>
      </ScrollView>
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
});

export default SupprimerConge;