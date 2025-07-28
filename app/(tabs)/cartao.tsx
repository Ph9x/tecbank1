import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    Pressable,
    Keyboard,
    Alert,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuthHeader } from "../services/tokenService";

export default function CartaoScreen() {
    const router = useRouter();

    const [mostrarModalEndereco, setMostrarModalEndereco] = useState(false);
    const [carregandoEndereco, setCarregandoEndereco] = useState(false);

    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");

    const [enderecoOriginal, setEnderecoOriginal] = useState<null | {
        cep: string;
        rua: string;
        numero: string;
        cidade: string;
        uf: string;
    }>(null);

    const [cartaoSolicitado, setCartaoSolicitado] = useState(false);
    const [carregandoStatus, setCarregandoStatus] = useState(true);

    // Carrega status do cartão (solicitado ou não)
    useEffect(() => {
        const carregarStatusCartao = async () => {
            try {
                const headers = await getAuthHeader();
                const response = await fetch(
                    "http://coloque_seu_ip_aqui/usuario/solicitar-cartao",
                    {
                        headers: {
                            ...headers,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setCartaoSolicitado(data.cartaoSolicitado);
                }
            } catch (error) {
                console.log("Erro ao carregar status do cartão", error);
            } finally {
                setCarregandoStatus(false);
            }
        };
        carregarStatusCartao();
    }, []);

    // Carrega endereço do usuário para o modal
    const carregarEnderecoDoUsuario = async () => {
        setCarregandoEndereco(true);
        try {
            const authHeader = await getAuthHeader();
            const response = await fetch(
                "http://coloque_seu_ip_aqui/usuario/cartao/endereco",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader,
                    },
                }
            );

            if (!response.ok) throw new Error("Erro ao carregar endereço");

            const data = await response.json();

            setCep(data.cep || "");
            setRua(data.rua || "");
            setNumero(data.numero || "");
            setCidade(data.cidade || "");
            setUf(data.uf || "");

            setEnderecoOriginal({
                cep: data.cep,
                rua: data.rua,
                numero: data.numero,
                cidade: data.cidade,
                uf: data.uf,
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o endereço.");
            setMostrarModalEndereco(false);
        } finally {
            setCarregandoEndereco(false);
        }
    };

    // Confirma o endereço, atualiza backend e marca cartão solicitado
    const handleConfirmarEndereco = async () => {
        const enderecoAtual = { cep, rua, numero, cidade, uf };

        // Validação dos campos obrigatórios
        if (!cep || cep.length < 8) {
            Alert.alert("Campo inválido", "Informe um CEP válido com pelo menos 8 dígitos.");
            return;
        }
        if (!rua.trim()) {
            Alert.alert("Campo inválido", "O campo Rua não pode estar vazio.");
            return;
        }
        if (!numero.trim()) {
            Alert.alert("Campo inválido", "O campo Número não pode estar vazio.");
            return;
        }
        if (!cidade.trim()) {
            Alert.alert("Campo inválido", "O campo Cidade não pode estar vazio.");
            return;
        }
        if (!uf || uf.length !== 2) {
            Alert.alert("Campo inválido", "UF deve conter exatamente 2 letras.");
            return;
        }

        const houveMudanca =
            JSON.stringify(enderecoAtual) !== JSON.stringify(enderecoOriginal);

        try {
            const headers = await getAuthHeader();

            if (houveMudanca) {
                const responseEndereco = await fetch(
                    "http://coloque_seu_ip_aqui/usuario/cartao/endereco",
                    {
                        method: "PUT",
                        headers: {
                            ...headers,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(enderecoAtual),
                    }
                );

                if (!responseEndereco.ok) {
                    throw new Error("Erro ao atualizar endereço");
                }
            }

            const responseCartao = await fetch(
                "http://coloque_seu_ip_aqui/usuario/solicitar-cartao",
                {
                    method: "PUT",
                    headers: {
                        ...headers,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!responseCartao.ok) {
                throw new Error("Erro ao solicitar cartão");
            }

            setCartaoSolicitado(true);
            setMostrarModalEndereco(false);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível concluir a solicitação.");
        }
    };
    // UI da tela nova de confirmação do cartão solicitado
    const TelaConfirmacaoCartao = () => (
        <View style={styles.confirmacaoContainer}>
            <Text style={styles.confirmacaoTitulo}>Cartão solicitado com sucesso!</Text>
            <Text style={styles.confirmacaoTexto}>
                Seu cartão está sendo processado. Em breve você o receberá no endereço cadastrado.
            </Text>
        </View>
    );

    // UI da tela antiga com botão para solicitar o cartão
    const TelaSolicitarCartao = () => (
        <>
            <View style={styles.top}>
                <View style={styles.areaCartao}>
                    <View style={styles.areaCartaoTitle}>
                        <Text style={styles.areaCartaoTitleH1}>
                            Solicite agora o seu cartão
                        </Text>
                        <Text style={styles.areaCartaoTitleH2}>
                            Tecnologia, segurança e liberdade financeira em um só lugar.
                        </Text>
                    </View>
                    <View style={styles.areaCartaoImg}>
                        <Image
                            source={require("../../assets/imgCartao.png")}
                            style={styles.imgCartao}
                            resizeMode="cover"
                        />
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.imgLogo}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={styles.areaSolicitarCartao}>
                    <Text style={styles.areaSolicitarCartaoTitleH1}>
                        Clique no botão abaixo para pedir o seu cartão:
                    </Text>

                    <View style={styles.areaSolicitarCartaoButton}>
                        <TouchableOpacity
                            disabled={cartaoSolicitado}
                            style={[
                                styles.areaButton,
                                cartaoSolicitado && { backgroundColor: "#777" },
                            ]}
                            onPress={() => {
                                if (!cartaoSolicitado) {
                                    setMostrarModalEndereco(true);
                                    carregarEnderecoDoUsuario();
                                }
                            }}
                        >
                            <Text style={styles.btnText}>
                                {cartaoSolicitado ? "Cartão já solicitado" : "Solicitar Cartão"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );

    if (carregandoStatus) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CARTÃO</Text>
            </View>

            <Pressable style={styles.content} onPress={Keyboard.dismiss}>
                {/* Exibe tela nova se cartão solicitado, caso contrário tela antiga */}
                {cartaoSolicitado ? <TelaConfirmacaoCartao /> : <TelaSolicitarCartao />}
            </Pressable>

            {/* MODAL DE ENDEREÇO */}
            {mostrarModalEndereco && (
                <View style={styles.modalOverlay}>
                    <Pressable
                        style={styles.modalBackground}
                        onPress={() => {
                            Keyboard.dismiss(); // Fecha o teclado
                            setMostrarModalEndereco(false); // Fecha o modal
                        }}
                    />
                    <Pressable style={styles.modalContent} onPress={Keyboard.dismiss}>
                        <Text style={styles.modalTitle}>Confirme seu endereço</Text>

                        {carregandoEndereco ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="CEP"
                                    value={cep}
                                    onChangeText={setCep}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Rua"
                                    value={rua}
                                    onChangeText={setRua}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Número"
                                    value={numero}
                                    onChangeText={setNumero}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChangeText={setCidade}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="UF"
                                    value={uf}
                                    onChangeText={setUf}
                                />

                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleConfirmarEndereco}
                                >
                                    <Text style={styles.modalButtonText}>Confirmar e Continuar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Pressable>
                </View>
            )}
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
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 25,
        borderBottomWidth: 3,
        borderColor: "#993399", // roxo igual ao topo
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    content: {
        flex: 1,
        flexDirection: "column",
    },
    top: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        paddingTop: 50,
    },
    areaCartao: {
        width: "90%",
        flex: 1,
    },
    areaCartaoTitle: {
        marginBottom: 20,
    },
    areaCartaoTitleH1: {
        fontSize: 30,
        color: "#E878EF",
        fontWeight: "bold",
    },
    areaCartaoTitleH2: {
        fontSize: 15.5,
        fontWeight: "300",
        color: "#999",
    },
    areaCartaoImg: {
        height: 240,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    imgCartao: {
        width: "100%",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    imgLogo: {
        position: "absolute",
        width: 90,
        height: 90,
        top: 0,
        left: 15,
    },
    bottom: {
        height: 220,
        backgroundColor: "#333",
        alignItems: "center",
    },
    areaButton: {
        width: "80%",
        backgroundColor: "#CC00D9",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 20,
        marginBottom: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    areaSolicitarCartao: {
        flex: 1,
        width: "90%",
        marginTop: 10,

    },
    areaSolicitarCartaoTitleH1: {
        fontSize: 19,
        fontWeight: "600",
        color: "#ddd",
        marginBottom: 30,
        textAlign: "center",
    },
    areaSolicitarCartaoButton: {
        flexDirection: "row",
        justifyContent: "center",
    },
    btnText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -130,
    },
    modalBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#444",
        borderRadius: 10,
        padding: 20,
        zIndex: 10,
    },
    modalTitle: {
        fontSize: 22,
        color: "#E878EF",
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        height: 40,
        backgroundColor: "#eee",
        borderRadius: 6,
        paddingHorizontal: 15,
        marginVertical: 6,
    },
    modalButton: {
        marginTop: 10,
        backgroundColor: "#CC00D9",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
    },
    modalButtonText: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 18,
    },
    confirmacaoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    confirmacaoTitulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#CC00D9",
        marginBottom: 15,
        textAlign: "center",
    },
    confirmacaoTexto: {
        fontSize: 16,
        color: "#ccc",
        textAlign: "center",
    },
});
