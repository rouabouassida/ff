import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import defaultStyles from "../config/styles";

function AppPass({ name, icon, ...otherProps }) {
  const [showPassword, setShowPassword] = useState(false);
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  const handleBlur = () => {
    setFieldTouched(name);
  };

  const handleChangeText = (text) => {
    handleChange(name)(text);
  };

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
        placeholderTextColor={defaultStyles.colors.medium}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        style={[defaultStyles.text, styles.textInput]}
        secureTextEntry={!showPassword}
        {...otherProps}
      />
      
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="grey"
          style={styles.eyeIcon}
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
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AppPass;
