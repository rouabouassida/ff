import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

const PointerUser = () => {
  const navigation = useNavigation();

  const handlePress1 = () => {
    navigation.navigate("AccountScreen");
  };
  const handlePress2 = () => {
    navigation.navigate("AccountScreen");
  };
  const handlePress3 = () => {
    navigation.navigate("AccountScreen");
  };
  const handlePress = () => {
    navigation.navigate("AccountScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress1}>
            <Image
              source={require("../assets/pointage.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Pointage</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress2}>
            <Image
              source={require("../assets/congé.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Gérer le congé</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress3}>
            <Image
              source={require("../assets/remote.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Demande de travail en remote</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image
              source={require("../assets/localisation.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Consulter disposition</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image
              source={require("../assets/gerer le compte.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Gérer compte</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.beige,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 120,
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PointerUser;
