import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Button } from "../../../componentes/button";
import { getAuthHeader } from "../../services/tokenService";

export default function PixCopieColeScreen() {
  const [copiaCola, setCopiaCola] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCopieCole = async () => {
    if (!copiaCola.trim()) {
      Alert.alert("Erro", "Por favor, cole o código PIX para continuar.");
      return;
    }

    setLoading(true);
    try {
      const authHeader = await getAuthHeader();

      const response = await fetch(
        "http://coloque_seu_ip_aqui/usuario/pix/confirmar-pagamento",
        {
          method: "POST",
          headers: {
            ...authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pagamentoId: copiaCola.trim() }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Erro ao confirmar pagamento");
        setLoading(false);
        return;
      }

      await response.json();

      Alert.alert("Sucesso", "Pagamento confirmado com sucesso!");
      setCopiaCola("");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PIX COPIA E COLA</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="xmark" size={50} color="#fff" />
        </TouchableOpacity>
      </View>

      <Pressable style={styles.areaPix} onPress={Keyboard.dismiss}>
        <View style={styles.areaPixTop}>
          <View>
            <Text style={styles.areaPixTitleH1}>Insira aqui o código do Pix</Text>
          </View>

          <TextInput
            style={styles.EnviarPix}
            placeholder="Cole o seu código aqui"
            placeholderTextColor="#bbb"
            value={copiaCola}
            onChangeText={setCopiaCola}
            multiline
            editable={!loading}
          />

          {loading && <ActivityIndicator size="large" color="#993399" style={{ marginBottom: 20 }} />}

          <Button title="Continuar" onPress={handleCopieCole} disabled={loading} />
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
    paddingHorizontal: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  areaPix: {
    flex: 1,
    backgroundColor: "#333",
    borderTopWidth: 3,
    borderColor: "#993399",
    paddingTop: 50,
  },
  areaPixTop: {
    flex: 1,
    alignItems: "center",
  },
  areaPixTitleH1: {
    fontSize: 30,
    fontWeight: "600",
    color: "#E878EF",
    marginBottom: 20,
    textAlign: "center",
  },
  EnviarPix: {
    width: "90%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#CC00D9",
    color: "#fff",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 50,
    textAlignVertical: "top",
  },
});
