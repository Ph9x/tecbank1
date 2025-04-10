import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { TextInputMask } from 'react-native-masked-text';
import { router } from "expo-router";

export default function EnderecoScreen() {
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");


    const handleProximo = () => {
        router.replace("/novaConta/confirmacao")
    }

    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>ENDEREÇO</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInputMask
                            type={"custom"}
                            options={{
                                mask: "99999-999"
                            }}
                            style={styles.input}
                            placeholder="CEP"
                            placeholderTextColor="#bbb"
                            value={cep}
                            onChangeText={setCep}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Rua"
                            placeholderTextColor="#bbb"
                            autoCapitalize="words"      //DEIXA TODA LETRA MAIÚSCULA
                            value={rua}
                            onChangeText={setRua}
                            maxLength={256}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Número"
                            placeholderTextColor="#bbb"
                            value={numero}
                            onChangeText={setNumero}
                            keyboardType="numeric"
                            maxLength={12}
                        />

                        <TextInput
                          style={styles.input}
                          placeholder="Cidade"
                          placeholderTextColor="#bbb"
                          value={cidade}
                          onChangeText={setCidade}
                          keyboardType="default"
                          maxLength={48}  
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="UF"
                          placeholderTextColor="#bbb"
                          value={uf}
                          onChangeText={setUf}
                          keyboardType="default"
                          maxLength={2}  
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