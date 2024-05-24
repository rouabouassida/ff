import React, { useState } from "react";
import { StyleSheet, Image, ImageBackground, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import axios from "axios";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../Screens/LanguageContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function Login(props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/user/accout",
        {
          email: values.email,
        }
      );

      if (response.data.success) {
        Alert.alert(t("Success"), t("Password_Reset_Email_Sent"));
      } else {
        Alert.alert(t("Error"), t("Email_Sending_Error"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t("Error"), t("Login_Error"));
    }
  };
  return (
    <Screen style={styles.container}>
      <ImageBackground
        blurRadius={10}
        style={styles.background}
        source={require("../assets/a2.png")}
      >
        <Image style={styles.logo} source={require("../assets/s.png")} />

        <AppForm
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder={t("Email")}
            textContentType="emailAddress"
          />

          <SubmitButton title={t("Send_Password")} />
        </AppForm>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 70,
  },
});

export default Login;
