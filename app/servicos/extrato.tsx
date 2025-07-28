import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { getAuthHeader } from "../services/tokenService";
import { Extratotype } from "../../componentes/extratoType";

export default function ExtratoScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [transacaoSelecionada, setTransacaoSelecionada] = useState<{
        //DEFININDO OS DADOS PARA USAR NO EXTRATO
        id?: string;
        tipo: string;
        nome?: string;
        cidade?: string;
        status?: string;
        agencia?: string;
        numeroConta?: string;
        cpf?: string;
        valor: number;
        data: string;
        boletoCodigo?: string;
        boletoVencimento?: string;
        boletoPagador?: string;
    } | null>(null);

    const [modalTituloDados, setModalTituloDados] = useState<string>("");

    const [transacoes, setTransacoes] = useState<any[]>([]);

    useEffect(() => {
        const carregarTransacoes = async () => {
            try {
                const authHeader = await getAuthHeader();
                const response = await fetch("http://coloque_seu_ip_aqui/transacoes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    Alert.alert("Erro", data.message || "Erro ao buscar transações");
                    return;
                }

                setTransacoes(data);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
                Alert.alert("Erro", "Erro ao conectar com o servidor.");
            }
        };

        carregarTransacoes();
    }, []);

    const formatarCpf = (cpf: string) => {
        const somenteNumeros = cpf.replace(/\D/g, "");
        if (somenteNumeros.length !== 11) return cpf;

        const primeirosMascarados = "***";
        const meio = somenteNumeros.substring(3, 9);
        const ultimosMascarados = "**";

        return `${primeirosMascarados}.${meio.substring(0, 3)}.${meio.substring(3, 6)}-${ultimosMascarados}`;
    };

    const abrirModal = (transacao: any) => {
        // Verifica o tipo para definir os dados específicos do modal
        if (transacao.tipo === "PIX_QRCODE") {
            setTransacaoSelecionada({
                tipo: transacao.tipo,
                nome: "QRCODE_FAKE",
                cidade: transacao.remetente?.cidade,
                cpf: transacao.remetente?.cpf,
                valor: parseFloat(transacao.valor),
                data: new Date(transacao.data).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });
            setModalTituloDados("Dados do QR Code capturado");
        } else if (transacao.tipo === "BOLETO") {
            //CONFIGURANDO OS DADOS PARA APARECER NO BOLETO CONFORME A RESPOSTA DA MINHA ROTA
            setTransacaoSelecionada({
                tipo: transacao.tipo,
                nome: "BOLETO_FAKE",
                cidade: transacao.cidade || "N/A",
                boletoCodigo: transacao.codigoBarras,
                status: transacao.status,
                valor: parseFloat(transacao.valor),
                data: new Date(transacao.data).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });
            setModalTituloDados("Dados do Boleto");
        } else {
            // Pix normal (enviado ou recebido)
            const conta = transacao.ehEnvio ? transacao.destinatario : transacao.remetente;

            setTransacaoSelecionada({
                tipo: transacao.tipo,
                nome: conta?.nome,
                agencia: conta?.agencia,
                numeroConta: conta?.numeroConta,
                cpf: conta?.cpf || "",
                valor: parseFloat(transacao.valor),
                data: new Date(transacao.data).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });

            setModalTituloDados(transacao.ehEnvio ? "Dados do destinatário" : "Dados do remetente");
        }

        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>EXTRATO DE TRANSAÇÕES</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.areaExtrato}>
                {transacoes.map((transacao) => (
                    <Extratotype
                        key={transacao.id}
                        id={transacao.id}
                        nomeDestinatario={
                            transacao.tipo === "PIX_QRCODE"
                                ? transacao.remetente?.nome
                                : transacao.tipo === "BOLETO"
                                    ? transacao.remetente?.nome
                                    : transacao.ehEnvio
                                        ? transacao.destinatario?.nome
                                        : transacao.remetente?.nome
                        }
                        tipo={
                            transacao.tipo === "PIX_QRCODE"
                                ? "Pix enviado (QR Code)"
                                : transacao.tipo === "BOLETO"
                                    ? "Boleto pago"
                                    : transacao.ehEnvio
                                        ? "Pix enviado"
                                        : "Pix recebido"
                        }
                        valor={parseFloat(transacao.valor)}
                        data={new Date(transacao.data).toLocaleDateString("pt-BR")}
                        onPress={() => abrirModal(transacao)}
                        iconeItem={{
                            name:
                                transacao.tipo === "BOLETO"
                                    ? "file-invoice-dollar"
                                    : transacao.ehEnvio
                                        ? "money-bill-transfer"
                                        : "money-bill-trend-up",
                            size: 50,
                            color: "#fff",
                        }}
                    />
                ))}
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalhes da Transação</Text>
                        <Text style={styles.modalSubtitle}>{modalTituloDados}</Text>

                        {transacaoSelecionada?.tipo === "BOLETO" ? (
                            <>
                                <View style={styles.modalLinha}>
                                    <View style={styles.modalEsq}>
                                        <Text style={styles.modalH1}>Nome:</Text>
                                        <Text style={styles.modalH1}>Cidade:</Text>
                                        <Text style={styles.modalH1}>Valor:</Text>
                                        <Text style={styles.modalH1}>Status:</Text>
                                        <Text style={styles.modalH1}>Data:</Text>
                                    </View>

                                    <View style={styles.modalDir}>
                                        <Text style={styles.modalText}>{transacaoSelecionada.nome}</Text>
                                        <Text style={styles.modalText}>{transacaoSelecionada.cidade}</Text>
                                        <Text style={styles.modalText}>R$ {transacaoSelecionada.valor.toFixed(2)}</Text>
                                        <Text style={styles.modalText}>{transacaoSelecionada.status}</Text>
                                        <Text style={styles.modalText}>{transacaoSelecionada.data}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 10 }}>
                                    <Text style={[styles.modalH1, { marginBottom: 5 }]}>Código de Barras:</Text>
                                    <Text style={styles.modalText}>{transacaoSelecionada.boletoCodigo}</Text>
                                </View>
                            </>
                        ) : (
                            <View style={styles.modalLinha}>
                                <View style={styles.modalEsq}>
                                    <Text style={styles.modalH1}>Nome:</Text>
                                    {transacaoSelecionada?.cidade !== undefined && (
                                        <Text style={styles.modalH1}>Cidade:</Text>
                                    )}
                                    {transacaoSelecionada?.agencia !== undefined && (
                                        <Text style={styles.modalH1}>Agência:</Text>
                                    )}
                                    {transacaoSelecionada?.numeroConta !== undefined && (
                                        <Text style={styles.modalH1}>Conta:</Text>
                                    )}
                                    <Text style={styles.modalH1}>CPF:</Text>
                                    <Text style={styles.modalH1}>Valor:</Text>
                                    {modalTituloDados !== "Dados do QR Code capturado" && (
                                        <Text style={styles.modalH1}>Instituição:</Text>
                                    )}
                                    <Text style={styles.modalH1}>Data:</Text>
                                </View>

                                <View style={styles.modalDir}>
                                    <Text style={styles.modalText}>{transacaoSelecionada?.nome}</Text>
                                    {transacaoSelecionada?.cidade !== undefined && (
                                        <Text style={styles.modalText}>{transacaoSelecionada.cidade}</Text>
                                    )}
                                    {transacaoSelecionada?.agencia !== undefined && (
                                        <Text style={styles.modalText}>{transacaoSelecionada.agencia}</Text>
                                    )}
                                    {transacaoSelecionada?.numeroConta !== undefined && (
                                        <Text style={styles.modalText}>{transacaoSelecionada.numeroConta}</Text>
                                    )}
                                    <Text style={styles.modalText}>
                                        {transacaoSelecionada?.cpf ? formatarCpf(transacaoSelecionada.cpf) : ""}
                                    </Text>
                                    <Text style={styles.modalText}>R$ {transacaoSelecionada?.valor.toFixed(2)}</Text>
                                    {modalTituloDados !== "Dados do QR Code capturado" && (
                                        <Text style={styles.modalText}>TecBank</Text>
                                    )}
                                    <Text style={styles.modalText}>{transacaoSelecionada?.data}</Text>
                                </View>
                            </View>


                        )}

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Fechar</Text>
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
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 100,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalLinha: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 30,
        justifyContent: "space-between",
    },
    modalEsq: {
    },
    modalDir: {
        flex: 1,
        alignItems: "flex-end",
    },
    modalH1: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
        color: "#444",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 30,
        color: "#666",
    },
    modalButton: {
        backgroundColor: "#993399",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
