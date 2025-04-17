import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import SlideFromLeftWithGestureModal from "../../componentes/UserModal";


// Tela Home
export default function HomeScreen() {

    //MODAL
    const [visible, setVisible] = useState(false);
    const toggleModal = () => setVisible(prev => !prev);    //INVERTE O VALOR ATUAL DO visible(true==false) $$ (false==true)

    const handleSairConta = () =>{
        router.replace("../")
    }



    const handleAreaPix = () => {
        router.navigate("/areaPix")
    };
    const handleCartao = () => {
        router.navigate("/cartao")
    };
    const handleSeguro = () => {
        router.navigate("servicos/seguro")
    };

    const [visivel, setVisivel] = useState(true);

    const handleInfos = () => {      //QUANDO CLICAR NA ABA INFORMAÇÕES IRÁ MOSTRAR A TELA DE INFOS

    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerESQ}>
                    <TouchableOpacity onPress={toggleModal} style={styles.headerUser}>
                        <FontAwesome name="user" size={25} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerUserAreaText}>
                        <Text style={styles.headerUserText}>Olá, usuário</Text>
                    </View>
                </View>

                <View style={styles.headerDIR}>
                    <TouchableOpacity   //QUANDO CLICAR O BOTÃO ABRE O MODAL
                        style={styles.headerDirEye} onPress={() => setVisivel(!visivel)}>
                        <FontAwesome
                            name={visivel ? "eye" : "eye-slash"}
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleInfos}>
                        <FontAwesome
                            name="question-circle"
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>

                </View>


            </View>


            <View style={styles.content}>


                <View style={styles.top}>

                    <View style={styles.topSaldo}>
                        <Text style={styles.topSaldoText}>
                            {visivel ? "R$ 00,00" : "R$ ••••"}
                        </Text>
                    </View>
                    <View style={styles.topOpcoes}>
                        <View style={styles.topOpcoesCima}>

                            <View>
                                <TouchableOpacity style={styles.areaIcone} onPress={handleAreaPix}>
                                    <Image
                                        source={require('../../assets/icons/pix.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Área Pix</Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.areaIcone} onPress={handleCartao}>
                                    <Image
                                        source={require('../../assets/icons/card.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Cartão</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topOpcoesBaixo}>
                            <View>
                                <TouchableOpacity style={styles.areaIcone} onPress={handleSeguro}>
                                    <Image
                                        source={require('../../assets/icons/seguro.png')}
                                        style={styles.icone}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.IconeText}>Seguros</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={styles.bottom}>

                    <Text style={styles.text}>Lucro Mensal</Text>
                </View>

                <SlideFromLeftWithGestureModal
                    //MOSTRANDO O MODAL E DEFININDO VALORES
                    visible={visible} onClose={() => setVisible(false)}>

                    <View style={styles.dadosUser}>
                        <Text style={styles.dadosUserTitle}>Dados bancários</Text>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH1}>Agência</Text>
                            <Text style={styles.dadosUserH2}>0001</Text>
                        </View>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH1}>Conta</Text>
                            <Text style={styles.dadosUserH2}>98664539-4</Text>
                        </View>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH1}>Banco</Text>
                            <Text style={styles.dadosUserH2}>0320</Text>
                        </View>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH2}>TecBank - Instituição de Pagamentos</Text>
                        </View>
                    </View>

                    <View style={styles.opcoesUser}>
                        <TouchableOpacity style={styles.opcaoUser}>
                            <FontAwesome name="user" size={25} color="#fff" />
                            <Text style={styles.opcaoUserText}>Minha conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.opcaoUser}>
                            <FontAwesome name="lock" size={25} color="#fff" />
                            <Text style={styles.opcaoUserText}>Trocar senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.opcaoUser}>
                            <FontAwesome name="exclamation-circle" size={25} color="#fff" />
                            <Text style={styles.opcaoUserText}>Sobre o banco</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sairUserArea}>
                        <TouchableOpacity style={styles.sairUser} onPress={handleSairConta}>
                            <FontAwesome name="sign-out-alt" size={25} color="#E878EF" />
                            <Text style={styles.SairUserText}>Sair da conta</Text>
                        </TouchableOpacity>

                    </View>

                </SlideFromLeftWithGestureModal>
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

    headerESQ: {
        flexDirection: "row"
    },
    headerUser: {
        width: 35,
        height: 35,
        borderRadius: "50%",
        backgroundColor: "#E878EF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    headerUserAreaText: {
        justifyContent: "center",
        marginLeft: 10
    },
    headerUserText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    headerDIR: {
        flexDirection: "row"
    },
    headerDirEye: {
        marginRight: 30
    },

    content: {
        flex: 1,
        flexDirection: "column",
    },
    top: {
        flex: 1,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 3,
        borderColor: "#993399"
    },
    topSaldo: {
        marginTop: 15,
        width: "90%",
        height: 120,
        backgroundColor: "#E878EF",
        justifyContent: "center",
        paddingLeft: 30,
        borderRadius: "7%"
    },
    topSaldoText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 30
    },
    topOpcoes: {
        flex: 1,
        width: "90%",
        marginTop: 5
    },
    topOpcoesCima: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    areaIcone: {
        width: 120,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#E878EF",
        justifyContent: "center",
        alignItems: "center",
    },
    icone: {
        width: 36,
        height: 36,
        color: "#00f",
    },
    IconeText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "500",
        fontSize: 12,
        marginTop: 8
    },
    topOpcoesBaixo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: -30
    },
    bottom: {
        flex: 1,
        backgroundColor: "#E878EF",
        alignItems: "center",
        paddingTop: 50

    },
    text: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },

    //MODAL
    dadosUser: {
        borderWidth: 1,
        borderColor: "#E878EF",
        padding: 5,

    },
    dadosUserTitle: {
        fontSize: 16,
        color: "#E878EF",
        fontWeight: "bold",
        marginBottom: 5
    },
    dadosUserItem: {
        marginBottom: 10
    },
    dadosUserH1: {
        fontSize: 16,
        color: "#ddd",
        fontWeight: "400"
    },
    dadosUserH2: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold"
    },

    opcoesUser: {
        marginTop: 30,
    },
    opcaoUser: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E878EF",
        padding: 12,
        borderRadius: 5,
        marginBottom: 30
    },
    opcaoUserText: {
        textAlign: "center",
        flex: 1,
        fontSize: 18,
        marginLeft: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    sairUserArea: {
        flex: 1,
        justifyContent: "center",
    },
    sairUser: {
        flexDirection: "row",
        padding:10,
        borderWidth:2,
        borderColor: "#E878EF",
        borderRadius: 30
    },
    SairUserText:{
        textAlign: "center",
        flex: 1,
        fontSize: 18,
        marginLeft: 20,
        color: "#E878EF",
        fontWeight: "bold" 
    }

});
