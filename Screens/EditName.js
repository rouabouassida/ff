import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Alert } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
});

const EditName = ({ currentName, onSave }) => {
  const [userId, setUserId] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserId();
  }, []);

  const handleNameChange = async (values) => {
    const { name } = values;

    if (!userId) {
      Alert.alert("Erreur", "ID utilisateur non disponible.");
      return;
    }

    try {
      const response = await axios.put(
        "http://192.168.1.15:3000/user/edit-name",
        {
          userId,
          name,
        }
      );

      console.log(response.data);
      Alert.alert("Succès", "Le nom a été modifié avec succès.");
      navigation.navigate("FonctionaliterUser");
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la modification du nom."
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
          initialValues={{ name: currentName }}
          onSubmit={handleNameChange}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Nom"
          />
          <SubmitButton title="Enregistrer" />
        </AppForm>
      </Screen>
    </ImageBackground>
  );
};

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

export default EditName;