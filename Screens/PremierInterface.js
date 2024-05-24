import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image ,ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { useTranslation } from "react-i18next";

const PremierInterface = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSimpleUtilisateurPressRh = () => {
    navigation.navigate("LoginRh");
  };

  const handleRessourcesHumainesPress = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
    style={styles.background}
    source={require("../assets/a1.png")}
  >
    <View style={styles.container}>
        <Text style={styles.text}>{t("welcome")}</Text>
        <Text style={styles.text1}>{t("whoAreYou")}</Text>

        {/* Premier point */}
        <TouchableOpacity
          style={styles.button1}
          onPress={handleSimpleUtilisateurPressRh}
        >
          <Text style={styles.pointText}>{t("hr")}</Text>
        </TouchableOpacity>

        {/* Deuxième point */}
        <TouchableOpacity
          style={styles.button2}
          onPress={handleRessourcesHumainesPress}
        >
          <Text style={styles.pointText}>{t("user")}</Text>
        </TouchableOpacity>
      </View>
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  text: {
    marginTop: 500,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#7e5835",
    justifyContent: "center",
    margin: 60,
  },
  text1: {
    justifyContent: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    justifyContent: "center",
    margin: 100,
  },
  background: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pointText: {
    fontSize: 18,
    marginRight: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  button1: {
    backgroundColor: colors.beige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 20,
    width: 300,
    marginVertical: 10,
    alignItems: "center",
  },
  button2: {
    backgroundColor: colors.beige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 20,
    width: 300,
    marginVertical: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 250,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    margin :60


  },
});

export default PremierInterface;
