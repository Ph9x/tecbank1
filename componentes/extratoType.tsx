import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

interface ExtratotypeProps {
  id: number;
  nomeDestinatario: string;
  tipo: string;
  valor: number;
  data: string;
  iconeItem: {
    name: any;
    size: number;
    color: string;
  };
  onPress?: () => void;
}

export function Extratotype({
  id,
  nomeDestinatario,
  tipo,
  valor,
  data,
  iconeItem,
  onPress,
}: ExtratotypeProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome {...iconeItem} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{nomeDestinatario}</Text>
        <Text style={styles.description}>{tipo}</Text>
        <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        <Text style={styles.date}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#444",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  iconContainer: {
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
  valor: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
});
