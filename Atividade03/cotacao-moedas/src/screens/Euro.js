import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import useCotacao from '../hooks/useCotacao';

export default function Euro() {
  const { cotacao, loading, fetchCotacao } = useCotacao();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/euro.png')}  
        style={styles.image}
        resizeMode="contain"  
      />
      <Text style={styles.title}>O euro está:</Text>
      {loading ? <ActivityIndicator size="large" /> : <Text style={styles.value}>R$ {parseFloat(cotacao.EUR).toFixed(2)}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={fetchCotacao}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#052E44',
  },
  image: {
    width: 600,  
    height: 200, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: '#fff',
  },
  value: {
    marginBottom: 30,
    color: '#fff',
    fontSize: 80,
  },
  button: {
    backgroundColor: '#A7F278',  
    paddingVertical: 15,  
    paddingHorizontal: 25,  
    borderRadius: 10,  
    alignItems: 'center',  
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,  
    color: 'black',  
    fontWeight: 'bold',
  },
});

