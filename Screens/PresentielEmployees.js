import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

function PresentielEmployees() {
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPresentEmployees = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.15:3000/employees/presentiel"
        );
        if (response.data && response.data.length > 0) {
          setPresentEmployees(response.data);
        } else {
          setPresentEmployees([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
        setError(error.message);
      }
    };
    fetchPresentEmployees();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Une erreur s'est produite :</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Liste des employés travaillant en présentiel aujourd'hui :
      </Text>
      {presentEmployees.length === 0 ? (
        <Text style={styles.noEmployeeText}>
          Aucun employé présent aujourd'hui.
        </Text>
      ) : (
        presentEmployees.map((employee, index) => (
          <View style={styles.employeeItem} key={index}>
            <Text style={styles.fullname}>{employee.fullname}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  employeeItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  fullname: {
    fontSize: 20,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  noEmployeeText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default PresentielEmployees;
