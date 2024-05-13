import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Animated } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Pour l'opacité
  const imageSize = useRef(new Animated.Value(100)).current; // Commence à 150
  const textTranslate = useRef(new Animated.Value(100)).current; // Commence à 100 pixels du bas

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageSize, {
        toValue: 200,
        duration: 9000,
        useNativeDriver: false,
      }),
      Animated.timing(textTranslate, {
        toValue: 2,
        duration: 9000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate("Home"));
  }, [fadeAnim, imageSize, textTranslate, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationView, { opacity: fadeAnim }]}>
        <Animated.Image
          style={[styles.image, { width: imageSize, height: imageSize }]}
          source={require("../assets/logoF.png")}
        />
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{ translateY: textTranslate }],
            },
          ]}
        >
          Pointo System
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.milky,
  },
  animationView: {
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.caramel,
    marginTop: 10,
  },
});

export default Splash;