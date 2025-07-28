import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, Alert } from "react-native";
import { Button } from "../componentes/button";
import { TextInputMask } from "react-native-masked-text";
import { router } from "expo-router";
import { login } from "./services/loginService";
import { storeToken } from "./services/tokenService";

export default function LoginScreen() {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");


    //SÓ IRÁ FAZER O LOGIN CASO O USUÁRIO E SENHA SEJAM COMPATIVEIS COM O BANCO DE DADOS
    const handleEntrar = async () => {
        if (!cpf || !password) {      //VERIFICA SE CPF E SENHA ESTÃO PREENCHIDOS
            Alert.alert("Erro","Preencha todos os campos");
            return;
        }
        // Verificar se a senha tem pelo menos 6 caracteres
        if (!/^\d{6}$/.test(password)) {
            Alert.alert("Erro", "A senha deve conter exatamente 6 números.");
            return;
        }

        try {

            //CHAMA O SERVIDOR DE LOGIN
            const data = await login(cpf, password);

            //VERIFICA SE A MENSAGEM QUANDO DER TUDO CERTO É IGUAL A DO SERVIDOR
            if (data.message === "Tudo certo" && data.token) {
                //SALVA O TOKEN NO SECURESTORE
                await storeToken(data.token);

                router.replace("/home");
            } else if (data.error === "Usuário não encontrado") { //VERIFICA A MENSAGEM DO SERVIDOR E EM BAIXO MOSTRA O ERRO
                Alert.alert("Erro","CPF incorreto")
            } else if (data.error === "Senha Incorreta") {
                Alert.alert("Erro","Senha incorreta")
            } else {
                alert(data.error || "Erro desconhecido")
            }
        } catch (error: any) {
            alert(error.message);
        }
    };


    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>Olá, Usuário</Text>
                    <View style={styles.user}>
                        <FontAwesome name="user" size={180} color="#333" />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInputMask
                            type={"cpf"}
                            style={styles.input}
                            placeholder="CPF"
                            placeholderTextColor="#bbb"
                            value={cpf}
                            onChangeText={setCpf}
                            keyboardType="number-pad"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="SENHA"
                            placeholderTextColor="#bbb"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}      //ESCONDER A SENHA
                            keyboardType="numeric"
                            maxLength={6}
                            contextMenuHidden={true}        //IMPEDE COPIAR E COLAR
                        />
                    </View>

                    <Button
                        title="Entrar"
                        onPress={handleEntrar}
                    >
                    </Button>


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
        height: 200,
        alignItems: "center",
        justifyContent: "center",

    },
    topText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 50
    },
    user: {
        width: 220,
        height: 220,
        backgroundColor: "#CC00D9",
        borderRadius: 140,
        position: "absolute",
        top: 120,
        borderWidth: 15,
        borderColor: "#000",
        zIndex: 99,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 30,
        overflow: "hidden",
    },
    bottom: {
        backgroundColor: "#242323",
        flex: 1,
        borderTopLeftRadius: 260,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    inputArea: {
        width: "80%",
        marginTop: 150,
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