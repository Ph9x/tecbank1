import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Segurotype } from "../../componentes/seguroType";




// Tela Seguro
export default function SeguroScreen() {

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TIPOS DE SEGUROS</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome
                        name="xmark"
                        size={50}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <View style={styles.areaSeguro}>
                <Segurotype
                nameItem={"Celular"}
                description={"Proteção contra roubo, furto e danos acidentais."}
                id={1}
                valor={60}
                iconeItem={{
                    name: "mobile-screen-button",
                    size: 50,
                    color: "#fff"
                }}
                />
                <Segurotype
                nameItem={"Vida"}
                description={"Cobertura em caso de morte ou invalidez. Tranquilidade para sua família."}
                id={2}
                valor={35}
                iconeItem={{
                    name: "heart-circle-plus",
                    size: 50,
                    color: "#fff"
                }}
                />
                <Segurotype
                nameItem={"Residência"}
                description={"Proteção contra incêndio, roubo e danos elétricos na sua casa."}
                id={3}
                valor={45}
                iconeItem={{
                    name: "house-chimney",
                    size: 50,
                    color: "#fff"
                }}
                />
                <Segurotype
                nameItem={"Viagem"}
                description={"Cobertura médica, extravio de bagagem e imprevistos no exterior."}
                id={4}
                valor={30}
                iconeItem={{
                    name: "plane-departure",
                    size: 50,
                    color: "#fff"
                }}
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
        paddingHorizontal: 25

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    areaSeguro: {
        flex: 1,
        backgroundColor: "#333",
        borderTopWidth: 3,
        borderColor: "#993399",
        alignItems: "center",
        paddingTop: 50
    },
});
