import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import colors from "../config/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const verifyExistingEntry = async (fullname) => {
  try {
    const response = await axios.post(
      "http://192.168.1.15:3000/employees/getActiveEmployee",
      {
        fullname,
      }
    );
    if (response.data.message === "Employee exist") {
      await AsyncStorage.removeItem("workedTime");
      await AsyncStorage.setItem(
        "workedTime",
        response.data.entry[0].hoursWorked
      );
      return true;
    }
  } catch (error) {
    console.error("Error verifying existing entry:", error);
    return false;
  }
};

function PointageUser(props) {
  const { t } = useTranslation();
  const [workMode, setWorkMode] = useState("");
  const navigation = useNavigation();

  const handleWorkMode = (mode) => {
    setWorkMode(mode);
    Alert.alert(
      t("Work Mode Selected"),
      t("You have chosen to work {{mode}}.", {
        mode: mode === "remote" ? t("remotely") : t("on-site"),
      })
    );
  };

  const handleCommencer = async () => {
    try {
      if (!workMode) {
        Alert.alert(t("Select a work type"));
        return;
      }

      const fullname = await AsyncStorage.getItem("fullname");
      const token = await AsyncStorage.getItem("userToken");

      const entryData = {
        entryTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        workMode: workMode,
        fullname: fullname,
      };
      if (!(await verifyExistingEntry(fullname))) {
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
        }
      }
      navigation.navigate("Chrono");
    } catch (error) {
      console.error(t("Error saving data:"), error);
      Alert.alert(t("Error"), t("An error occurred while saving data."));
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{t("Check your work mode:")}</Text>
        
        <TouchableOpacity
          style={[
            styles.checkbox,
            workMode === "presentiel" && styles.selectedCheckbox,
          ]}
          onPress={() => handleWorkMode("presentiel")}
        >
          <Text style={styles.checkboxLabel}>{t("On-site Work")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.checkbox,
            workMode === "remote" && styles.selectedCheckbox,
          ]}
          onPress={() => handleWorkMode("remote")}
        >
          <Text style={styles.checkboxLabel}>{t("Remote Work")}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCommencer}>
        <Text style={styles.buttonText}>{t("I've started")}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "cernter",

    marginLeft: 20,
    marginTop: "auto",
    paddingEnd: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 21,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginLeft: 20,
    padding: 10,
  },
  checkbox: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    width: 350,
  },
  selectedCheckbox: {
    backgroundColor: "#9AD0D3",
  },
  checkboxLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    color: colors.dark,
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: colors.beige,
    width: "90%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    margin: 20,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
});

export default PointageUser;
