import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { router } from "expo-router";

export default function AvisoScreen() {


    const handleProximo = () => {
        router.replace("../login")
    }

    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>CONTA CRIADA!</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaText}>Parabéns! Sua conta bancária foi criada com sucesso. Clique no botão abaixo para fazer login.</Text>
                    </View>

                    <Button
                        title="Fazer Login"
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
        width: "80%"
    },
    inputAreaText: {
        color: "#fff",
        fontWeight: "400",
        fontSize: 30,
    }
});