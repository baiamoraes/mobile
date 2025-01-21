import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Input } from "@/components/Input";
import { useParticipantDatabase, ParticipantDatabase } from "@/database/useParticipantDatabase";

export default function Index() {
    const [name, setName] = useState("");
    const [participants, setParticipants] = useState<ParticipantDatabase[]>([]);
    const participantDatabase = useParticipantDatabase();

    async function loadParticipants() {
        try {
            const response = await participantDatabase.listAll();
            setParticipants(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddParticipant() {
        if (!name.trim()) {
            return Alert.alert("Erro", "O nome do participante não pode estar vazio.");
        }

        try {
            await participantDatabase.create({ name });
            setName("");
            await loadParticipants(); 
        } catch (error) {
            console.log(error);
        }
    }

    function handleRemoveParticipant(id: number, name: string) {
        Alert.alert(
            "Remover",
            `Remover o ${name}?`,
            [
                { text: "Não", style: "cancel" },
                {
                    text: "Sim",
                    onPress: async () => {
                        try {
                            await participantDatabase.remove(id);
                            await loadParticipants();
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }

    useEffect(() => {
        loadParticipants();
    }, []);

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: "#121212" }}>
            <Text style={{ color: "#FDFCFE", fontSize: 24, marginBottom: 16 }}>Nome do evento</Text>
            <Text style={{ color: "#6B6B6B", fontSize: 16, marginBottom: 32 }}>Sexta, 4 de Novembro de 2022.</Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
                <Input
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setName}
                    value={name}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        marginRight: 8,
                        height: 70,
                        backgroundColor: '#1F1E25', 
                        borderRadius: 8,
                        paddingLeft: 14, 
                        color: '#FDFCFE',
                    }}
                />
                <TouchableOpacity
                    onPress={handleAddParticipant}
                    style={{
                        backgroundColor: '#31CF67',
                        height: 70,
                        width: 70,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MaterialIcons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <Text style={{ color: "#FDFCFE", fontSize: 25, marginBottom: 16, marginTop: 20}}>Participantes</Text>
            <FlatList
                data={participants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#1E1E1E",
                            padding: 16,
                            borderRadius: 8,
                            marginBottom: 12,
                            height: 70,
                        }}
                    >
                        <Text style={{ flex: 1, color: "#FDFCFE", fontSize: 19}}>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => handleRemoveParticipant(item.id, item.name)}
                            style={{
                                backgroundColor: "#E23C44",
                                height: 70,
                                width: 70,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: -16,
                            }}
                        >
                            <MaterialIcons name="remove" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={{ color: "#FDFCFE", fontSize: 18, textAlign: "center", marginTop: 16, lineHeight: 17, paddingHorizontal: 8 }}>
                        Ninguém chegou no evento ainda? {"\n"}Adicione participantes à sua lista de presença.
                    </Text>
                )}
            />
        </View>
    );
}
