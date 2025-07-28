import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { router } from "expo-router";
import { useRegister } from "../context/RegisterContext";
import { Alert } from "react-native";


export default function ConfirmacaoScreen() {
    const { userData, setUserData } = useRegister();    //ACESSAR OS DADOS DO CONTEXTO

    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [loading, setLoading] = useState(false);        //CRIANDO CONTA



    const handleProximo = async () => {
        if (password !== confPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        if (password.length !== 6 || !/^\d{6}$/.test(password)) {         //TEM QUE SER TUDO NÚMERO
            Alert.alert("Erro", "A senha tem que 6 números");
            return;
        }

        setUserData(prev => ({
            ...prev,
            senhaHash: password,
            confirmarSenhaHash: confPassword,
        }));

        setLoading(true);
        try {
            const response = await fetch("http://coloque_seu_ip_aqui/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...userData,        // Dados do usuário (nome, CPF, etc.)
                    senhaHash: password,    // Senha com hash
                    confirmarSenhaHash: confPassword,   // Confirmação de senha
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Erro ao criar conta.");
            }
            // Caso tudo esteja certo, redireciona para a tela de aviso
            router.replace("/novaConta/aviso");
        } catch (err) {
            // Verifica se err é uma instância de Error e exibe a mensagem.
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
            Alert.alert("Erro", errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>CRIE UMA SENHA</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInput
                            style={styles.input}
                            placeholder="SENHA"
                            placeholderTextColor="#bbb"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}      //ESCONDER A SENHA
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRME A SENHA"
                            placeholderTextColor="#bbb"
                            value={confPassword}
                            onChangeText={setConfPassword}
                            secureTextEntry={true}
                            keyboardType="numeric"
                            maxLength={6}
                        />

                    </View>


                    <Button
                        title={loading ? "Criando..." : "Criar Conta"}
                        onPress={handleProximo}
                        disabled={loading}
                    />


                </View>

            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E878EF",
        zIndex: 99
    },
    top: {
        backgroundColor: "#E878EF",
        height: 100,
        alignItems: "center",
        justifyContent: "center",

    },
    topText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 50,
        position: "absolute",
    },
    bottom: {
        backgroundColor: "#242323",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopLeftRadius: 100,
        paddingTop: 55
    },
    inputArea: {
        width: "80%",
    },

    input: {
        marginBottom: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 20,
        fontSize: 14,
    },
});