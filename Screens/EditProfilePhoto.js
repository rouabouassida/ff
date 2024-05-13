import React, { useState } from "react";
import { StyleSheet, View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SubmitButton from "../components/forms/SubmitButton";
const EditProfilePhoto = ({ currentPhoto, onSave, onSubmit }) => {
  const [photo, setPhoto] = useState(currentPhoto);

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission d'accès à la galerie refusée.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSavePhoto = () => {
    onSave(photo);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <SubmitButton title="Choisir une photo" onPress={handleChoosePhoto} />
      <SubmitButton title="Enregistrer" onPress={handleSavePhoto} />
      <SubmitButton title="Soumettre" onPress={() => onSubmit(photo)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default EditProfilePhoto;
