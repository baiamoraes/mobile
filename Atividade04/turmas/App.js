import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import TelaTurmas from './src/screens/TelaTurmas';
import TelaCriarTurma from './src/screens/TelaCriarTurma';
import TelaTurmaDetalhes from './src/screens/TelaTurmaDetalhes';

const Stack = createStackNavigator();

function MeuApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TelaTurmas"
          component={TelaTurmas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCriarTurma"
          component={TelaCriarTurma}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#202024',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#333',
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Image
                  source={require('./src/assets/Logo.png')}
                  style={{ width: 46, height: 55, borderRadius: 15 }}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-outline" size={30} color="#FFF" />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="TelaTurmaDetalhes"
          component={TelaTurmaDetalhes} 
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#202024',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#333',
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-outline" size={30} color="#FFF" />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Image
                  source={require('./src/assets/Logo.png')}
                  style={{ width: 46, height: 55, borderRadius: 15 }}
                />
              </TouchableOpacity>
            )
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MeuApp;
