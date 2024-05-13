import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, ...otherProps }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
                size={24}

        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        secureTextEntry={!showPassword} // Utilisez secureTextEntry en fonction de l'état showPassword
        {...otherProps}
      />
      {/* Ajoutez un TouchableOpacity pour basculer entre le mode masqué et non masqué */}
      <TouchableOpacity onPress={() => setShowPassword(!showPassword) }>
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="grey"
          style={{ paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    marginEnd:10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
