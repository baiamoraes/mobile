import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaCriarTurma({ navigation, route }) {
  const [nomeTurma, setNomeTurma] = useState('');

  const criarTurma = () => {
    if (nomeTurma.trim() !== '') {
      route.params.adicionarTurma({ id: Date.now().toString(), nome: nomeTurma });
      navigation.goBack();
    }
  };

  return (
    <View style={estilos.container}>
      <Image source={require('../assets/people.jpg')} style={estilos.logo} />
      <Text style={estilos.titulo}>Nova Turma</Text>
      <Text style={estilos.subTitulo}>{'crie uma turma para adicionar pessoas'}</Text>
      <TextInput
        style={estilos.campoTexto}
        placeholder="Nome da turma"
        placeholderTextColor="#7C7C8A"
        value={nomeTurma}
        onChangeText={setNomeTurma}
      />
      <TouchableOpacity style={estilos.botao} onPress={criarTurma}>
        <Text style={estilos.textoBotao}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202024',
    padding: 16,
  },
  logo: {
    width: 56,
    height: 56,
    marginBottom: 10,
    marginTop: -210,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  subTitulo: {
    fontSize: 20,
    color: '#7C7C8A',
    marginBottom: 40,
  },
  campoTexto: {
    width: '100%',
    backgroundColor: '#121214',
    padding: 12,
    fontSize: 16,
    height: 50,
    marginBottom: 20,
    borderRadius: 6,
    color: '#7C7C8A',
  },
  botao: {
    backgroundColor: '#00875F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textoBotao: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
