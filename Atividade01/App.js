import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempo: 0.00,
      rodando: false,
      ultimoTempo: 0,
      img: require('./assets/cronometro.png'),
    };

    this.Cronometro = null;
    this.iniciarCronometro = this.iniciarCronometro.bind(this);
    this.zerarCronometro = this.zerarCronometro.bind(this);
  }

  iniciarCronometro() {
    const { rodando, tempo } = this.state;
    
    if (rodando) {
      clearInterval(this.Cronometro);
    } else {
      const inicio = Date.now() - tempo * 1000;
      this.Cronometro = setInterval(() => {
        const tempoDecorrido = (Date.now() - inicio) / 1000;
        this.setState({
          tempo: tempoDecorrido.toFixed(2),
        });
      }, 10);
    }

    this.setState({ rodando: !rodando });
  }

  zerarCronometro() {
    clearInterval(this.Cronometro);
    this.setState(prevState => ({
      ultimoTempo: prevState.tempo,
      tempo: 0.00,
      rodando: false,
    }));
  }

  limpa() {
    clearInterval(this.Cronometro);
  }

  render() {
    const { tempo, rodando, ultimoTempo, img } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={img} style={styles.img} />
          <Text style={styles.CronometroTexto}>{tempo}s</Text>
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botao} onPress={this.iniciarCronometro}>
            <View style={styles.btnArea}>
              <Text style={styles.btnTexto}>{rodando ? 'Pausar' : 'Iniciar'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={this.zerarCronometro}>
            <View style={styles.btnArea}>
              <Text style={styles.btnTexto}>Limpar</Text>
            </View>
          </TouchableOpacity>
        </View>

        {ultimoTempo > 0 && <Text style={styles.ultimoTempoTexto}>Último tempo: {ultimoTempo}s</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  img: {
    width: 200,
    height: 250,
  },

  CronometroTexto: {
    position: 'absolute',
    fontSize: 30,
    top: 130,
    color: '#dd7b22',
    fontWeight: 'bold',
  },

  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '60%',
  },

  botao: {
    width: '45%',
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius: 25,
  },

  btnArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22',
  },

  ultimoTempoTexto: {
    fontSize: 20,
    color: '#dd7b22',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default App;
