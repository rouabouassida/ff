import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function VideoScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Utiliser setTimeout pour naviguer vers une autre interface après la lecture automatique de la vidéo
    const timer = setTimeout(() => {
      navigation.navigate('LoginV'); 
    }, 5000); // 5000 millisecondes = 5 secondes

    // Nettoyer le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/s.mp4')} // Chemin relatif vers votre vidéo
        style={styles.video}
        useNativeControls={false} // Désactiver les contrôles natifs de la vidéo
        shouldPlay={true} // Démarrer automatiquement la lecture de la vidéo
        resizeMode="cover" // Ajuster la vidéo à la taille de l'écran
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: '80%',
    height: '80%',
  },
});
