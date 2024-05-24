import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from "react-native";
import { useTranslation } from "react-i18next"; // Importation du hook useTranslation
import colors from "../config/colors";
import axios from "axios";

const GererRemote = () => {
  const { t, i18n } = useTranslation(); // Initialisation du hook useTranslation
  const [Remote, setRemote] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRemote = await axios.get(
          "http://192.168.1.15:3000/remote/getRemoteData"
        );
        const filteredRemote = responseRemote.data.filter((Remote)=>Remote.verified == false);       
        setRemote(filteredRemote);
      } catch (error) {
        console.error("Error fetching data:", error.response.data.message);
        Alert.alert(t("error"), t("fetchDataError"));
      }
    };

    fetchData();
  }, []);

  const handleConfirmation = (item) => {
    const { email, nomPrenom, date } = item;
    Alert.alert(t("confirmationTitle"), t("confirmationMessage2", { email }), [
      {
        text: t("noOption"),
        style: "cancel",
        onPress: () => {
          console.log("E-mail de refus envoyé");
        },
      },
      {
        text: t("yesOption"),
        onPress: async () => {
          try {
            const res = await axios.post(
              "http://192.168.1.15:3000/remote/verify",
              {
                email,
                nomPrenom,
                date,
              }
            );

            Alert.alert(res.data.message);
            console.log(res.data.message);
          } catch (error) {
            Alert.alert(t("error"), error.response.data.message);
            console.log(error.response.data.message);
          }
        },
      },
    ]);
  };

  return (
    <ImageBackground
    blurRadius={10}
    style={styles.background}
    source={require("../assets/a3.png")}
  >
    <ScrollView horizontal={true} vertical={true}>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
            {t("employeeName")}
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "40%" }]}>
            {t("Email")}
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
            {t("date")}
            </Text>
            
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              {t("action")}
            </Text>
          </View>
          {Remote.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {item.nomPrenom}
              </Text>
              <Text style={[styles.cell, styles.text, { width: "40%" }]}>
                {item.email}
              </Text>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {item.date}
              </Text>
              
              <TouchableOpacity
                onPress={() => handleConfirmation(item)}
                style={[styles.button, { width: "20%" }]}
              >
                <Text style={styles.buttonText}>{t("manage")}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    minWidth: "100%",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"

  },
  button: {
    backgroundColor: colors.beige,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f2f2f2",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  cell: {
    textAlign: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  text: {
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
  },
});

export default GererRemote;
