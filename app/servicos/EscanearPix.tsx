import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Button,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { getAuthHeader } from "../services/tokenService";

export default function EscanearPixScreen() {
    const [qrResult, setQrResult] = useState("");
    const [pagamentoDados, setPagamentoDados] = useState<null | {
        chave: string;
        nome: string;
        cidade: string;
        valor: string;
        contaId: string;
    }>(null);
    const [loadingDados, setLoadingDados] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const scannedRef = useRef(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCode = async (result: BarcodeScanningResult) => {
        if (!scannedRef.current) {
            scannedRef.current = true;
            setQrResult(result.data);
            setLoadingDados(true);
            try {
                const authHeader = await getAuthHeader();
                const response = await fetch(
                    `http://coloque_seu_ip_aqui/usuario/pix/ler-qrcode?chave=${result.data}`,
                    {
                        method: "GET",
                        headers: {
                            ...authHeader, // <-- envia o token no cabeçalho
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (!response.ok) {
                    const errorData = await response.json();
                    Alert.alert("Erro ao ler QR Code", errorData.message || "Pagamento não encontrado ou expirado");
                    setQrResult("");
                    setPagamentoDados(null);
                    scannedRef.current = false;
                    setLoadingDados(false);
                    return;
                }
                const data = await response.json();
                setPagamentoDados(data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível conectar ao servidor para ler QR Code");
                setQrResult("");
                setPagamentoDados(null);
                scannedRef.current = false;
            } finally {
                setLoadingDados(false);
            }
        }
    };

    const handleConfirmarPagamento = async () => {
        if (!qrResult) {
            Alert.alert("Erro", "Nenhum QR code escaneado para confirmar o pagamento.");
            return;
        }

        try {
            const authHeader = await getAuthHeader();
            const response = await fetch("http://coloque_seu_ip_aqui/usuario/pix/confirmar-pagamento", {
                method: "POST",
                headers: {
                    ...authHeader, // <-- envia o token no cabeçalho
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pagamentoId: qrResult }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert("Erro", errorData.message || "Erro ao confirmar pagamento");
                return;
            }

            const data = await response.json();
            Alert.alert("Sucesso", "Pagamento confirmado com sucesso!");
            setQrResult("");
            setPagamentoDados(null);
            scannedRef.current = false;

            router.replace("/home");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
            console.error(error);
        }
    };

    const handleScanAgain = () => {
        scannedRef.current = false;
        setQrResult("");
        setPagamentoDados(null);
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={{ color: "#fff" }}>Você precisa da permissão para exibir a câmera.</Text>
                <Button title="Pedir Permissão" onPress={requestPermission} />
            </View>
        );
    }

    //FORMATAR O CPF E BOTAR "*"
    const formatarCpf = (cpf: string) => {
        const somenteNumeros = cpf.replace(/\D/g, "");
        if (somenteNumeros.length !== 11) return cpf; // Retorna original se inválido

        //3 PRIMEIROS '*'
        const primeirosMascarados = "***";
        //MANTÉM MEIO
        const meio = somenteNumeros.substring(3, 9);
        //2 ÚLTIMOS '*'
        const ultimosMascarados = "**";

        return `${primeirosMascarados}.${meio.substring(0, 3)}.${meio.substring(3, 6)}-${ultimosMascarados}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ESCANEAR QRCODE</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.qrResultContainer}>
                <Text style={styles.qrResultLabel}>QR Capturado:</Text>
                <Text style={styles.qrResultText}>{qrResult || "Nenhum QR code escaneado"}</Text>

                {loadingDados && <ActivityIndicator size="large" color="#993399" />}

                {!!pagamentoDados && !loadingDados && (
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.dadoText}>Nome: {pagamentoDados.nome}</Text>
                        <Text style={styles.dadoText}>Cidade: {pagamentoDados.cidade}</Text>
                        <Text style={styles.dadoText}>CPF: {formatarCpf(pagamentoDados.chave)}</Text>
                        <Text style={styles.dadoText}>Valor: R$ {pagamentoDados.valor}</Text>
                    </View>
                )}

                {!!qrResult && !loadingDados && (
                    <>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleConfirmarPagamento}
                            disabled={!pagamentoDados}
                        >
                            <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: "#666", marginTop: 10 }]}
                            onPress={handleScanAgain}
                        >
                            <Text style={styles.confirmButtonText}>Escanear novamente</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {!qrResult && (
                <CameraView
                    style={styles.camera}
                    onBarcodeScanned={handleBarCode}
                />
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
    camera: {
        flex: 1,
    },
    qrResultContainer: {
        padding: 20,
        backgroundColor: "#222",
    },
    qrResultLabel: {
        color: "#ccc",
        fontWeight: "bold",
        marginBottom: 8,
    },
    qrResultText: {
        color: "#fff",
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: "#993399",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    dadoText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 4,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
    },
});
