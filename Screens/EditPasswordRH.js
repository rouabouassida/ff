import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ImageBackground ,TouchableOpacity} from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AppPass from "../components/AppPass";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";

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
  const [rhId, setRhId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRhId = async () => {
      try {
        const storedRhId = await AsyncStorage.getItem("rhId");
        if (storedRhId) {
          setRhId(storedRhId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRhId();
  }, []);

  const handlePasswordChange = async (values) => {
    const { currentPassword, newPassword } = values;

    if (!rhId) {
      Alert.alert("Erreur", "ID utilisateur non disponible.");
      return;
    }

    try {
      const response = await axios.put(
        "http://192.168.1.15:3000/rh/edit-password",
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
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen style={styles.container}>
        <AppForm
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handlePasswordChange}
          validationSchema={validationSchema}
        >
          <AppPass
            autoCorrect={false}
            icon="lock"
            name="currentPassword"
            placeholder="Mot de passe actuel"
            style={{ flex: 1 }}
          />
          <AppPass
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            style={{ flex: 1 }}
          />
          <AppPass
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Confirmer le nouveau mot de passe"
            style={{ flex: 1 }}
          />
          <AppButton title="Enregistrer" onPress={handlePasswordChange} />
        </AppForm>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default EditPasswordRh;
