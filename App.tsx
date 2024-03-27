import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import KeyInputScreen from './src/components/KeyInputScreen';
import ImageUploadScreen from './src/components/ImageUploadScreen';
import ImageListScreen from './src/components/ImageListScreen';
import ExpandImage from './src/components/ExpandImage';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={KeyInputScreen}
            options={{title: 'Welcome', headerShown: false}}
          />
          <Stack.Screen
            name="ImageUpload"
            component={ImageUploadScreen}
            options={{title: 'Upload Image', headerShown: false}}
          />
          <Stack.Screen
            name="ImageList"
            component={ImageListScreen}
            options={{title: 'Image List', headerShown: false}}
          />
          <Stack.Screen
            name="ExpandImage"
            component={ExpandImage}
            options={{title: 'Expand Image', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
