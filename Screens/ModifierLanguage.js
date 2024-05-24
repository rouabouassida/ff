import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import colors from "../config/colors";
import { useTranslation } from "react-i18next";
import i18next, { LanguageResources } from "../services/i18next";
import languagesList from "../services/languagesList.json";

const ModifierLanguage = () => {
  const { t, i18n } = useTranslation();
  const languages = Object.keys(LanguageResources);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Ajoutez un état pour la langue sélectionnée

  // Fonction pour changer la langue sélectionnée
  const selectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  // Fonction pour appliquer le changement de langue
  const applyLanguageChange = () => {
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.languageButtonsContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.languageButton,
                  selectedLanguage === language && styles.selectedLanguageButton
                ]}
                onPress={() => selectLanguage(language)} // Mettre à jour la langue sélectionnée
              >
                <Text style={styles.languageText}>
                  {languagesList[language].nativeName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
       
          <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.beige }]}
      onPress={applyLanguageChange}
    >
      <Text style={styles.text}>{t("Apply")}</Text>
    </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    padding: 15,
  },
  button: {
    backgroundColor: colors.beige,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 150,
    
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",},

  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",

  },
  languageButtonsContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  languageButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedLanguageButton: {
    backgroundColor: "#e0e0e0", // Couleur de fond différente pour la langue sélectionnée
  },
  languageText: {
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default ModifierLanguage;
