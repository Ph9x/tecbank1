import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Segurotype } from "../../componentes/seguroType";

export default function SeguroScreen() {
  const pagarSeguro = (nome: string, valor: number) => {
    Alert.alert("Compra realizada", `Você comprou o seguro de ${nome} por R$ ${valor.toFixed(2)}.`);
    // Aqui você pode chamar uma API ou salvar localmente
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TIPOS DE SEGUROS</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="xmark" size={50} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Segurotype
          nameItem={"Celular"}
          description={"Proteção contra roubo, furto e danos acidentais."}
          id={1}
          valor={60}
          iconeItem={{
            name: "mobile-screen-button",
            size: 50,
            color: "#fff",
          }}
          onComprar={() => pagarSeguro("Celular", 60)}
        />
        <Segurotype
          nameItem={"Vida"}
          description={"Cobertura em caso de morte ou invalidez."}
          id={2}
          valor={35}
          iconeItem={{
            name: "heart-circle-plus",
            size: 50,
            color: "#fff",
          }}
          onComprar={() => pagarSeguro("Vida", 35)}
        />
        <Segurotype
          nameItem={"Residência"}
          description={"Proteção contra incêndio, roubo e danos elétricos na sua casa."}
          id={3}
          valor={45}
          iconeItem={{
            name: "house-chimney",
            size: 50,
            color: "#fff",
          }}
          onComprar={() => pagarSeguro("Residência", 45)}
        />
        <Segurotype
          nameItem={"Viagem"}
          description={"Cobertura médica, extravio de bagagem e imprevistos no exterior."}
          id={4}
          valor={30}
          iconeItem={{
            name: "plane-departure",
            size: 50,
            color: "#fff",
          }}
          onComprar={() => pagarSeguro("Viagem", 30)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#333",
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
    color: "#fff",
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: "center",
    backgroundColor: "#333",
  },
});
