// ImageUploadScreen.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadAndEncryptImage} from '../services/awsService';

const ImageUploadScreen = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageList = () => {
    navigation.navigate('ImageList', {refresh: true});
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }

    // Upload and encrypt the selected image
    const encryptedImageUri = await uploadAndEncryptImage(selectedImage);
    setSelectedImage(null);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: selectedImage}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Choose from Device</Text>
      </TouchableOpacity>
      {selectedImage && (
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={openImageList}>
        <Text style={styles.buttonText}>Show images</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5E1FF',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  image: {
    flex: 1,
  },
  button: {
    backgroundColor: '#800080',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageUploadScreen;
