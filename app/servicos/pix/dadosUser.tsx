import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "../../../componentes/button";
import { getAuthHeader } from "../../services/tokenService";




// Tela Seguro
export default function DadosUserScreen() {
    const { nome, agencia, conta, valor, chavePix, contaOrigemId } = useLocalSearchParams();

    const handleEnviarPix = async () => {
        try {
            const authHeader = await getAuthHeader();

            if (!authHeader) {
                Alert.alert("Erro", "Token de autenticação não encontrado.");
                return;
            }

            const response = await fetch("http://coloque_seu_ip_aqui/usuario/dados-pix", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader
                },
                body: JSON.stringify({
                    chaveDestino: chavePix,  // chave do destinatário
                    valor: Number(valor),
                    descricao: "PIX via app",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Tratar erro específico aqui 👇
                if (data.message === 'Você não pode enviar Pix para você mesmo.') {
                    Alert.alert('Erro', 'Você não pode enviar um Pix para sua própria conta.');
                    return;
                }

                // Outros erros
                Alert.alert('Erro ao enviar Pix', data.message || 'Erro desconhecido.');
                return;
            }

            // Sucesso
            Alert.alert('Sucesso', 'Pix enviado com sucesso!');
            router.replace('/(tabs)/home'); // ou outra navegação

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
        }
    };

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
                        <Text style={styles.Dado}>Chave</Text>
                        <Text style={styles.Dado}>Instituição</Text>
                        <Text style={styles.Dado}>Agência</Text>
                        <Text style={styles.Dado}>Número da Conta</Text>
                    </View>
                    <View style={styles.areaPixTopDir}>
                        <Text style={styles.DadoTitle}></Text>
                        <Text style={styles.Dado} numberOfLines={1} ellipsizeMode="tail">{chavePix}</Text>
                        <Text style={styles.Dado}>TecBank</Text>
                        <Text style={styles.Dado}>{agencia}</Text>
                        <Text style={styles.Dado}>{conta}</Text>
                    </View>
                </View>
                <View style={styles.areaPixNome}>
                    <Text style={styles.DadoTitle} >Nome:</Text>
                    <Text style={styles.Dado}>{nome}</Text>
                </View>
                <View style={styles.areaPixValor}>
                    <Text style={styles.DadoTitle}>Valor:</Text>
                    <Text style={styles.Dado}>{`R$ ${valor}`}</Text>
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
        alignItems: "center",
    },
    areaPixTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        flex: 1,
        padding: 10,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: "#993399"
    },
    areaPixTopEsq: {

    },
    DadoTitle: {
        fontSize: 25,
        color: "#E878EF",
        fontWeight: "bold",
        marginBottom: 15
    },
    Dado: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        marginBottom: 10

    },
    areaPixTopDir: {
        alignItems: "flex-end",
        flexShrink: 1,     // permite encolher
        maxWidth: '50%',   // limita o máximo para 50% da largura (ajusta conforme precisar)
    },

    areaPixNome: {
        width: "90%",
        flex: 1,
        padding: 10,
        justifyContent: "center",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: "#993399"
    },
    areaPixValor: {
        width: "90%",
        flex: 1,
        padding: 10,
        justifyContent: "center",
        borderTopWidth: 3,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        marginBottom: 20,
        borderColor: "#993399"
    }

});
