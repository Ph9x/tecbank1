import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, Pressable, Keyboard } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";




// Tela Carteira
export default function CarteiraScreen() {

    const [visivel, setVisivel] = useState(true);



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>CARTEIRA</Text>
            </View>

            <Pressable style={styles.content} onPress={Keyboard.dismiss}>
                <View style={styles.top}>
                    <View style={styles.areaSaldo}>
                        <View style={styles.areaSaldoTitle}>
                            <Text style={styles.areaSaldoTitleH1}>Saldo</Text>
                            <Text style={styles.areaSaldoTitleH2}>seu saldo atual é de:</Text>
                        </View>
                        <View style={styles.areaSaldoVisible}>
                            <Text style={styles.areaSaldoText}>
                                {visivel ? "R$ 00,00" : "R$ ••••"}
                            </Text>
                            <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                <FontAwesome
                                    name={visivel ? "eye" : "eye-slash"}
                                    size={50}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                <View style={styles.bottom}>
                    <View style={styles.areaGuardaDim}>
                        <View>
                            <Text style={styles.areaGuardaDimTitleH1}>
                                Guarde aqui o seu dinheiro com segurança e praticidade.
                            </Text>
                        </View>

                        <View style={styles.areaGeralGuardaDim}>

                            <View>
                                <TouchableOpacity style={styles.areaItemGuardarDim}>
                                    <Image
                                        source={require('../../assets/icons/box.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Guardar{"\n"}Dinheiro</Text>
                                </View>
                            </View>



                        </View>

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

    content: {
        flex: 1,
        flexDirection: "column",
    },
    top: {
        flex: 1,
        backgroundColor: "#333",
        borderTopWidth: 3,
        borderColor: "#993399",
        alignItems: "center",
        paddingTop: 50
    },
    areaSaldo: {
        width: "90%",
        flex: 1,
    },
    areaSaldoTitle: {
        marginBottom: 20
    },
    areaSaldoTitleH1: {
        fontSize: 40,
        color: "#E878EF",
        fontWeight: "bold",

    },
    areaSaldoTitleH2: {
        fontSize: 25,
        fontWeight: "300",
        color: "#999"
    },
    areaSaldoVisible: {
        marginTop: 15,
        width: "100%",
        height: 160,
        backgroundColor: "#E878EF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: "5%"
    },
    areaSaldoText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff"
    },

    bottom: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center"

    },
    areaGuardaDim: {
        flex: 1,
        width: "90%",
        marginTop: 50,
    },
    areaGuardaDimTitleH1: {
        fontSize: 21,
        fontWeight: "600",
        color: "#ddd",
        marginBottom: 40,
        textAlign: "center"
    },
    areaGeralGuardaDim: {
        flexDirection: "row",
        justifyContent: "center"
    },
    areaItemGuardarDim: {
        width: 90,
        height: 80,
        backgroundColor: "#E878EF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    icone: {
        width: 40,
        height: 40
    },
    IconeText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "500",
        fontSize: 12,
        marginTop: 8
    },
});
