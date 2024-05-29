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

const VacationManagement = () => {
  const { t } = useTranslation(); // Initialisation du hook useTranslation
  const [conge, setConge] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseConge = await axios.get(
          "http://192.168.1.15:3000/conge/getVacationData"
        );
        if (responseConge && responseConge.data) {
          const filteredConge = responseConge.data.filter((conge) => conge.verified == false);
          setConge(filteredConge);
        } else {
          Alert.alert(t("errorTitle"), t("noDataReceived"));
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la demande de congé:", error);
        if (error.response && error.response.data) {
          Alert.alert(t("errorTitle"), error.response.data.message);
        } else {
          Alert.alert(t("errorTitle"), "Une erreur s'est produite.");
        }
      }
    };

    fetchData();
  }, []);

  const handleConfirmation = (item) => {
    const { email, nomPrenom, dateDebut, dateFin, typeConge } = item;
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
              "http://192.168.1.15:3000/conge/verifier_conge",
              {
                email,
                nomPrenom,
                dateDebut,
                dateFin,
                typeConge
              }
            );

            if (res && res.data) {
              Alert.alert(res.data.message);
              console.log(res.data.message);
            } else {
              Alert.alert(t("errorTitle"), t("noResponseFromServer"));
            }
          } catch (error) {
            if (error.response && error.response.data) {
              Alert.alert(t("errorTitle"), error.response.data.message);
            } else {
              Alert.alert(t("errorTitle"), t("requestFailed"));
            }
            console.log(error.response ? error.response.data.message : error);
          }
        },
      },
    ]);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView horizontal={true} vertical={true}>
        <View style={styles.container}>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.cell, { width: "16.6%" }]}>
                {t("employeeName")}
              </Text>
              <Text style={[styles.headerCell, styles.cell, { width: "16.6%" }]}>
                {t("workedHours")}
              </Text>
              <Text style={[styles.headerCell, styles.cell, { width: "16.6%" }]}>
                {t("startDate")}
              </Text>
              <Text style={[styles.headerCell, styles.cell, { width: "16.6%" }]}>
                {t("endDate")}
              </Text>
              <Text style={[styles.headerCell, styles.cell, { width: "16.6%" }]}>
                {t("typeconge")}
              </Text>
              <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
                {t("action")}
              </Text>
            </View>
            {conge.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.cell, styles.text, { width: "16.6%" }]}>
                  {item.nomPrenom}
                </Text>
                <Text style={[styles.cell, styles.text, { width: "16.6%" }]}>
                  {item.hoursWorked}
                </Text>
                <Text style={[styles.cell, styles.text, { width: "16.6%" }]}>
                  {item.dateDebut}
                </Text>
                <Text style={[styles.cell, styles.text, { width: "16.6%" }]}>
                  {item.dateFin}
                </Text>
                <Text style={[styles.cell, styles.text, { width: "16.6%" }]}>
                  {item.typeConge}
                </Text>
                <TouchableOpacity
                  onPress={() => handleConfirmation(item)}
                  style={[styles.button, { width: "16.6%" }]}
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
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
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

export default VacationManagement;
