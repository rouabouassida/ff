import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { useTranslation } from 'react-i18next';
import colors from "../config/colors";
import Icon from "../components/Icon";

const EmployeeTable = () => {
  const { t } = useTranslation();
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredDatePlaceholder, setFilteredDatePlaceholder] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.15:3000/employees/getAllEmployees/"
        );
        setAllEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredDatePlaceholder(t('filterByDate'));
  }, [t]);

  const handleFilterByDate = () => {
    const [day, month, year] = filteredDate.split("/");
    const formattedFilteredDate = `${day.padStart(2, "0")}/${month.padStart(
      2,
      "0"
    )}/${year}`;
  
    const filteredEmployees = allEmployees.filter((employee) =>
      employee.entries.some((entry) => employee.date === formattedFilteredDate)
    );
    setFilteredEmployees(filteredEmployees);
  };
  
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };
  
  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          placeholder={filteredDatePlaceholder}
          value={filteredDate}
          onChangeText={(text) => setFilteredDate(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleFilterByDate}>
          <Text style={styles.buttonText}>{t('filter')}</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.tableContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>{t('date')}</Text>
              <Text style={styles.headerCell}>{t('name')}</Text>
              <Text style={styles.headerCell}>{t('entryDate')}</Text>
              <Text style={styles.headerCell}>{t('exitDate')}</Text>
              <Text style={styles.headerCell}>{t('workMode')}</Text>
              <Text style={styles.headerCell}>{t('hoursWorked')}</Text>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              filteredEmployees.map((employee) =>
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
              )
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
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
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"
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
    backgroundColor: colors.claire,
  },
  headerCell: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
  },
});

export default EmployeeTable;
