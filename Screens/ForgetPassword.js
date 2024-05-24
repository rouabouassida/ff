import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { useTranslation } from "react-i18next"; // Importer la fonction useTranslation pour gérer les traductions
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgetPassword(props) {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Utiliser la fonction useTranslation pour obtenir les traductions

  const handleSubmit = (values) => {
    axios
      .post("http://192.168.1.15:3000/user/forget-password", {
        email: values.email,
      })
      .then((response) => {
        console.log("Votre demande a été envoyée avec succès");
        navigation.navigate("Confirmation");
      })
      .catch((error) => {
        console.error("Échec de la demande", error);
        alert("Echec de la connexion !");
      });
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.Entete}>{t("Trouvez votre compte")}</Text>
        <Text style={styles.text}>{t("Entrer votre adresse mail")}</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <>
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder={t("Email")}
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                error={errors.email}
                touched={touched.email}
              />
              <AppText style={{ color: "red" }}>{errors.email}</AppText>
              <Text style={styles.text}>
                {t(
                  "Vous recevrez peut-etre des notifications de notre part sur votre boite mail et par texto à des fins de sécurité et de connexion"
                )}
              </Text>
              <AppButton
                title={t("Continuer")}
                marginTop="30"
                color="beige"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 15,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"

  },
  Entete: {
    fontSize: 30,
    fontStyle: "italic",
    color: colors.caramel,
    marginStart: 30,
    marginTop:30,
  },
  text: {
    fontSize: 20,
    color: colors.grisCalire,
    marginTop: 30,
    marginend:50,

  },
});

export default ForgetPassword;
