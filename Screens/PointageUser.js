import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PointageUser(props) {
  const navigation = useNavigation();
  const [workMode, setWorkMode] = useState("");

  const handleWorkMode = (mode) => {
    setWorkMode(mode);
    Alert.alert(
      "Mode de travail sélectionné",
      `Vous avez choisi de travailler ${
        mode === "remote" ? "à distance" : "en présentiel"
      }.`
    );
  };

  const handleCommencer = async () => {
    try {
      if (!workMode) {
        Alert.alert("Sélectionnez un type de travail");
        return;
      }

      const fullname = await AsyncStorage.getItem("fullname");
      const token = await AsyncStorage.getItem("userToken");

      const entryData = {
        entryTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        workMode: workMode,
        fullname: fullname,
      };

      const response = await axios.post(
        "http://192.168.1.15:3000/employees/createEntry",
        entryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        const Entry = response.data.data;
        await AsyncStorage.setItem("entryId", Entry._id);
        navigation.navigate("Chrono");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
      Alert.alert("Erreur lors de la sauvegarde des données");
    }
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Check ton mode de travail :</Text>
        <TouchableOpacity
          style={[
            styles.checkbox,
            workMode === "presentiel" && styles.selectedCheckbox,
          ]}
          onPress={() => handleWorkMode("presentiel")}
        >
          <Text style={styles.checkboxLabel}>Travail en présentiel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.checkbox,
            workMode === "remote" && styles.selectedCheckbox,
          ]}
          onPress={() => handleWorkMode("remote")}
        >
          <Text style={styles.checkboxLabel}>Travail à distance</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCommencer}>
        <Text style={styles.buttonText}>J'ai commencé</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 21,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginLeft: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.caramel,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedCheckbox: {
    backgroundColor: colors.beige,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    color: colors.white,
  },
  button: {
    justifyContent: "flex-end",
    marginEnd: 50,
    backgroundColor: colors.beige,
    width: "90%",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default PointageUser;
