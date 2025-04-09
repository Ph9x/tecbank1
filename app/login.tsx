import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../componentes/button";
import { TextInputMask } from "react-native-masked-text";

export default function App() {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");


    const handleEntrar = () => {

    }

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
                            maxLength={30}
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