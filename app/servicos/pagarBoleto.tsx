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

export default function EscanearBoletoScreen() {
    const [barcodeResult, setBarcodeResult] = useState("");
    const [pagamentoDados, setPagamentoDados] = useState<null | {
        codigoBarras: string;
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
            setBarcodeResult(result.data);
            setLoadingDados(true);

            try {
                const authHeader = await getAuthHeader();
                const response = await fetch(
                    `http://coloque_seu_ip_aqui/usuario/boleto/ler-boleto?codigoBarras=${result.data}`,
                    {
                        method: "GET",
                        headers: {
                            ...authHeader,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    Alert.alert("Erro ao ler código de barras", errorData.message || "Boleto não encontrado ou expirado");
                    setBarcodeResult("");
                    setPagamentoDados(null);
                    scannedRef.current = false;
                    setLoadingDados(false);
                    return;
                }

                const data = await response.json();
                setPagamentoDados(data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível conectar ao servidor para ler boleto");
                setBarcodeResult("");
                setPagamentoDados(null);
                scannedRef.current = false;
            } finally {
                setLoadingDados(false);
            }
        }
    };

    const handleConfirmarPagamento = async () => {
        if (!barcodeResult) {
            Alert.alert("Erro", "Nenhum código de barras escaneado para confirmar o pagamento.");
            return;
        }

        try {
            const authHeader = await getAuthHeader();
            const response = await fetch("http://coloque_seu_ip_aqui/usuario/boleto-pagar", {
                method: "POST",
                headers: {
                    ...authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigoBarras: barcodeResult }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert("Erro", errorData.message || "Erro ao confirmar pagamento");
                return;
            }

            Alert.alert("Sucesso", "Pagamento do boleto confirmado com sucesso!");
            setBarcodeResult("");
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
        setBarcodeResult("");
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ESCANEAR BOLETO</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Código Capturado:</Text>
                <Text style={styles.resultText}>{barcodeResult || "Nenhum código escaneado"}</Text>

                {loadingDados && <ActivityIndicator size="large" color="#993399" />}

                {!!pagamentoDados && !loadingDados && (
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.dataText}>Nome: {pagamentoDados.nome}</Text>
                        <Text style={styles.dataText}>Cidade: {pagamentoDados.cidade}</Text>
                        <Text style={styles.dataText}>Código de Barras: {pagamentoDados.codigoBarras}</Text>
                        <Text style={styles.dataText}>Valor: R$ {pagamentoDados.valor}</Text>
                    </View>
                )}

                {!!barcodeResult && !loadingDados && (
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

            {!barcodeResult && (
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
    resultContainer: {
        padding: 20,
        backgroundColor: "#222",
    },
    resultLabel: {
        color: "#ccc",
        fontWeight: "bold",
        marginBottom: 8,
    },
    resultText: {
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
    dataText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 20,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
    },
});
