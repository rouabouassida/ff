import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const AccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // État pour suivre l'état de rafraîchissement

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
        name: "translate",
        backgroundColor: colors.caramel,
      },
      screen: "ModifierLanguage",
    },
  ];
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedFullname = await AsyncStorage.getItem("fullname");
        const storedEmail = await AsyncStorage.getItem("email");

        if (storedFullname && storedEmail) {
          setFullname(storedFullname);
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [refreshing]); // Rafraîchir les données lorsque refreshing change

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t("Confirm_Logout"),
      t("Logout_Message"),
      [
        {
          text: t("Cancel"),
          onPress: () => console.log("Déconnexion annulée"),
          style: "cancel",
        },
        {
          text: t("Yes"),
          onPress: async () => {
            try {
              const res = await axios.post(
                "http://192.168.1.15:3000/user/logout"
              );
              if (res.status === 200) {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("fullname");

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }
            } catch (error) {
              console.error("Erreur lors de la déconnexion", error);
              alert(t("Logout_Failed"));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Mettre à jour refreshing à false après un certain délai pour simuler la fin du rafraîchissement
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a3.png")}
    >
        <Screen style={styles.screen}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <>
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
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[colors.primary]}
                      tintColor={colors.primary}
                    />
                  }
                />
              </View>
              <ListItem
                title={t("Logout")}
                IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
                onPress={handleLogout}
              />
            </>
          )}
        </Screen>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    marginVertical: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent: "stretch",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountScreen;
