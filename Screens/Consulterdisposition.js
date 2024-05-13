import React from "react";
import AppPicker from "../components/Picker";
import Screen from "../components/Screen";
import { StyleSheet, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = [
  { label: "Employés Presentiel", value: 1 },
  { label: "Travail En Remote", value: 2 },
  { label: "Employés En Congé", value: 3 },
];

function Consulterdisposition(props) {
  const navigation = useNavigation();

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
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen>
        <AppPicker
          items={categories}
          icon="apps"
          placeholder="Le mode de travail"
          onSelectItem={handleSelect} // Correction : Utilisation de onSelectItem
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
