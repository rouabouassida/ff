import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Alert,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
});

const EditNameRH = ({ currentName, onSave }) => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // État de chargement
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
      Alert.alert(t("error"), t("userIdUnavailable"));
      return;
    }

    setLoading(true); // Activer l'état de chargement

    try {
      const response = await axios.put(
        "http://192.168.1.15:3000/rh/edit-name",
        {
          userId,
          name,
        }
      );

      console.log(response.data);
      Alert.alert(t("success"), t("nameChangedSuccessfully"));
      navigation.navigate("FonctionaliterUser");
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Alert.alert(t("error"), t("nameChangeError"));
    } finally {
      setLoading(false); // Désactiver l'état de chargement une fois la requête terminée
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
          <AppForm
            initialValues={{ name: currentName }}
            onSubmit={handleNameChange}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder={t("name")}
            />
            <SubmitButton title={t("save")} />
          </AppForm>
          {loading && (
            <Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </Text>
          )}
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "flex-start",
  },
  container: {
    padding: 10,
    marginTop: 290,
  },
});

export default EditNameRH;
