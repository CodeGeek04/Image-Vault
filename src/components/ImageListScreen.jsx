import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  listImagesFromBucket,
  getPresignedUrl,
  deleteImageFromBucket,
} from '../services/awsService';
import ExpandImage from './ExpandImage';

const ImageListScreen = ({route, navigation}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Retrieve image keys from AWS S3
        const imageKeys = await listImagesFromBucket();

        // Update the state with image keys
        setImages(imageKeys);
      } catch (error) {
        // Handle the error
        console.error('Error retrieving image keys:', error);
      }
    };

    fetchImages();

    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        fetchImages();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.refresh]);

  const handleUploadMore = () => {
    navigation.navigate('ImageUpload', {});
  };

  const handleSelect = item => {
    navigation.navigate('ExpandImage', {
      item: item,
      handleDelete: handleDelete,
    });
  };

  const handleDelete = async imageKey => {
    try {
      // Delete the image from the S3 bucket
      await deleteImageFromBucket(imageKey);

      // Refresh the list of images
      setImages(images.filter(item => item !== imageKey));
      setExpandedImage(null);
    } catch (error) {
      // Handle the error
      console.error('Error deleting image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>IMAGE VAULT</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: getPresignedUrl(item)}}
                style={styles.image}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.deleteButtonText}>Expand</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleUploadMore}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E1FF',
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: '#8338ec',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
  },
  flatListContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 50, // minor space at bottom
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1, // To maintain aspect ratio
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
  },
  deleteButton: {
    backgroundColor: '#8a2be2', // Attractive shade of purple
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  downloadButton: {
    backgroundColor: '#9932cc', // Contrasting shade of purple
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  downloadButtonText: {
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#800080', // Attractive shade of purple
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default ImageListScreen;
