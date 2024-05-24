import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const AppFormField = ({ name, icon, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color="#6e6969"
            style={styles.icon}
          />
        )}
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          {...otherProps}
          style={styles.textInput}
        />
      </View>
      {touched[name] && errors[name] && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    color: colors.black ,
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
    marginTop: -10,
  },
});

export default AppFormField;
