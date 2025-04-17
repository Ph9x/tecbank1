import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Pressable, Keyboard } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Button } from "../../../componentes/button";
import { TextInputMask } from "react-native-masked-text";




// Tela Seguro
export default function PixScreen() {

    const [visivel, setVisivel] = useState(true);

    const [enviar, setEnviar] = useState("");

    const ConfirmarPix = () => {        //QUANDO DIGITAR O PIX 
        router.navigate("../pix/dadosUser")
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>PIX</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome
                        name="xmark"
                        size={50}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <Pressable style={styles.areaPix} onPress={Keyboard.dismiss}>
                <View style={styles.areaPixTop}>
                    <View style={styles.areaPixTopESQ}>
                        <Text style={styles.areaPixTopTitle}>Saldo atual:</Text>
                        <Text style={styles.areaPixSaldo}>
                            {visivel ? "R$ 00,00" : "R$ ••••"}
                        </Text>
                    </View>

                    <View style={styles.areaPixTopDIR}>
                        <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                            <FontAwesome
                                name={visivel ? "eye" : "eye-slash"}
                                size={40}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.areaPixBottom}>
                    <Text style={styles.areaPixTitleH1}>Digite o valor do Pix:</Text>
                    <TextInputMask
                        type={"money"}
                        style={styles.EnviarPix}
                        placeholder="R$ 00,00"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        value={enviar}
                        onChangeText={setEnviar}
                    />
                    <View style={styles.areaButton}>
                        <Button
                            title="     Confirmar     "
                            onPress={ConfirmarPix}
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
    areaPix: {
        flex: 1,
        backgroundColor: "#333",
        borderTopWidth: 3,
        borderColor: "#993399",
        paddingTop: 50,
    },
    areaPixTop: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 100,
    },

    areaPixTopESQ: {

    },
    areaPixTopTitle: {
        fontSize: 30,
        fontWeight: "500",
        color: "#fff"
    },
    areaPixSaldo: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    areaPixTopDIR: {

    },

    areaPixBottom: {
        marginTop: 80,
        alignItems:"center"
    },
    areaPixTitleH1: {
        fontSize: 30,
        fontWeight: "600",
        color: "#E878EF",
        marginBottom: 20
    },
    EnviarPix: {
        width: "80%",
        padding: 20,
        borderWidth: 1,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 10,
        fontSize: 18,
    },
    areaButton: {
        paddingTop: 25,
    },
});
