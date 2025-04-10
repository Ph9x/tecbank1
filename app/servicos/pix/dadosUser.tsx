import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Pressable, Keyboard, TextInput } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Button } from "../../../componentes/button";
import { TextInputMask } from "react-native-masked-text";




// Tela Seguro
export default function DadosUserScreen() {


    const handleEnviarPix = () => {        //ENVIAR PIX 
        
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dados do destinatário</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome
                        name="xmark"
                        size={50}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <View style={styles.areaPix}>
                <View style={styles.areaPixTop}>
                    <View style={styles.areaPixTopEsq}>
                        <Text style={styles.DadoTitle}>Dados</Text>
                        <Text style={styles.Dado}>CPF</Text>
                        <Text style={styles.Dado}>Instituição</Text>
                        <Text style={styles.Dado}>Agência</Text>
                        <Text style={styles.Dado}>Número da Conta</Text>
                    </View>
                    <View style={styles.areaPixTopDir}>
                        <Text style={styles.DadoTitle}></Text>
                        <Text style={styles.Dado}>...784...965..</Text>
                        <Text style={styles.Dado}>PICPAY</Text>
                        <Text style={styles.Dado}>1</Text>
                        <Text style={styles.Dado}>16253767-0</Text>
                    </View>
                </View>
                <View style={styles.areaPixNome}>
                    <Text style={styles.DadoTitle}>Nome:</Text>
                    <Text style={styles.Dado}>Pedro Henrique de Sousa Costa Santos</Text>
                </View>
                <View style={styles.areaPixValor}>
                    <Text style={styles.DadoTitle}>Valor:</Text>
                    <Text style={styles.Dado}>{`R$ 00,00`}</Text>
                </View>

                <Button
                    title="Enviar Pix"
                    onPress={handleEnviarPix}
                />
            </View>



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
        paddingHorizontal: 25,
        borderBottomWidth: 3,
        borderColor: "#993399",

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
        
    },
    areaPix: {
        flex: 1,
        paddingTop: 50,
        alignItems:"center",
    },
    areaPixTop:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:"90%",
        flex:1,
        padding: 10,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: "#993399"
    },
    areaPixTopEsq:{

    },
    DadoTitle:{
        fontSize:25,
        color:"#E878EF",
        fontWeight:"bold",
        marginBottom: 15
    },
    Dado:{
        fontSize: 16,
        color: "#fff",
        fontWeight:"500",
        marginBottom:10

    },
    areaPixTopDir:{
        alignItems:"flex-end"
    },

    areaPixNome:{
        width:"90%",
        flex:1,
        padding: 10,
        justifyContent:"center",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: "#993399"
    },
    areaPixValor:{
        width:"90%",
        flex:1,
        padding: 10,
        justifyContent:"center",
        borderTopWidth:3,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        marginBottom: 20,
        borderColor: "#993399"
    }
    
});
