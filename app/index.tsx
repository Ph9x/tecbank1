import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Button } from "../componentes/button";

export default function App() {

    const handleLogin = () => {
        router.navigate("/login");
    }
    const handleCadastrar = () => {
        router.navigate("novaConta/infoPessoais");
    }
    return (
        <View style={styles.container}>


            <View style={styles.top}>
                <Text style={styles.topText}>Seja Bem-Vindo ao:</Text>
            </View>

            <View style={styles.bottom}>

                <Image
                    source={require('../assets/logo.png')}
                    style={styles.img}
                    resizeMode="cover"
                />

                <View style={styles.Buttons}>
                    <Button
                        title="Fazer Login"
                        onPress={handleLogin}
                    >
                    </Button>

                    <Pressable
                        style={styles.cadastrar}
                        onPress={handleCadastrar}
                    >
                        <Text style={styles.cadastrarText}>Cadastrar-se</Text>
                    </Pressable>
                </View>



            </View>


        </View>
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
        height: 220,
        alignItems: "center",
        justifyContent: "center",

    },
    topText: {
        marginTop: 65,
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff"
    },
    bottom: {
        backgroundColor: "#242323",
        flex: 1,
        borderTopLeftRadius: 260,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    img: {
        width: 450,
        marginTop: 0,

    },
    Buttons: {
        marginTop: 10,
        height: 180,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    cadastrar: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: -40
    },
    cadastrarText: {
        fontSize: 30,
        color: "#fff"
    }
});