import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors"

const EmployeeTable = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredDate, setFilteredDate] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.15:3000/employees/getAllEmployees/"
        );
        setAllEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered employees with all employees
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilterByDate = () => {
    // Convertir filteredDate en format "jj/mm/aaaa"
    const [day, month, year] = filteredDate.split("/");
    const formattedFilteredDate = `${day.padStart(2, "0")}/${month.padStart(
      2,
      "0"
    )}/${year}`;
  
    // Filtrer les employés par la date fournie
    const filteredEmployees = allEmployees.filter((employee) =>
      employee.entries.some((entry) => employee.date === formattedFilteredDate)
    );
    console.log(filteredEmployees)
    setFilteredEmployees(filteredEmployees);
  };
  
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };
  
  return (
<View style={styles.container}>
  <TextInput
    style={styles.textField}
    placeholder="Filtrer par date (jj/mm/aaaa)"
    value={filteredDate}
    onChangeText={(text) => setFilteredDate(text)}
  />
  <TouchableOpacity style={styles.button} onPress={handleFilterByDate}>
    <Text style={styles.buttonText}>Filtrer</Text>
  </TouchableOpacity>
  <ScrollView
    style={styles.tableContainer}
    
>
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Date </Text>
        <Text style={styles.headerCell}>Nom</Text>
        <Text style={styles.headerCell}>Date de entre</Text>
        <Text style={styles.headerCell}>Date de sortie</Text>
        <Text style={styles.headerCell}>Mode de travail</Text>
        <Text style={styles.headerCell}>Nombre d'heures</Text>
      </View>
      {filteredEmployees.map((employee) =>
        employee.entries.map((entry, index) => (
          <View key={`${employee._id}-${index}`} style={styles.row}>
            <Text style={styles.cell}> {employee.date}</Text>
            <Text style={styles.cell}>{entry.fullname}</Text>
            <Text style={styles.cell}>{entry.entryTime}</Text>
            <Text style={styles.cell}>{entry.exitTime}</Text>
            <Text style={styles.cell}>{entry.workMode}</Text>
            <Text style={styles.cell}>{entry.hoursWorked}</Text>
          </View>
        ))
      )}
    </View>
  </ScrollView>

</View>





    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: colors.beige,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  tableContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: colors.light, // Ajoutez la couleur de fond pour les en-têtes
  },
  headerCell: {
    flex: 1,
    padding: 5,
    fontWeight: "bold", // Ajoutez la mise en forme en gras pour les en-têtes
  },
});

export default EmployeeTable;
