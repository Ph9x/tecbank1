import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    nameItem: string;
    description: string;
    id: number;
    valor: number;
    iconeItem: {
        name: string;
        size: number;
        color: string;
    };
    onComprar?: () => void;
};

export const Segurotype = (props: Props) => {
    return (
        <View style={styles.areaSeguro}>
            <View style={styles.areaSeguroESQ}>
                <View style={styles.areaSeguroESQCima}>
                    <Text style={styles.h1}>{props.nameItem}</Text>
                </View>
                <View style={styles.areaSeguroESQBaixo}>
                    <Text style={styles.h2}>{props.description}</Text>
                </View>
                <TouchableOpacity style={styles.botao} onPress={props.onComprar}>
                    <Text style={styles.textBotao}>Contratar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.areaSeguroDIR}>
                <FontAwesome
                    style={styles.areaSeguroDIRCima}
                    name={props.iconeItem.name}
                    size={props.iconeItem.size}
                    color={props.iconeItem.color}
                />
                <View style={styles.areaSeguroDIRBaixo}>
                    <Text style={styles.textValor}>{`R$ ${props.valor.toFixed(2)}/mês`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    areaSeguro: {
        width: "90%",
        height: 190,
        backgroundColor: "#E878EF",
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        borderWidth: 3,
        borderColor: "#993399",
        marginBottom: 20,
    },
    areaSeguroESQ: {
        flex: 1,
        justifyContent: "space-between",
    },
    areaSeguroESQCima: {},
    areaSeguroESQBaixo: {
        flex: 1,
    },
    areaSeguroDIR: {
        width: 120,
        alignItems: "center",
        justifyContent: "space-between",
    },
    areaSeguroDIRCima: {},
    areaSeguroDIRBaixo: {},
    h1: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    h2: {
        fontSize: 14,
        color: "#333",
    },
    textValor: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    botao: {
        backgroundColor: "#993399",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginTop: 10,
    },
    textBotao: {
        color: "#fff",
        fontWeight: "bold",
    },
});
