import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';

export default function App() {
  const [latitude, setLat] = useState('');
  const [longitude, setLong] = useState('');
  const inputRefLat = useRef(null);
  const inputRefLon = useRef(null);
  const [weatherData, setClima] = useState(null);

  const apiKey = '3496ae1dfc0e28d70684096ee2751d6a';

  async function aviso() {
    if (!latitude || !longitude) {
      alert('Digite valores válidos para latitude e longitude');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`
      );
      const data = await response.json();
      if (response.ok) {
        setClima(data);
      } else {
        alert('Erro: ' + data.message);
      }
      Keyboard.dismiss();
    } catch (error) {
      console.log('Erro ao buscar os dados climáticos: ' + error);
    }
  }

  const weatherDetails = useMemo(() => {
    if (!weatherData) return null;
    const { main, weather, wind } = weatherData;
    return {
      temperatura: main.temp,
      umidade: main.humidity,
      descricao: weather[0].description,
      vento: wind.speed,
    };
  }, [weatherData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <Text style={styles.text}>Consulta de Clima</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLat(text)}
          keyboardType="numeric"
          ref={inputRefLat}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={(text) => setLong(text)}
          keyboardType="numeric"
          ref={inputRefLon}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#0782F9' }]} onPress={aviso}>
          <Text style={styles.btnText}>Buscar Clima</Text>
        </TouchableOpacity>
      </View>

      {weatherDetails && (
        <View style={styles.resultado}>
          <View style={styles.climaBox}>
            <Text style={styles.itemText}>Temperatura: {weatherDetails.temperatura}°C</Text>
            <Text style={styles.itemText}>Umidade: {weatherDetails.umidade}%</Text>
            <Text style={styles.itemText}>Descrição: {weatherDetails.descricao}</Text>
            <Text style={styles.itemText}>Vento: {weatherDetails.vento} m/s</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  btn: {
    height: 70,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  btnText: {
    color: '#FFF',
    fontSize: 22,
  },
  resultado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -600,
  },
  climaBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'right',
  },
});
