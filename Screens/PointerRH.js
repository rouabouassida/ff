import React from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { useTranslation } from "react-i18next";

import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";

const PointerRH = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Utiliser la fonction de traduction

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    
    <ImageBackground
      blurRadius={0}
      style={styles.background}
      source={require("../assets/a3.png")}
    >
      <ScrollView  vertical={true}>
      <View style={styles.container}>
        {/* Bouton circulaire d'ajout */}
        <TouchableOpacity style={styles.addButton} onPress={() => handlePress("AjouterRh")}>
          <Image
            source={require("../assets/plus.jpg")}
            style={styles.addIcon}
          />
        </TouchableOpacity>
        {/* Boutons existants */}
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle1} onPress={() => handlePress("GererEmployer")}>
            <Image
              source={require("../assets/employes.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t("manageEmployees")}</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle2} onPress={() => handlePress("EmployeeHistory")}>
            <Image
              source={require("../assets/historique.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t("attendanceHistory")}</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle3} onPress={() => handlePress("VacationManagement")}>
            <Image
              source={require("../assets/conge.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t("leaveManagement")}</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle4} onPress={() => handlePress("GererRemote")}>
            <Image
              source={require("../assets/remote.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t("remote")}</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle5} onPress={() => handlePress("Seetings")}>
            <Image
              source={require("../assets/seetings.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t("settings")}</Text>
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent:"stretch"
  },
  container: {
    flex: 1,
    padding:30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: colors.beige, // Changer la couleur selon vos besoins
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 50,
    height: 50,
    borderRadius:25,
  },
  circle1: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D8BF9F",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle2: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#BEC6C3",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle3: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E9BC8B",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle4: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3D4A55",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle5: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#AAA245",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:30,
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 10,
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
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default PointerRH;
