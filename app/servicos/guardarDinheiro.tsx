import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput,
    ActivityIndicator,
    Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { getAuthHeader } from "../services/tokenService";

type Caixinha = {
    id: string;
    nome: string;
    saldo: string; // vem como string do back-end
};

export default function GuardarDinheiroScreen() {
    const [nomeCaixinha, setNomeCaixinha] = useState("");
    const [caixinhas, setCaixinhas] = useState<Caixinha[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [carregandoCaixinhas, setCarregandoCaixinhas] = useState(true);

    // Modal states
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCaixinhaId, setModalCaixinhaId] = useState<string | null>(null);
    const [modalTipo, setModalTipo] = useState<"adicionar" | "resgatar" | null>(null);
    const [modalValor, setModalValor] = useState("");

    useEffect(() => {
        carregarCaixinhas();
    }, []);

    const carregarCaixinhas = async () => {
        try {
            setCarregandoCaixinhas(true);
            const authHeader = await getAuthHeader();

            if (!authHeader || !authHeader.Authorization) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const response = await fetch("http://coloque_seu_ip_aqui/usuario/caixinhas", {
                method: "GET",
                headers: {
                    ...authHeader,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setCaixinhas(data);
            } else {
                Alert.alert("Erro", data.message || "Erro ao buscar caixinhas.");
            }
        } catch (error) {
            console.error("Erro ao carregar caixinhas:", error);
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        } finally {
            setCarregandoCaixinhas(false);
        }
    };

    const criarCaixinha = async () => {
        if (!nomeCaixinha.trim()) {
            Alert.alert("Erro", "O nome da caixinha é obrigatório.");
            return;
        }

        try {
            setCarregando(true);
            const authHeader = await getAuthHeader();

            if (!authHeader || !authHeader.Authorization) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const response = await fetch("http://coloque_seu_ip_aqui/usuario/caixinha/criar", {
                method: "POST",
                headers: {
                    ...authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: nomeCaixinha }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", "Caixinha criada com sucesso!");
                setNomeCaixinha("");
                carregarCaixinhas();
            } else {
                Alert.alert("Erro", data.message || "Erro ao criar caixinha.");
            }
        } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    };

    // Função para abrir modal para adicionar ou resgatar
    const abrirModal = (caixinhaId: string, tipo: "adicionar" | "resgatar") => {
        setModalCaixinhaId(caixinhaId);
        setModalTipo(tipo);
        setModalValor("");
        setModalVisible(true);
    };

    // Função para confirmar ação do modal (adicionar ou resgatar)
    const confirmarAcaoModal = async () => {
        if (!modalCaixinhaId || !modalTipo) {
            setModalVisible(false);
            return;
        }

        const valor = parseFloat(modalValor.replace(",", "."));
        if (!valor || valor <= 0) {
            Alert.alert("Erro", "Informe um valor válido.");
            return;
        }

        setCarregando(true);
        const authHeader = await getAuthHeader();

        if (!authHeader || !authHeader.Authorization) {
            Alert.alert("Erro", "Usuário não autenticado.");
            setCarregando(false);
            return;
        }

        let url = "";
        if (modalTipo === "adicionar")
            url = "http://coloque_seu_ip_aqui/usuario/caixinha/adicionar";
        else if (modalTipo === "resgatar")
            url = "http://coloque_seu_ip_aqui/usuario/caixinha/resgatar";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    ...authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ caixinhaId: modalCaixinhaId, valor }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    "Sucesso",
                    modalTipo === "adicionar" ? "Dinheiro adicionado!" : "Dinheiro resgatado!"
                );
                carregarCaixinhas();
                setModalVisible(false);
            } else {
                Alert.alert("Erro", data.message || "Erro na operação.");
            }
        } catch (error) {
            console.error("Erro na operação:", error);
            Alert.alert("Erro", "Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    };

    // Função para deletar caixinha, com confirmação e chamada DELETE para a rota correta
    const deletarCaixinha = async (caixinhaId: string) => {
        Alert.alert(
            "Confirmar exclusão",
            "Deseja realmente excluir essa caixinha? Só é possível excluir se o saldo for zero.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setCarregando(true);
                            const authHeader = await getAuthHeader();

                            if (!authHeader || !authHeader.Authorization) {
                                Alert.alert("Erro", "Usuário não autenticado.");
                                setCarregando(false);
                                return;
                            }

                            const response = await fetch(
                                "http://coloque_seu_ip_aqui/usuario/caixinha/excluir",
                                {
                                    method: "DELETE",
                                    headers: {
                                        ...authHeader,
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ caixinhaId }),
                                }
                            );

                            const data = await response.json();

                            if (response.ok) {
                                Alert.alert("Sucesso", "Caixinha excluída com sucesso!");
                                carregarCaixinhas();
                            } else {
                                Alert.alert(
                                    "Erro",
                                    data.message || "Não foi possível excluir a caixinha."
                                );
                            }
                        } catch (error) {
                            console.error("Erro ao excluir caixinha:", error);
                            Alert.alert("Erro", "Erro ao conectar com o servidor.");
                        } finally {
                            setCarregando(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GUARDAR DINHEIRO</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.areaExtrato}>
                <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
                    Nome da nova caixinha:
                </Text>
                <TextInput
                    style={styles.input}
                    value={nomeCaixinha}
                    onChangeText={setNomeCaixinha}
                    placeholder="Ex: Viagem, Poupança..."
                    placeholderTextColor="#999"
                />
                <TouchableOpacity
                    style={styles.botao}
                    onPress={criarCaixinha}
                    disabled={carregando}
                >
                    <Text style={styles.textoBotao}>
                        {carregando ? "Criando..." : "Criar Caixinha"}
                    </Text>
                </TouchableOpacity>

                <Text
                    style={{ color: "#fff", fontSize: 20, marginTop: 30, marginBottom: 10, fontWeight: "bold" }}
                >
                    Suas Caixinhas
                </Text>

                {carregandoCaixinhas ? (
                    <ActivityIndicator size="large" color="#993399" />
                ) : (
                    caixinhas.map((item, index) => (
                        <View key={item.id ?? index} style={styles.caixinhaCard}>
                            <Text style={styles.caixinhaNome}>{item.nome}</Text>
                            <Text style={styles.caixinhaSaldo}>
                                Saldo: R${" "}
                                {isNaN(Number(item.saldo))
                                    ? "0,00"
                                    : Number(item.saldo).toFixed(2).replace(".", ",")}
                            </Text>

                            {/* Botões para abrir modal */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={[styles.botaoPequeno, { backgroundColor: "#4CAF50" }]}
                                    onPress={() => abrirModal(item.id, "adicionar")}
                                    disabled={carregando}
                                >
                                    <Text style={styles.textoBotaoPequeno}>Adicionar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.botaoPequeno, { backgroundColor: "#E53935" }]}
                                    onPress={() => abrirModal(item.id, "resgatar")}
                                    disabled={carregando}
                                >
                                    <Text style={styles.textoBotaoPequeno}>Resgatar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.botaoPequeno,
                                        { backgroundColor: "#777", marginLeft: 5 },
                                    ]}
                                    onPress={() => deletarCaixinha(item.id)}
                                    disabled={carregando}
                                >
                                    <Text style={styles.textoBotaoPequeno}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Modal para adicionar ou resgatar */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            {modalTipo === "adicionar"
                                ? "Adicionar Dinheiro"
                                : "Resgatar Dinheiro"}
                        </Text>
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Informe o valor"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={modalValor}
                            onChangeText={setModalValor}
                        />
                        <TouchableOpacity
                            style={styles.botaoModal}
                            onPress={confirmarAcaoModal}
                            disabled={carregando}
                        >
                            <Text style={styles.textoBotaoModal}>
                                {carregando ? "Processando..." : "Confirmar"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.botaoModal, { backgroundColor: "#999", marginTop: 10 }]}
                            onPress={() => setModalVisible(false)}
                            disabled={carregando}
                        >
                            <Text style={styles.textoBotaoModal}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    areaExtrato: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        paddingTop: 50,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    botao: {
        backgroundColor: "#b963c8",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    textoBotao: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    caixinhaCard: {
        backgroundColor: "#9b3dbf",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    caixinhaNome: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    caixinhaSaldo: {
        color: "#fff",
        marginTop: 5,
        fontSize: 16,
    },
    botaoPequeno: {
        flex: 1,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 3,
    },
    textoBotaoPequeno: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    inputModal: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    botaoModal: {
        backgroundColor: "#993399",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    textoBotaoModal: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
