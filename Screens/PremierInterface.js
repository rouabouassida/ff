import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

const PremierInterface = () => {
  const navigation = useNavigation();

  const handleSimpleUtilisateurPressRh = () => {
    navigation.navigate("LoginRh");
  };

  const handleRessourcesHumainesPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require("../assets/salut.png")} style={styles.image} />
        <Text style={styles.text}>Bienvenue !!</Text>
        <Text style={styles.text1}>Vous êtes...</Text>

        {/* Premier point */}
        <TouchableOpacity
          style={styles.button1}
          onPress={handleSimpleUtilisateurPressRh}
        >
          <Text style={styles.pointText}>Ressources Humaines</Text>
        </TouchableOpacity>

        {/* Deuxième point */}
        <TouchableOpacity
          style={styles.button2}
          onPress={handleRessourcesHumainesPress}
        >
          <Text style={styles.pointText}>Simple Utilisateur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#7e5835",
  },
  text1: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  background: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pointText: {
    fontSize: 18,
    marginRight: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  button1: {
    backgroundColor: colors.beige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 60,
    width: 300,
    marginVertical: 10,
    alignItems: "center",
  },
  button2: {
    backgroundColor: colors.beige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 60,
    width: 300,
    marginVertical: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  imageRH: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 50,
    marginLeft: 300,
    borderRadius: 50,
  },
  imageUSER: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 50,
    marginRight: 300,
    borderRadius: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 200,
    borderRadius: 100,
  },
});

export default PremierInterface;
