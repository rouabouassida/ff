import React from "react";
import { StyleSheet, Alert ,ImageBackground,ScrollView} from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppPass from "../components/AppPass";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Fullname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterRh({ navigation }) {
  const { t } = useTranslation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:3000/rh/ajouterRh",
        values
      );
      if (response.status === 201) {
        Alert.alert(t("Success"), t("Rh_Added_Successfully"));
        resetForm();
        navigation.goBack();
      } else {
        Alert.alert(t("Error"), t("Error_Adding_Rh"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t("Error"), t("Server_Communication_Error"));
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
      <Formik
        initialValues={{ fullname: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <React.Fragment>
            <AppTextInput
              autoCorrect={false}
              icon="account"
              placeholder={t("Name")}
              value={values.fullname}
              onChangeText={handleChange("fullname")}
            />
            {touched.fullname && errors.fullname && (
              <Text style={{ color: 'red' }}>{errors.fullname}</Text>
            )}
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              icon="email"
              placeholder={t("Email")}
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red' }}>{errors.email}</Text>
            )}
            <AppPass
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder={t("Password")}
              textContentType="password"
              value={values.password}
              onChangeText={handleChange("password")}
              style={{ flex: 1 }}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red' }}>{errors.password}</Text>
            )}
            <AppButton title={t("Add_Rh")} onPress={handleSubmit} />
          </React.Fragment>
        )}
      </Formik>
    </Screen>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 210,

  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

export default AjouterRh;
