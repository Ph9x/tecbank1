import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Image, Pressable, Keyboard } from "react-native";
import { Button } from "../../componentes/button";




// Tela Cartão
export default function CartaoScreen() {

    const handleSolicitarCard = () => {         

    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>CARTÃO</Text>
            </View>

            <Pressable style={styles.content} onPress={Keyboard.dismiss}>
                <View style={styles.top}>
                    <View style={styles.areaCartao}>
                        <View style={styles.areaCartaoTitle}>
                            <Text style={styles.areaCartaoTitleH1}>
                                Solicite agora o seu cartão
                            </Text>
                            <Text style={styles.areaCartaoTitleH2}>
                                Tecnologia, segurança e liberdade financeira em um só lugar.
                            </Text>
                        </View>
                        <View style={styles.areaCartaoImg}>
                            <Image
                                source={require("../../assets/imgCartao.png")}
                                style={styles.imgCartao}
                                resizeMode="cover"
                            />
                            <Image
                                source={require("../../assets/logo.png")}
                                style={styles.imgLogo}
                                resizeMode="cover"
                            />

                        </View>

                    </View>

                </View>

                <View style={styles.bottom}>
                    <View style={styles.areaSolicitarCartao}>
                        <View>
                            <Text style={styles.areaSolicitarCartaoTitleH1}>
                                Clique no botão abaixo para pedir o seu cartão:
                            </Text>
                        </View>

                        <View style={styles.areaSolicitarCartaoButton}>
                            <Button
                                title="Solicitar cartão"
                                onPress={handleSolicitarCard}
                            />
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
    areaCartao: {
        width: "90%",
        flex: 1,
    },
    areaCartaoTitle: {
        marginBottom: 20
    },
    areaCartaoTitleH1: {
        fontSize: 30,
        color: "#E878EF",
        fontWeight: "bold",

    },
    areaCartaoTitleH2: {
        fontSize: 15.5,
        fontWeight: "300",
        color: "#999"
    },
    areaCartaoImg: {
        height: 240,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    imgCartao: {
        width: "100%",
        height: "100%",
        shadowColor: "#000", //SOMBRA NA IMAGEM
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    imgLogo: {
        position: "absolute",
        width: 90,
        height: 90,
        top: 0,
        left: 15,
    },

    bottom: {
        height: 220,
        backgroundColor: "#333",
        alignItems: "center",
    },
    areaSolicitarCartao: {
        flex: 1,
        width: "90%",
        marginTop: 10,
    },
    areaSolicitarCartaoTitleH1: {
        fontSize: 19,
        fontWeight: "600",
        color: "#ddd",
        marginBottom: 30,
        textAlign: "center"
    },
    areaSolicitarCartaoButton: {
        flexDirection: "row",
        justifyContent: "center"
    }
});
