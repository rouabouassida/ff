import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import colors from "../config/colors";
import axios from "axios";

const VacationManagement = () => {
  const [conge, setConge] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données de congé depuis votre API
        const responseConge = await axios.get(
          "http://192.168.1.15:3000/conge/getVacationData"
        );
        setConge(responseConge.data);
      } catch (error) {
        console.error("Error fetching data:", error.response.data.message);
        Alert.alert("Erreur", "Impossible de récupérer les données.");
      }
    };

    fetchData();
  }, []);

  const getworkingHours = async (nomPrenom) => {
    try {
      // Récupérer les heures travaillées depuis une autre API ou une autre méthode
      const responseHoursWorked = await axios.get(
        "http://192.168.1.15:3000/employees/calculateHoursWorked",
        {
          nomPrenom,
        }
      );
      setHoursWorked(responseHoursWorked.data);
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      Alert.alert("Error fetching data:", error.response.data.message);
    }
  };

  const handleConfirmation = (email) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir accorder ce congé ?",
      [
        {
          text: "Non",
          style: "cancel",
          onPress: () => {
            console.log("E-mail de refus envoyé");
          },
        },
        {
          text: "Oui",
          onPress: async () => {
            try {
              const res = await axios.post("http://192.168.1.15:3000/conge/verifier_conge",{
                email
              })

              Alert.alert(res.data.message);
              console.log(res.data.message);
            } 
            catch (error) {
              Alert.alert(error.response.data.message);
              console.log(error.response.data.message);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView horizontal={true} vertical={true}>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              Nom de l'employé
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              Nombre d'heures de travail (3 mois)
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              Date de début congé
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              Date de fin congé
            </Text>
            <Text style={[styles.headerCell, styles.cell, { width: "20%" }]}>
              Action
            </Text>
          </View>
          {conge.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {item.nomPrenom}
              </Text>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {/*                 {getworkingHours(item.nomPrenom)
                  && "N/A"}
                  
 */}N/A
              </Text>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {item.dateDebut}
              </Text>
              <Text style={[styles.cell, styles.text, { width: "20%" }]}>
                {item.dateFin}
              </Text>
              <TouchableOpacity
                onPress={() => handleConfirmation(item.email)}
                style={[styles.button, { width: "20%" }]}
              >
                <Text style={styles.buttonText}>Gérer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
