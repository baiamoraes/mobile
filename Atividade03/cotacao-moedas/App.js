import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DolarScreen from './src/screens/Dolar';
import EuroScreen from './src/screens/Euro';

const DrawerNavigator = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator initialRouteName="Dólar Americano">
        <DrawerNavigator.Screen name="Dólar Americano" component={DolarScreen} />
        <DrawerNavigator.Screen name="Euro" component={EuroScreen} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}

export default App;
