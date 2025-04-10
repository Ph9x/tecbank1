import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { View, StyleSheet, Text } from "react-native";

type Props = {
    nameItem: String,
    description: String,
    id: number,
    valor: number,
    iconeItem:{
        name: String,
        size:number
        color: String

    }
}

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

            </View>
            <View style={styles.areaSeguroDIR}>
                <FontAwesome style={styles.areaSeguroDIRCima}
                name={props.iconeItem.name}
                size={props.iconeItem.size}
                color={props.iconeItem.color}
                />
                <View style={styles.areaSeguroDIRBaixo}>
                <Text style={styles.textValor}>{`R$ ${props.valor.toFixed(2)}`}</Text>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    areaSeguro: {
        width: "90%",
        height: 140,
        backgroundColor: "#E878EF",
        padding: 10,
        borderRadius:20,
        flexDirection:"row",
        borderWidth: 5,
        borderColor:"#000",
        marginBottom: 20
    },
    areaSeguroESQ: {
        flex: 1
    },
    areaSeguroESQCima: {

    },
    areaSeguroESQBaixo: {
        flex: 1
    },




    areaSeguroDIR: {
        width: 120,
        alignItems:"center",
        justifyContent:"space-between"
    },
    areaSeguroDIRCima:{

    },
    areaSeguroDIRBaixo:{

    },



    h1: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold"
    },
    h2: {
        fontSize: 14,
        color: "#333",
    },
    textValor:{
        fontSize:20,
        fontWeight:"bold",
        color: "#000"
    }
})