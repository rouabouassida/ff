import React, { useState } from "react";
import { Image, StyleSheet, Text,TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../config/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AppPass from "../components/AppPass"

import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginRh(props) {
  // Added state hooks for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const res = await axios.post("http://192.168.1.15:3000/rh/login", {
        email: values.email,
        password: values.password,
      });
      const rhInfo = res.data;

      await AsyncStorage.setItem("rhToken", rhInfo.token);
      await AsyncStorage.setItem("rhId", rhInfo._id);
      await AsyncStorage.setItem("fullname", rhInfo.fullname);
      await AsyncStorage.setItem("email", rhInfo.email);

      console.log("Connected successfully");
      navigation.navigate("PointerRH");
    } catch (error) {
      console.error("Account does not exist", error);
      alert("Login Failed!");
    }
  };
  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/s.png")} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin} // Changed to handleLogin
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              icon="email"
              placeholder="Email"
            />
            <AppText style={{ color: "red" }}>{errors.email}</AppText>
            <AppPass
             autoCapitalize="none"
             autoCorrect={false}
             icon="lock"
             onChangeText={handleChange("password")}
             placeholder="mot de passe"
             style={{ flex: 1 }}
            />
            <AppText style={{ color: "red" }}>{errors.password}</AppText>
            <AppButton title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.forget}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  forget: {
    color: colors.marron, // Ensure this color is defined in your colors config
    fontSize: 15,
    fontStyle: "italic",
    marginTop: 50,
    alignSelf: "center",
  },
});

export default LoginRh  ;
