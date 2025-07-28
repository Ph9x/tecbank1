import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router, useFocusEffect } from "expo-router";
import { getAuthHeader } from "../services/tokenService";

export default function MinhaContaScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState<{
        nome: string;
        cpf: string;
        dataNascimento: string;
        telefone: string;
        email: string;
    } | null>(null);

    const fetchImagemPerfil = async () => {
        try {
            setLoading(true);
            const authHeader = await getAuthHeader();
            const response = await fetch("http://coloque_seu_ip_aqui/usuario/ver-imagem", { headers: authHeader });
            const data = await response.json();

            if (response.ok && data.usuario?.imagemPerfil) {
                setImageUri(data.usuario.imagemPerfil);
            } else {
                setImageUri(null);
            }
        } catch (error) {
            console.log("Erro ao buscar imagem:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDadosUsuario = async () => {
        try {
            const authHeader = await getAuthHeader();
            const response = await fetch("http://coloque_seu_ip_aqui/usuario/obter-dados", { headers: authHeader });
            const data = await response.json();

            if (response.ok) {
                setUsuario({
                    nome: data.nome,
                    cpf: data.cpf,
                    dataNascimento: new Date(data.dataNascimento).toLocaleDateString("pt-BR"),
                    telefone: data.celular, // no backend o campo é "celular"
                    email: data.email,
                });
            }
        } catch (error) {
            console.log("Erro ao buscar dados do usuário:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchImagemPerfil();
            fetchDadosUsuario();
        }, [])
    );

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissão negada", "Precisamos da permissão para acessar suas fotos.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.1,
        });

        if (!pickerResult.canceled && pickerResult.assets.length > 0) {
            setImageUri(pickerResult.assets[0].uri);
        }
    };

    const enviarImagem = async () => {
        if (!imageUri) return;

        const uriParts = imageUri.split("/");
        const nomeArquivo = uriParts[uriParts.length - 1];
        const tipoArquivo = nomeArquivo.endsWith(".jpg") || nomeArquivo.endsWith(".jpeg") ? "image/jpeg" : "image/png";

        const formData = new FormData();
        formData.append("imagem", {
            uri: imageUri,
            name: nomeArquivo,
            type: tipoArquivo,
        } as any);

        try {
            const authHeader = await getAuthHeader();

            const response = await fetch("http://coloque_seu_ip_aqui/usuario/imagem", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...authHeader,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", "Imagem de perfil atualizada!");
            } else {
                Alert.alert("Erro", data.error || "Erro ao enviar imagem");
            }
        } catch (error) {
            Alert.alert("Erro", "Falha na conexão com o servidor");
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#993399" />
            </SafeAreaView>
        );
    }
    const formatarCpf = (cpf: string) => {
        const somenteNumeros = cpf.replace(/\D/g, "");
        if (somenteNumeros.length !== 11) return cpf;

        const primeirosMascarados = "***";
        const meio = somenteNumeros.substring(3, 9);
        const ultimosMascarados = "**";

        return `${primeirosMascarados}.${meio.substring(0, 3)}.${meio.substring(3, 6)}-${ultimosMascarados}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MINHA CONTA</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <FontAwesome name="user-circle" size={120} color="#999" />
                    )}
                    <Text style={styles.text}>Toque para escolher uma foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={enviarImagem}>
                    <Text style={styles.saveButtonText}>Salvar foto</Text>
                </TouchableOpacity>

                {usuario && (
                    <View style={styles.infoContainer}>

                        <View style={styles.infoContainerEsq}>
                            <Text style={styles.infoTextH1}>Nome:</Text>
                            <Text style={styles.infoTextH1}>CPF:</Text>
                            <Text style={styles.infoTextH1}>Data Nas:</Text>
                            <Text style={styles.infoTextH1}>Telefone:</Text>
                            <Text style={styles.infoTextH1}>E-mail:</Text>
                        </View>

                        <View style={styles.infoContainerDir}>
                            <Text style={styles.infoText}>{usuario.nome}</Text>
                            <Text style={styles.infoText}>{formatarCpf(usuario.cpf)}</Text>
                            <Text style={styles.infoText}>{usuario.dataNascimento}</Text>
                            <Text style={styles.infoText}>{usuario.telefone}</Text>
                            <Text style={styles.infoText}>{usuario.email}</Text>
                        </View>

                    </View>
                )}
            </View>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#993399"
    },
    text: {
        marginTop: 10,
        color: "#fff",
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: "#993399",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 8,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        marginTop: 30,
        borderWidth: 3,
        padding: 10,
        borderColor: "#993399",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoContainerEsq: {
        alignItems: "flex-start",
    },
    infoContainerDir: {
        alignItems: "flex-end",
    },
    infoText: {
        fontSize: 18,
        color: "#ccc",
        marginBottom: 5,
    },
    infoTextH1: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 5,
        fontWeight: "600"

    },
});
