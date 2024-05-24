import React from "react";
import AppPicker from "../components/Picker";
import Screen from "../components/Screen";
import { StyleSheet, ImageBackground, Image, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next'; // Importez la fonction useTranslation
import colors from "../config/colors";

function Congé(props) {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Obtenez la fonction de traduction t()

  const categories = [
    { label: t("Leave_Request"), value: 1 },
    { label: t("Modify_Leave"), value: 2 },
    { label: t("Cancel_Leave"), value: 3 },
  ];

  const handleSelect = (item) => {
    if (item.value === 3) {
      navigation.navigate("SupprimerCongé");
    } else if (item.value === 2) {
      navigation.navigate("ModifierCongé");
    } else if (item.value === 1) {
      navigation.navigate("DemandeConge");
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <Screen>
        <AppPicker
          items={categories}
          icon="apps"
          placeholder={t('Work_Leave')}
          onSelectItem={handleSelect}
        />
        <View style={styles.buttonContainer}>
        </View>
      </Screen>
      <Image
        style={styles.image}
        source={require("../assets/bonTravail1.png")}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"

  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 150,
  },
});

export default Congé;
