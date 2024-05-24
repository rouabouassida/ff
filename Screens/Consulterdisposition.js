import React from "react";
import AppPicker from "../components/Picker";
import Screen from "../components/Screen";
import { StyleSheet, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // Importer useTranslation depuis react-i18next


function Consulterdisposition(props) {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Utiliser useTranslation pour la traduction
  const categories = [
    { label: t("Employés Presentiel"), value: 1 },
    { label: t("Travail En Remote"), value: 2 },
    { label: t("Employés En Congé"), value: 3 },
  ];
  
  const handleSelect = (item) => {
    if (item.value === 3) {
      navigation.navigate("CongeEmployee");
    } else if (item.value === 2) {
      navigation.navigate("RemoteEmployees");
    } else if (item.value === 1) {
      navigation.navigate("PresentielEmployees");
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/a3.png")}
    >
      <Screen>
        <AppPicker
          items={categories}
          icon="apps"
          placeholder={t("Work_Mode")} // Utiliser la traduction pour le placeholder
          onSelectItem={handleSelect}
        />
      </Screen>
      <Image
        style={styles.Image}
        source={require("../assets/bonTravail1.png")}
      ></Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"

  },
  Image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 150,
  },
});

export default Consulterdisposition;
