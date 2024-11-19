import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const inputLatitude = useRef(null);
  const inputLongitude = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '3496ae1dfc0e28d70684096ee2751d6a';

  async function fetchWeather() {
    if (!latitude || !longitude) {
      alert('Por favor, insira valores válidos de latitude e longitude');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        alert('Erro ao obter dados: ' + data.message);
      }
      Keyboard.dismiss();
    } catch (error) {
      console.error('Erro na solicitação dos dados climáticos:', error);
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
        <Text style={styles.title}>Consulta de Clima</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
          keyboardType="numeric"
          ref={inputLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
          keyboardType="numeric"
          ref={inputLongitude}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#0782F9' }]} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Buscar Clima</Text>
        </TouchableOpacity>
      </View>

      {weatherDetails && (
        <View style={styles.weatherResult}>
          <View style={styles.weatherBox}>
            <Text style={styles.detailText}>Temperatura: {weatherDetails.temperatura}°C</Text>
            <Text style={styles.detailText}>Umidade: {weatherDetails.umidade}%</Text>
            <Text style={styles.detailText}>Descrição: {weatherDetails.descricao}</Text>
            <Text style={styles.detailText}>Vento: {weatherDetails.vento} m/s</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    height: 70,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
  weatherResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  weatherBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'flex-start',
    marginTop: -600,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'right',
  },
});
