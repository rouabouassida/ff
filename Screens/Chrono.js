import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios"; // Import d'Axios
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Chrono(props) {
  // État du chronomètre
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [exitTime, setExitTime] = useState(null);
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
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      {/* Titre */}
      <Text style={styles.tagtitle}> Bon Travail ... </Text>

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
              {isPause ? "Continue" : "Pause"}
            </Text>
          </TouchableOpacity>

          {/* Bouton Redémarrer */}
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>

          {/* Bouton Terminer */}
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Terminer</Text>
          </TouchableOpacity>
        </View>

        {/* Affichage du temps écoulé après arrêt */}
        <Text style={styles.elapsedTime}>
          Temps écoulé : {formatTime(timer)}
        </Text>
      </View>
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
    alignItems: "center",
  },
  tagtitle: {
    fontSize: 50,
    marginTop: 25,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  timer: {
    fontSize: 40,
    color: colors.marron,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 80,
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
});

// Export du composant Chrono
export default Chrono;
