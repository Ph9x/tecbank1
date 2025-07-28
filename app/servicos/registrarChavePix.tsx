import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { getAuthHeader } from "../services/tokenService";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

type ChaveStatus = "cadastrada" | "nao_cadastrada" | "carregando";

interface ChavePix {
    tipo: "cpf" | "email" | "telefone";
    valor: string;
    status: ChaveStatus;
}

export default function ChavePixScreen() {
    const [usuarioDados, setUsuarioDados] = useState({
        cpf: "",
        email: "",
        telefone: "",
    });

    const [chaves, setChaves] = useState<ChavePix[]>([
        { tipo: "cpf", valor: "", status: "carregando" },
        { tipo: "email", valor: "", status: "carregando" },
        { tipo: "telefone", valor: "", status: "carregando" },
    ]);

    const carregarDados = async () => {
        try {
            const authHeader = await getAuthHeader();

            //DADOS DO USUÁRIO
            const respUsuario = await fetch("http://coloque_seu_ip_aqui/usuario/me", {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader,
                },
            });

            if (!respUsuario.ok) {
                Alert.alert("Erro", "Erro ao carregar dados do usuário.");
                return;
            }

            const dataUsuario = await respUsuario.json();

            const novasChaves: ChavePix[] = [
                { tipo: "cpf", valor: dataUsuario?.cpf ?? "", status: "carregando" },
                { tipo: "email", valor: dataUsuario?.email ?? "", status: "carregando" },
                { tipo: "telefone", valor: dataUsuario?.celular ?? "", status: "carregando" },
            ];

            setUsuarioDados({
                cpf: dataUsuario?.cpf ?? "",
                email: dataUsuario?.email ?? "",
                telefone: dataUsuario?.celular ?? "",
            });

            setChaves(novasChaves);

            //LISTAR CHAVES PIX CADASTRADAS
            const respChaves = await fetch(
                "http://coloque_seu_ip_aqui/usuario/consultar-chavepix",
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader,
                    },
                }
            );

            if (!respChaves.ok) {
                Alert.alert("Erro", "Erro ao carregar chaves cadastradas.");
                return;
            }

            const chavesCadastradas = await respChaves.json();

            const chavesAtualizadas: ChavePix[] = novasChaves.map((chave) => {
                const existe = chavesCadastradas.some(
                    (c: any) => c.tipo === chave.tipo && c.chave === chave.valor
                );
                return {
                    ...chave,
                    status: existe ? "cadastrada" : "nao_cadastrada",
                };
            });

            setChaves(chavesAtualizadas);
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    //CADASTRAR UMA CHAVE PIX
    const cadastrarChave = async (tipoChave: string, chave: string) => {
        try {
            const authHeader = await getAuthHeader();

            const response = await fetch(
                "http://coloque_seu_ip_aqui/usuario/chave-pix",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader,
                    },
                    body: JSON.stringify({ tipoChave, chave }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                Alert.alert("Erro", data.message || "Erro ao cadastrar chave Pix");
                return;
            }

            Alert.alert("Sucesso", "Chave Pix cadastrada com sucesso!");
            carregarDados();
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        }
    };

    //DELETAR ALGUMA CHAVE PIX
    const excluirChave = async (chave: string) => {
        try {
            const authHeader = await getAuthHeader();

            const response = await fetch(
                "http://coloque_seu_ip_aqui/usuario/delete-chavepix",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader,
                    },
                    body: JSON.stringify({ chave }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                Alert.alert("Erro", data.message || "Erro ao excluir chave Pix");
                return;
            }

            Alert.alert("Sucesso", "Chave Pix excluída com sucesso!");
            carregarDados();
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        }
    };

    const toggleChave = (chave: ChavePix) => {
        if (chave.status === "cadastrada") {
            Alert.alert(
                "Confirmação",
                `Deseja excluir a chave ${chave.tipo.toUpperCase()}?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Excluir",
                        style: "destructive",
                        onPress: () => excluirChave(chave.valor),
                    },
                ]
            );
        } else if (chave.status === "nao_cadastrada") {
            Alert.alert(
                "Confirmação",
                `Deseja cadastrar a chave ${chave.tipo.toUpperCase()}?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Cadastrar",
                        onPress: () => cadastrarChave(chave.tipo, chave.valor),
                    },
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MINHAS CHAVES PIX</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {chaves.map((chave) => (
                    <View key={chave.tipo} style={styles.chaveContainer}>
                        <Text style={styles.chaveTipo}>{chave.tipo.toUpperCase()}</Text>
                        <Text style={styles.chaveValor}>
                            {chave.valor ? chave.valor : "Não disponível"}
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                chave.status === "cadastrada"
                                    ? styles.buttonExcluir
                                    : styles.buttonAdicionar,
                            ]}
                            onPress={() => toggleChave(chave)}
                            disabled={chave.valor === ""}
                        >
                            <Text style={styles.buttonText}>
                                {chave.status === "cadastrada" ? "Excluir" : "Adicionar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#333",
    },
    header: {
        height: 80,
        backgroundColor: "#333",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 25,
        borderBottomWidth: 3,
        borderColor: "#993399",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        paddingTop: 50,
    },
    chaveContainer: {
        backgroundColor: "#444",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    chaveTipo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ccc",
    },
    chaveValor: {
        fontSize: 16,
        color: "#eee",
        marginVertical: 8,
    },
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonAdicionar: {
        backgroundColor: "#4CAF50",
    },
    buttonExcluir: {
        backgroundColor: "#E53935",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
