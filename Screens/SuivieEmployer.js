import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios"; // Importation de Axios
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import colors from "../config/colors";

function SuivieEmployer() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [todayDate, setTodayDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  ); // Date d'aujourd'hui

  const handleFollow = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.15:3000/employees/getEmployeeInfoForToday/${name}`
      );
      setEmployeeInfo(response.data);
    } catch (error) {
      console.error("Error fetching employee info: ", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la récupération des informations de l'employé."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Screen style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Date d'aujourd'hui : {todayDate}</Text>
        </View>
        <AppForm initialValues={{ fullname: "" }} onSubmit={handleFollow}>
          <AppFormField
            autoCorrect={false}
            name="fullname"
            placeholder="Nom de l'employé"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <SubmitButton title="Suivre Employé" />
        </AppForm>
        <View style={styles.container}>
  {employeeInfo && (
    <View style={styles.employeeInfoContainer}>
      <Text style={styles.employeeInfoTitle}>Informations de l'employé</Text>
      {employeeInfo.map((employee, index) => (
        <View key={index} style={styles.employeeEntryContainer}>
          <View style={styles.entriesContainer}>
            {employee.entries.map((entry, entryIndex) => (
              <View key={entryIndex} style={styles.entryContainer}>
                <Text>Nom: {entry.fullname}</Text>
                <Text>Heure d'entrée: {entry.entryTime}</Text>
                <Text>Heure de sortie: {entry.exitTime}</Text>
                <Text>Heures travaillées: {entry.hoursWorked}</Text>
                <Text>Mode de travail: {entry.workMode}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  )}
</View>

      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 120,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeEntryContainer: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
    
  },
  employeeInfoTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: colors.beige,
  },
});

export default SuivieEmployer;
