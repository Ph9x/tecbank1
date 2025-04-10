import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { TextInputMask } from 'react-native-masked-text';
import { router } from "expo-router";

export default function infoPessoaisScreen() {
    const [cpf, setCpf] = useState("");
    const [nomeC, setNomeC] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [dtn, setDtn] = useState("");


    const handleProximo = () => {
        router.replace("/novaConta/endereco")
    }

    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>INFORMAÇÕES PESSOAIS</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            placeholderTextColor="#bbb"
                            autoCapitalize="words"
                            value={nomeC}
                            onChangeText={setNomeC}
                            maxLength={80}
                        />

                        <TextInputMask

                            type={"cpf"}
                            style={styles.input}
                            placeholder="CPF"
                            placeholderTextColor="#bbb"
                            value={cpf}
                            onChangeText={setCpf}
                            keyboardType="number-pad"
                        />
                        <TextInputMask

                            type={"datetime"}
                            options={{
                                format: "DD/MM/YYYY"
                            }}

                            style={styles.input}
                            placeholder="Data de nascimento"
                            placeholderTextColor="#bbb"
                            value={dtn}
                            onChangeText={setDtn}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholderTextColor="#bbb"
                            value={email}
                            onChangeText={setEmail}
                            maxLength={256}
                        />
                        <TextInputMask

                            type={"cel-phone"}
                            options={{
                                maskType: "BRL",
                                withDDD: true,
                                dddMask: "(99)"
                            }}

                            style={styles.input}
                            placeholder="Celular"
                            placeholderTextColor="#bbb"
                            value={celular}
                            onChangeText={setCelular}
                            keyboardType="phone-pad"
                        />


                    </View>

                    <Button
                        title="Próximo"
                        onPress={handleProximo}
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
        marginBottom: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 20,
        fontSize: 14,
    },
});