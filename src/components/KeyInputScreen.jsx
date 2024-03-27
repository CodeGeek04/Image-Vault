import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const password = 'yourpassword';

const KeyInputScreen = ({navigation}) => {
  const [encryptionKey, setEncryptionKey] = useState('');

  const handleNext = () => {
    if (encryptionKey.trim() === '') {
      alert('Please enter an encryption key.');
      return;
    }

    if (encryptionKey !== password) {
      alert('Invalid password.');
      return;
    }

    // navigation.navigate('ImageUpload', {key: encryptionKey});
    navigation.navigate('ImageList', {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={encryptionKey}
        onChangeText={text => setEncryptionKey(text)}
      />
      <Button title="Next" onPress={handleNext} color="#6A0DAD" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E1FF', // Light purple background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD', // Dark purple text color
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6A0DAD', // Dark purple border color
    borderRadius: 5,
  },
});

export default KeyInputScreen;
