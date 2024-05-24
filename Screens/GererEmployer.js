import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

function GererEmployer() {
  const { t } = useTranslation(); // Utiliser la fonction de traduction
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  const menuItems = [
    {
      title: t("Suivie Employé"),
      icon: {
        name: "account-eye",
        backgroundColor: colors.medium,
      },
      screen: "SuivieEmployer",
    },
    {
      title: t("Ajouter Employé"),
      icon: {
        name: "account-plus",
        backgroundColor: colors.medium,
      },
      screen: "AjouterEmployer",
    },
    {
      title: t("Modifier Employé"),
      icon: {
        name: "account-edit",
        backgroundColor: colors.medium,
      },
      screen: "ModifierEmployer",
    },
    {
      title: t("Supprimer Employé"),
      icon: {
        name: "account-remove",
        backgroundColor: colors.danger,
      },
      screen: "Supprimer",
    },
  ];

  return (
    <ImageBackground
    blurRadius={10}
    style={styles.background}
    source={require("../assets/a3.png")}
  >
    <Screen style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(menuItem) => menuItem.title}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <ListItem
              onPress={() => handleMenuItemPress(item.screen)}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
   
    flex: 1,
  },
  container: {
    paddingVertical: 30,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"

  },
});

export default GererEmployer;
