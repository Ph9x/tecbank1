import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, Pressable, Keyboard } from "react-native";
import { Button } from "../../componentes/button";
import { router } from "expo-router";




// Tela Pagamentos
export default function AreaPixScreen() {

    const [pix, setPix] = useState("");

    const handleRealizarPix = () => {        //QUANDO DIGITAR O PIX 
        router.navigate("servicos/pix/pix")
    }
    const handleCopiaCola = () => {        //PIX COPIA E COLA 
        router.navigate("servicos/pix/copiaCola")
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Envie, pague e resolva tudo em segundos.</Text>
            </View>

            <Pressable style={styles.content} onPress={Keyboard.dismiss}>
                <View style={styles.top}>
                    <View style={styles.areaPix}>
                        <View style={styles.areaPixTitle}>
                            <Text style={styles.areaPixTitleH1}>Transferir</Text>
                            <Text style={styles.areaPixTitleH2}>Insira uma chave Pix:</Text>
                        </View>
                        <TextInput
                            style={styles.chavePix}
                            placeholder="CPF/CNPJ - Celular - E-mail ou Aleatória"
                            placeholderTextColor="#bbb"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={pix}
                            onChangeText={setPix}
                            maxLength={140}
                        />
                        <View style={styles.areaButton}>
                            <Button
                                title="Continuar"
                                onPress={handleRealizarPix}
                            />
                        </View>

                    </View>

                </View>

                <View style={styles.bottom}>
                    <View style={styles.areaOutros}>
                        <View>
                            <Text style={styles.areaOutrosTitleH1}>Outros:</Text>
                        </View>

                        <View style={styles.areaOutrosPagamentos}>

                            <View>
                                <TouchableOpacity style={styles.OutroPagamento}>
                                    <Image
                                        source={require('../../assets/icons/barras.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Pagar{"\n"}boleto</Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.OutroPagamento} onPress={handleCopiaCola}>
                                    <Image
                                        source={require('../../assets/icons/copia_cola.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Pix Copia{"\n"}e Cola</Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.OutroPagamento}>
                                    <Image
                                        source={require('../../assets/icons/qr.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Pagar QR{"\n"}Code</Text>
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
    areaPix: {
        width: "90%",
        flex: 1,
    },
    areaPixTitle: {
        marginBottom: 20
    },
    areaPixTitleH1: {
        fontSize: 40,
        color: "#E878EF",
        fontWeight: "bold",

    },
    areaPixTitleH2: {
        fontSize: 25,
        fontWeight: "300",
        color: "#999"
    },
    chavePix: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 5,
        fontSize: 14,
    },
    areaButton: {
        alignItems: "center",
        paddingTop: 25
    },

    bottom: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center"

    },
    areaOutros: {
        flex: 1,
        width: "90%",
        marginTop: 50,
    },
    areaOutrosTitleH1: {
        fontSize: 25,
        fontWeight: "600",
        color: "#ddd",
        marginBottom: 40
    },
    areaOutrosPagamentos: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    OutroPagamento: {
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
