import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";

function PresentielEmployees() {
  const { t } = useTranslation();
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // État pour suivre l'état de rafraîchissement
  const [loading, setLoading] = useState(true); // État de chargement initial

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
      console.error("Error fetching employees:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Désactiver le chargement lorsque la requête est terminée
      setRefreshing(false); // Désactiver le rafraîchissement lorsque la requête est terminée
    }
  };

  useEffect(() => {
    fetchPresentEmployees();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true); // Activer l'état de rafraîchissement
    fetchPresentEmployees();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error occurred:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>{t("presentEmployeesListTitle")}</Text>
          {presentEmployees.length === 0 ? (
            <Text style={styles.noEmployeeText}>{t("noEmployeePresent")}</Text>
          ) : (
            presentEmployees.map((employee, index) => (
              <View style={styles.employeeItem} key={index}>
                <Text style={styles.fullname}>{employee.fullname}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "stretch",
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
