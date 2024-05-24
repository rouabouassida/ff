import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,Modal
} from "react-native";
import axios from "axios"; // Import d'Axios
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next"; // Import de useTranslation

function Chrono(props) {
  // État du chronomètre
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [exitTime, setExitTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState("00:00:00");
  const [entryTime, setEntryTime] = useState(null); // Définissez l'heure d'entrée

  // Fonction pour formater le temps en heures, minutes et secondes
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };
  const [showContent, setShowContent] = useState(false);
  const scaleValue = new Animated.Value(0);

useEffect(() => {

    const displaySequentialNotifications = async () => {
      const workMode = await AsyncStorage.getItem("workMode");
      if (workMode === "remote") {
        const numberOfNotifications = 5;
        for (let i = 0; i < numberOfNotifications; i++) {
          
          const randomTime = Math.floor(Math.random() * 6000) + 3000;
          await new Promise(resolve => setTimeout(resolve, randomTime));
          setShowContent(true);
        }
      }
    }
    displaySequentialNotifications();
  }, []);

  const { t, i18n } = useTranslation(); // Récupération de la fonction de traduction

const handleClose = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowContent(false));
  };
  const animate = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const contentScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  useEffect(() => {
    let interval = null;
    if (isActive && !isPause) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        // Définissez l'heure d'entrée lorsque le chronomètre démarre
        if (!entryTime) {
          setEntryTime(formatTime(new Date().getTime()));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPause]);

  const handleContinue = () => {
    setIsPause(false);
    setIsActive(true);
  };

  const handleRestart = () => {
    setTimer(0);
    setIsPause(false);
    setIsActive(true);
    setEntryTime(formatTime(new Date().getTime())); // Définissez l'heure d'entrée à nouveau lors du redémarrage
  };

  const handlePause = () => {
    setIsPause(true);
    setIsActive(false);
    if (!exitTime) {
      setExitTime(formatTime(new Date().getTime())); // Mettez à jour l'heure de sortie si elle n'est pas déjà définie
    }
  };

  const sendDataToServer = async () => {
    const entryId = await AsyncStorage.getItem("entryId");
    try {
      const response = await axios.patch(
        `http://192.168.1.15:3000/employees/updateExitTimeAndHoursWorked/${entryId}`,
        {
          exitTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          hoursWorked: formatTime(timer),
        }
      );
      console.log("Données envoyées avec succès :", response.data);
      setTimer(0);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi des données :",
        error
      );
    }
  };

  const handleFinish = () => {
    setIsPause(true); // Mettre en pause le chrono
    setIsActive(false); // Arrêter le chrono
    setElapsedTime(timer);

    // Mettre à jour le temps de sortie avec l'heure actuelle
    const currentTime = new Date();
    const formattedExitTime = formatTime(
      currentTime.getHours(),
      currentTime.getMinutes(),
      currentTime.getSeconds()
    );
    setExitTime(formattedExitTime);

    // Calculer les heures travaillées à partir du temps écoulé dans le chrono
    const hoursWorkedInSeconds = timer;
    const formattedHoursWorked = formatTime(
      Math.floor(hoursWorkedInSeconds / 3600),
      Math.floor((hoursWorkedInSeconds % 3600) / 60),
      hoursWorkedInSeconds % 60
    );
    setHoursWorked(formattedHoursWorked);

    // Envoyer les données au serveur
    sendDataToServer();
  };

  // Rendu du composant
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/a3.png")}
    >
      {/* Titre */}
      <Text style={styles.tagtitle}> {t("Good_Work")} </Text>

      {/* Conteneur principal */}
      <View style={styles.container}>
        {/* Affichage du temps écoulé */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>

        {/* Boutons d'action */}
        <View style={styles.buttonContainer}>
          {/* Bouton Pause ou Continue en fonction de l'état */}
          <TouchableOpacity
            style={styles.button}
            onPress={isPause ? handleContinue : handlePause}
          >
            <Text style={styles.buttonText}>
              {isPause ? t("Continue") : t("Pause")}
            </Text>
          </TouchableOpacity>

          {/* Bouton Redémarrer */}
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>{t("Restart")}</Text>
          </TouchableOpacity>

          {/* Bouton Terminer */}
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>{t("Finish")}</Text>
          </TouchableOpacity>
        </View>

       
        {elapsedTime > 0 && (
          <Text style={styles.elapsedTime}>
           {t("Elapsed_Time")}  {formatTime(elapsedTime)}
          </Text>
        )}
      </View>
         <Modal
        animationType="fade"
        transparent={true}
        visible={showContent}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ scale: contentScale }] },
            ]}
          >
            <Text>{t('This content appeared after a random time!')}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>{t('Close')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent:"stretch"
  },
  tagtitle: {
    fontSize: 1,
    marginTop: 30,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
  timerContainer: {
    width: 250,
    height: 250,
    borderRadius: 170,
    borderWidth: 3,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  timer: {
    fontSize: 60,
    color: "#790423",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 100,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.beige,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  elapsedTime: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "normal",
  },
  closeButtonText: {
    color: "white",
    backgroundColor: "blue",
    textAlign: "center",
    padding: 5,
    borderRadius: 7,
    width: 65,
  },modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    fontSize: 30,
  },
  closeButton: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

});

// Export du composant Chrono
export default Chrono;
