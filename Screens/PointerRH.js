import React from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const PointerRH = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("GererEmployer");
  };
  const handlePress1 = () => {
    navigation.navigate("EmployeeHistory");
  };
  const handlePress2 = () => {
    navigation.navigate("VacationManagement");
  };
  const handlePress3 = () => {
    navigation.navigate("Seetings");
  };

  const handleAddPress = () => {
    navigation.navigate("AjouterRh");
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        {/* Bouton circulaire d'ajout */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Image
            source={require("../assets/plus.jpg")}
            style={styles.addIcon}
          />
        </TouchableOpacity>
        {/* Boutons existants */}
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image
              source={require("../assets/employes.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Gérer les employés </Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress1}>
            <Image
              source={require("../assets/historique.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Historique de Pointage</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress2}>
            <Image
              source={require("../assets/conge.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Congé</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress3}>
            <Image
              source={require("../assets/seetings.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Seetings</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: colors.blue, // Changer la couleur selon vos besoins
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  addIcon: {
    width: 50,
    height: 50,
    borderRadius: 55,
  },
  button: {
    backgroundColor: colors.beige,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PointerRH;
