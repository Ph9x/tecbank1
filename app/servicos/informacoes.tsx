import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

const informacoes = [
    {
        titulo: "O que é o TECBANK?",
        conteudo:
            "O TECBANK é um sistema bancário digital desenvolvido como projeto de conclusão de curso. Ele oferece funcionalidades como transferências, pagamentos e simulação de rendimentos, com foco em segurança, usabilidade e eficiência.",
    },
    {
        titulo: "Quais serviços estão disponíveis?",
        conteudo:
            "O sistema permite login seguro, transferências via Pix, pagamentos de boletos, simulações de rendimentos, além de extratos financeiros e cartões digitais.",
    },
    {
        titulo: "Quais tecnologias foram usadas?",
        conteudo:
            "React Native, Node.js, Express.js, TypeScript e PostgreSQL. Projeto gerenciado com Scrum, GitHub e VS Code.",
    },
    {
        titulo: "Como o sistema garante segurança?",
        conteudo:
            "Utiliza autenticação JWT, criptografia e proteção de dados sensíveis para garantir segurança nas transações.",
    },
    {
        titulo: "Como funciona a navegação no app?",
        conteudo:
            "A tela inicial mostra o saldo e atalhos rápidos. Há também seções para Pix, boletos, extratos, cartão digital, minha conta e configurações.",
    },
    {
        titulo: "Guardar dinheiro",
        conteudo:
            "Com a função 'Guardar Dinheiro', você pode separar parte do seu saldo em caixinhas, ideal para economias ou objetivos específicos.",
    },
    {
        titulo: "Cartão digital",
        conteudo:
            "Visualize seu cartão virtual de forma segura e, se quiser, solicite o cartão físico diretamente pelo app.",
    },
    {
        titulo: "Simulação de Rendimentos",
        conteudo:
            "Faça simulações com valores da sua caixinha em um prazo de 6 meses para entender quanto seu dinheiro pode render ao longo do tempo.",
    },
    {
        titulo: "Extrato bancário",
        conteudo:
            "Acompanhe todas as suas movimentações, como Pix enviados, Pix recebidos e boletos pagos.",
    },
    {
        titulo: "Minha conta",
        conteudo:
            "Acesse seus dados pessoais como nome, CPF, e-mail e telefone. Você também pode atualizar a sua foto de perfil.",
    },
    {
        titulo: "Gerenciamento de chaves Pix",
        conteudo:
            "Cadastre ou exclua suas chaves Pix (CPF, e-mail ou celular) de forma simples e rápida.",
    },
];

export default function InformacoesScreen() {
    const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setIndiceAtivo(indiceAtivo === index ? null : index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>INFORMAÇÕES</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {informacoes.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <TouchableOpacity onPress={() => toggleItem(index)} style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                            <FontAwesome
                                name={indiceAtivo === index ? "chevron-up" : "chevron-down"}
                                size={16}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        {indiceAtivo === index && (
                            <Text style={styles.cardContent}>{item.conteudo}</Text>
                        )}
                    </View>
                ))}
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
    content: {
        padding: 20,
    },
    card: {
        marginBottom: 15,
        backgroundColor: "#444",
        borderRadius: 10,
        padding: 15,
    },
    cardHeader: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    cardContent: {
        marginTop: 10,
        color: "#ccc",
        fontSize: 14,
    },
});
