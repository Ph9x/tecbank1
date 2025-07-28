import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Pressable, Keyboard, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { TextInputMask } from "react-native-masked-text";
import { Button } from "../../componentes/button";
import { alterarSenha } from "../services/alterarSenha";


export default function TrocarSenhaScreen() {

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");


    const Confirmar = async () => {
        // Verificar se os campos estão preenchidos
        if (!senhaAtual || !novaSenha || !confirmar) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        // Verificar se as senhas coincidem
        if (novaSenha !== confirmar) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        // Verificar se a nova senha tem exatamente 6 caracteres
        if (novaSenha.length !== 6) {
            Alert.alert("Erro", "A nova senha deve ter exatamente 6 caracteres.");
            return;
        }

        // Verificar se a senha atual tem exatamente 6 caracteres
        if (senhaAtual.length !== 6) {
            Alert.alert("Erro", "A senha atual deve ter exatamente 6 caracteres.");
            return;
        }

        // Chamar a função para alterar a senha
        const response = await alterarSenha(senhaAtual, novaSenha, confirmar);

        if (response?.success) {
            Alert.alert("Sucesso", response.message || "Senha alterada com sucesso!");
            // Navegar para outra tela ou fazer outro processamento
        } else {
            Alert.alert("Erro", response?.message || "Não foi possível alterar a senha.");
        }
    };



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TROCAR SENHA</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome
                        name="xmark"
                        size={50}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <Pressable style={styles.areaSenhas} onPress={Keyboard.dismiss}>

                <View style={styles.areaSenha}>
                    <Text style={styles.senhaAtual}>Senha atual:</Text>
                    <TextInputMask
                        type={"only-numbers"}
                        style={styles.EntradaSenhaAtual}
                        placeholder="Senha atual:"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        maxLength={6}
                        secureTextEntry={true}
                        value={senhaAtual}
                        onChangeText={setSenhaAtual}
                    />
                    <Text style={styles.senha}>Nova senha:</Text>
                    <TextInputMask
                        type={"only-numbers"}
                        style={styles.EntradaSenha}
                        placeholder="Nova senha:"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        maxLength={6}
                        secureTextEntry={true}
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                    />
                    <Text style={styles.senha}>Confirme a senha:</Text>
                    <TextInputMask
                        type={"only-numbers"}
                        style={styles.EntradaSenha}
                        placeholder="Confirmar:"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        maxLength={6}
                        secureTextEntry={true}
                        value={confirmar}
                        onChangeText={setConfirmar}
                    />
                    <View style={styles.areaButton}>
                        <Button
                            title="     Confirmar     "     //TIRAR O VIEW MOSTRA BOTÃO COMPLETO
                            onPress={Confirmar}
                        />
                    </View>
                </View>

            </Pressable>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#333", // Cor de fundo padrão
    },
    header: {
        height: 80,
        backgroundColor: "#333",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 25

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    areaSenhas: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#333",
        borderTopWidth: 3,
        borderColor: "#993399",
        paddingTop: 10,
    },
    areaSenha: {
        width: "80%",
        alignItems: "center",

    },
    senha: {
        fontSize: 22,
        fontWeight: "600",
        color: "#E878EF",
        marginTop: 20,
        marginBottom: 3,
    },
    senhaAtual: {
        fontSize: 22,
        fontWeight: "600",
        color: "#E878EF",
        marginTop: 20,
        marginBottom: 2,
    },
    EntradaSenha: {
        width: "80%",
        padding: 16,
        borderWidth: 1,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 10,
        fontSize: 18,
    },
    EntradaSenhaAtual: {
        width: "80%",
        padding: 16,
        borderWidth: 5,
        borderColor: "#993399",
        color: "#fff",
        borderRadius: 10,
        fontSize: 18,
    },
    areaButton: {
        paddingTop: 25,
    },
});
