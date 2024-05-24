import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../Screens/LanguageContext'; 
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const AccountScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const menuItems = [
    {
      title: t("Edit_Name"),
      icon: {
        name: "account-edit",
        backgroundColor: colors.primary,
      },
      screen: "EditName",
    },
    {
      title: t("Edit_Password"),
      icon: {
        name: "account-key",
        backgroundColor: colors.secondary,
      },
      screen: "EditPassword",
    },
    {
      title: t("Modifier_Language"),
      icon: {
        name: "account-tie-outline",
        backgroundColor: colors.caramel,
      },
      screen: "ModifierLanguage",
    },
  ];

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchFullname = async () => {
      try {
        const storedFullname = await AsyncStorage.getItem("fullname");
        if (storedFullname) {
          setFullname(storedFullname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFullname();

    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmail();
  }, []);

  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    // Afficher une alerte de confirmation
    Alert.alert(
      t("Confirm_Logout"),
      t("Logout_Message"),
      [
        {
          text: t("Cancel"),
          onPress: () => console.log("Déconnexion annulée"),
          style: "cancel"
        },
        {
          text: t("Yes"),
          onPress: async () => {
            try {
              const res = await axios.post("http://192.168.1.15:3000/user/logout");
              if (res.status === 200) {
                // Supprimez les données d'authentification stockées localement
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("fullname");
  
                // Réinitialisez l'état de la navigation pour nettoyer l'historique de la pile
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }
            } catch (error) {
              console.error("Erreur lors de la déconnexion", error);
              // Affichez un message d'erreur si la déconnexion échoue
              alert(t("Logout_Failed"));
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
    blurRadius={10}

    style={styles.background}
    source={require("../assets/a3.png")}
  >
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={fullname}
          subTitle={email}
          image={require("../assets/utilisateur.png")}
        />
      </View>
      <View style={styles.container}>
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
        />
      </View>
      <ListItem
        title={t("Logout")}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
    </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
  },
  container: {
    marginVertical: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent:"stretch"
  },
});

export default AccountScreen;
