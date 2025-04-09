import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { router } from "expo-router";

export default function App() {
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");


    const handleProximo = () => {
        router.replace("/novaConta/aviso")
    }

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
                            maxLength={30}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRME A SENHA"
                            placeholderTextColor="#bbb"
                            value={confPassword}
                            onChangeText={setConfPassword}
                            secureTextEntry={true}
                            maxLength={30}
                        />

                    </View>

                    <Button
                        title="Criar Conta"
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
        marginBottom: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 20,
        fontSize: 14,
    },
});