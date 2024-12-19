import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

export default function TelaTurmaDetalhes({ route, navigation }) {
  const { turma, removerTurma } = route.params;

  const [participantesTimeA, setParticipantesTimeA] = useState([]);
  const [participantesTimeB, setParticipantesTimeB] = useState([]);
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [timeAtivo, setTimeAtivo] = useState('A');



  
  const adicionarParticipante = () => {
    if (nomeParticipante.trim() !== '') {
      const novoParticipante = { id: Date.now().toString(), nome: nomeParticipante };

      if (timeAtivo === 'A') {
        setParticipantesTimeA((prev) => [...prev, novoParticipante]);
      } else {
        setParticipantesTimeB((prev) => [...prev, novoParticipante]);
      }
      setNomeParticipante('');
    }
  };

  const removerParticipante = (id) => {
    if (timeAtivo === 'A') {
      setParticipantesTimeA((prev) => prev.filter((participante) => participante.id !== id));
    } else {
      setParticipantesTimeB((prev) => prev.filter((participante) => participante.id !== id));
    }
  };

  const confirmarRemocao = () => {
    Alert.alert(
      'Remover Turma',
      `Tem certeza que deseja remover a turma "${turma.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            removerTurma(turma.id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{turma.nome}</Text>
      <Text style={estilos.subTitulo}>{'adicione a galera e separe os times'}</Text>

      <View style={estilos.inputContainer}>
        <TextInput
          style={estilos.campoTexto}
          placeholder="Nome do participante"
          placeholderTextColor="#7C7C8A"
          value={nomeParticipante}
          onChangeText={setNomeParticipante}
          color="#7C7C8A"
        />
        <TouchableOpacity onPress={adicionarParticipante} style={estilos.iconButton}>
          <Ionicons name="add-outline" size={30} color="#00875F" />
        </TouchableOpacity>
      </View>

      <View style={estilos.abasContainer}>
        <View style={estilos.abas}>
          <TouchableOpacity
            style={[estilos.aba, timeAtivo === 'A' && estilos.abaAtiva]}
            onPress={() => setTimeAtivo('A')}
          >
            <Text style={[estilos.textoAba, timeAtivo === 'A' && estilos.textoAbaAtiva]}>TIME A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.aba, timeAtivo === 'B' && estilos.abaAtiva]}
            onPress={() => setTimeAtivo('B')}
          >
            <Text style={[estilos.textoAba, timeAtivo === 'B' && estilos.textoAbaAtiva]}>TIME B</Text>
          </TouchableOpacity>
        </View>
        <Text style={estilos.contador}>
          {timeAtivo === 'A' ? participantesTimeA.length : participantesTimeB.length}
        </Text>
      </View>

      <FlatList
        data={timeAtivo === 'A' ? participantesTimeA : participantesTimeB}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.participante}>
            <Ionicons name="person" size={24} color="#C4C4CC" style={estilos.iconeParticipante} />
            <Text style={estilos.textoParticipante}numberOfLines={1}>{item.nome}</Text>
            <TouchableOpacity
              onPress={() => removerParticipante(item.id)}
              style={estilos.botaoRemoverParticipante}
            >
              <Ionicons name="close-outline" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={estilos.lista}
      />

      <TouchableOpacity style={estilos.botaoRemoverTurma} onPress={confirmarRemocao}>
        <Text style={estilos.textoBotaoRemover}>Remover Turma</Text>
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
  titulo: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    marginTop: 30,
  },
  subTitulo: {
    fontSize: 20,
    color: '#7C7C8A',
    marginBottom: 40,
  },
  abasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  abas: {
    flexDirection: 'row',
  },
  aba: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#202024',
    borderRadius: 5,
  },
  abaAtiva: {
    borderColor: '#00B37E',
    borderWidth: 2,
  },
  textoAba: {
    fontSize: 18,
    color: '#FFF',
  },
  textoAbaAtiva: {
    color: '#FFF',
  },
  contador: {
    fontSize: 16,
    color: '#C4C4CC',
    marginRight: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#121214',
    borderRadius: 8,
    height: 56,
  },
  campoTexto: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#121214',
    borderRadius: 8,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  participante: {
    flexDirection: 'row',
    backgroundColor: '#29292E',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '455',
  },
  textoParticipante: {
    fontSize: 18,
    color: '#FFF',
    flex: 1,
    
  },
  iconeParticipante: {
    marginRight: 15,
    marginLeft: 10,
    height: 18,
    width: 20,
  },
  botaoRemoverParticipante: {
    padding: 8,
  },
  lista: {
    flexGrow: 0,
    justifyContent: 'center',
    width: '100%',
  },
  botaoRemoverTurma: {
    backgroundColor: '#AA2834',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoRemover: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
