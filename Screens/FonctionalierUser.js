import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

function FonctionaliterUser(props) {
  const navigation = useNavigation();

  const handlePointagePress = () => {
    navigation.navigate("PointageUser");
  };
  const handleCongéPress = () => {
    navigation.navigate("GererConge");
  };
  const handleRemotePress = () => {
    navigation.navigate("DemandeRemote");
  };
  const handleDispositionPress = () => {
    navigation.navigate("DispositionUser");
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground
        blurRadius={50}
        style={styles.background}
        source={require("../assets/welcomebackground.jpg")}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handlePointagePress}
          >
            <View style={styles.circle1}>
              <Image
                source={require("../assets/pointage.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>pointager</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handleCongéPress}
          >
            <View style={styles.circle2}>
              <Image
                source={require("../assets/congé.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>Gérer le congé</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handleRemotePress}
          >
            <View style={styles.circle3}>
              <Image
                source={require("../assets/remote.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>Demande de travail en ligne</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handleDispositionPress}
          >
            <View style={styles.circle4}>
              <Image
                source={require("../assets/localisation.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>Consulter disposition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handleSettings}
          >
            <View style={styles.circle4}>
              <Image
                source={require("../assets/seetings.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>Gérer compte</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  circle1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.marron,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.marron,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.marron,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle4: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.marron,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
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

export default FonctionaliterUser;