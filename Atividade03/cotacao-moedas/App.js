import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaDolar from './src/screens/TelaDolar';
import TelaEuro from './src/screens/TelaEuro';

const NavegacaoDrawer = createDrawerNavigator();

function MeuApp() {
  return (
    <NavigationContainer>
      <NavegacaoDrawer.Navigator initialRouteName="Dólar Americano">
        <NavegacaoDrawer.Screen name="Dólar Americano" component={TelaDolar} />
        <NavegacaoDrawer.Screen name="Euro" component={TelaEuro} />
      </NavegacaoDrawer.Navigator>
    </NavigationContainer>
  );
}

export default MeuApp;
