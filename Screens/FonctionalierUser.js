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
import { useTranslation } from "react-i18next"; // Importer la fonction useTranslation pour utiliser la traduction

function FonctionaliterUser(props) {
  const { t } = useTranslation(); // Initialiser la fonction de traduction

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

        style={styles.background}
        source={require("../assets/a3.png")}
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
            <Text style={styles.text}>{t("pointage")}</Text>
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
            <Text style={styles.text}>{t("gererConge")}</Text>
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
            <Text style={styles.text}>{t("demandeTravailEnLigne")}</Text>
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
            <Text style={styles.text}>{t("consulterDisposition")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={handleSettings}
          >
            <View style={styles.circle5}>
              <Image
                source={require("../assets/seetings.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>{t("gererCompte")}</Text>
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
    justifyContent: "center",
    alignContent:"stretch"

  },
  container: {
    flex: 1,
    padding:30,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  circle1: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D8BF9F",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle2: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#BEC6C3",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle3: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E9BC8B",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle4: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3D4A55",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  circle5: {
    width: 120,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#AAA245",
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
