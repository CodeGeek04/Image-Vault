import React from 'react';
import {View, Text, Image, Button, Dimensions, StyleSheet} from 'react-native';
import {getPresignedUrl} from '../services/awsService';

const ExpandImage = ({route, navigation}) => {
  const {item, handleDelete} = route.params;

  const deleteImage = item => {
    handleDelete(item);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: getPresignedUrl(item)}} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={() => deleteImage(item)} color="red" />
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width, // Adjust width to fill screen
    height: Dimensions.get('window').height, // Adjust height to fill screen
    resizeMode: 'contain', // Ensure the entire image fits within the container
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
});

export default ExpandImage;
