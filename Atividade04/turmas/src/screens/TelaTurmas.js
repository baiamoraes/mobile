import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaTurmas({ navigation }) {
  const [turmas, setTurmas] = useState([]);

  const adicionarTurma = (novaTurma) => {
    setTurmas((turmasAtuais) => [...turmasAtuais, novaTurma]);
  };

  const removerTurma = (idTurma) => {
    setTurmas((turmasAtuais) => turmasAtuais.filter((turma) => turma.id !== idTurma));
  };

  return (
    <View style={estilos.container}>
      <Image source={require('../assets/Logo.png')} style={estilos.logo} />
      <Text style={estilos.titulo}>Turmas</Text>
      <Text style={estilos.subTitulo}>{'Jogue com a sua turma'}</Text>
      {turmas.length === 0 ? (
        <Text style={estilos.mensagem}>Nenhuma turma criada ainda.</Text>
      ) : (
        <FlatList
          data={turmas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={estilos.itemLista} 
              onPress={() => navigation.navigate('TelaTurmaDetalhes', { turma: item, removerTurma })}
            >
              <Image source={require('../assets/Icons.png')} style={estilos.imagemTurma} />
              <Text style={estilos.textoTurma}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={estilos.lista}
        />
      )}
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('TelaCriarTurma', { adicionarTurma })}
      >
        <Text style={estilos.textoBotao}>Criar nova turma</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024',
    padding: 16,
  },
  logo: {
    width: 56,
    height: 66,
    marginBottom: 30,
    marginTop: 50,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitulo: {
    fontSize: 18,
    color: '#7C7C8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  mensagem: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    flexGrow: 1, 
    width: '100%',
    paddingVertical: 16, 
    marginBottom: 10, 
  },
  itemLista: {
    flexDirection: 'row',
    backgroundColor: '#29292E',
    padding: 32,
    marginVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  imagemTurma: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  textoTurma: {
    fontSize: 18,
    color: '#FFF',
    flex: 1, 
  },
  botao: {
    position: 'absolute', 
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#00875F',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
