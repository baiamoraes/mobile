import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useTaxas from '../hooks/useTaxas';

export default function TelaEuro() {
  const { taxas, carregando, atualizarTaxas } = useTaxas();

  return (
    <View style={estilos.container}>
      <Image
        source={require('../../assets/euro.png')}
        style={estilos.imagem}
        resizeMode="contain"
      />
      <Text style={estilos.titulo}>O euro está:</Text>
      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={estilos.valor}>R$ {parseFloat(taxas.EUR).toFixed(2)}</Text>
      )}
      <TouchableOpacity style={estilos.botao} onPress={atualizarTaxas}>
        <Text style={estilos.textoBotao}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#052E44',
  },
  imagem: {
    width: 500,
    height: 150,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 36,
    marginBottom: 15,
    color: '#fff',
  },
  valor: {
    marginBottom: 25,
    color: '#fff',
    fontSize: 70,
  },
  botao: {
    backgroundColor: '#8ED78F',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});
