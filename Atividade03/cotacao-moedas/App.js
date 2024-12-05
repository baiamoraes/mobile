import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dolar from './src/screens/Dolar'; 
import Euro from './src/screens/Euro';  

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dólar">
        <Drawer.Screen name="Dólar Americano" component={Dolar} />
        <Drawer.Screen name="Euro" component={Euro} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
