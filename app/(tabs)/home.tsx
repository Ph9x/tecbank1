import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { router, useFocusEffect } from "expo-router";
import SlideFromLeftWithGestureModal from "../../componentes/UserModal";
import { buscarSaldo } from "../services/saldoService";
import { buscarConta, nomeUsuario } from "../services/contaService";
import { getAuthHeader, getToken, removeToken } from "../services/tokenService";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


// Tela Home
export default function HomeScreen() {

    //MODAL
    const [visible, setVisible] = useState(false);
    const toggleModal = () => setVisible(prev => !prev);    //INVERTE O VALOR ATUAL DO visible(true==false) $$ (false==true)


    //INVALIDAR O TOKEN ARMAZENADO ASSIM QUE EU APERTAR O BOTÃO DE SAIR
    const handleSairConta = async () => {
        try {
            const authHeader = await getAuthHeader();
            const response = await fetch('http://coloque_seu_ip_aqui/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader, // Incluindo o token de autenticação no cabeçalho
                },
            });

            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                // Remova o token do armazenamento seguro após invalidá-lo no backend
                await removeToken();
                console.log('Token removido com sucesso');

                // Redirecione o usuário para a página inicial ou qualquer outra página desejada
                router.replace("/"); // Redireciona para a página inicial
            } else {
                const errorData = await response.json();
                console.log('Erro ao invalidar o token:', errorData);
            }
        } catch (error) {
            console.error('Erro ao tentar sair da conta:', error);
        }
    };

    //ROTA PARA VER A IMAGEM DO USUÁRIO
    const [imageUri, setImageUri] = useState<string | null>(null);
    const fetchImagemPerfil = async () => {
        try {
            setLoading(true);
            const authHeader = await getAuthHeader();
            const response = await fetch("http://coloque_seu_ip_aqui/usuario/ver-imagem", { headers: authHeader });
            const data = await response.json();

            if (response.ok && data.usuario?.imagemPerfil) {
                setImageUri(data.usuario.imagemPerfil);
            } else {
                setImageUri(null); // Sem imagem salva
            }
        } catch (error) {
            console.log("Erro ao buscar imagem do usuário:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchImagemPerfil();
        }, [])
    );



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
        router.navigate("servicos/informacoes")
    }

    const handleTrocarSenha = () => {
        router.navigate("servicos/trocarSenha")
    }
    const handleMinhaConta = () => {
        router.navigate("servicos/minhaConta")
    }
    const handleSobreConta = () => {
        router.navigate("servicos/sobreBanco")
    }


    //CONSULTAR SALDO DO BANCO DE DADOS
    const [saldo, setSaldo] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            const carregarSaldo = async () => {
                const data = await buscarSaldo();
                if (data && data.saldo !== undefined) {
                    setSaldo(Number(data.saldo));
                }
            };
            carregarSaldo();
        }, [])
    );

    //MOSTRAR AGENCIA DO USUÁRIO
    const [agencia, setAgencia] = useState<string | null>(null);
    useEffect(() => {
        const carregarAgencia = async () => {
            const data = await buscarConta();
            if (data && data.agencia !== undefined) {
                setAgencia(data.agencia)
            }
        };
        carregarAgencia();
    }, [])

    //MOSTRAR CONTA DO USUÁRIO
    const [conta, setConta] = useState<string | null>(null);
    useEffect(() => {
        const carregarConta = async () => {
            const data = await buscarConta();
            if (data && data.conta !== undefined) {
                setConta(data.conta)
            }
        };
        carregarConta();
    }, [])
    //FORMATAR DADOS DA CONTA MOSTRADO
    const formatarConta = (conta: string | null) => {
        if (!conta) return "";
        if (conta.length < 2) return conta;
        return `${conta.slice(0, -1)}-${conta.slice(-1)}`;
    }

    //MOSTRAR NOME USUÁRIO
    const [nome, setNome] = useState<string | null>(null);
    useEffect(() => {
        const mostrarNome = async () => {
            const data = await nomeUsuario();
            if (data && data.nome !== undefined) {
                const primeiroNome = data.nome.split(" ")[0];   //SEPARA POR ESPAÇO E PEGA O PRIMEIRO NOME
                setNome(primeiroNome);
            }
        };
        mostrarNome();
    }, [])

    //GRÁFICO
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState<string[]>([]);
    const [dataPoints, setDataPoints] = useState<number[]>([]);
    const [caixinhaNome, setCaixinhaNome] = useState<string>("");
    useFocusEffect(
        useCallback(() => {
            let isActive = true; // protege contra vazamentos de memória ao sair antes da conclusão

            async function fetchRendimento() {
                try {
                    setLoading(true);

                    const authHeader = await getAuthHeader();
                    const response = await fetch("http://coloque_seu_ip_aqui/caixinhas/rendimento", {
                        headers: {
                            "Content-Type": "application/json",
                            ...authHeader,
                        },
                    });
                    const json = await response.json();

                    if (json.length > 0 && isActive) {
                        const primeiraCaixinha = json[0];

                        setCaixinhaNome(primeiraCaixinha.nome);

                        const labels = primeiraCaixinha.historico.map(
                            (item: { mes: number }) => `Mês ${item.mes}`
                        );

                        const dataPoints = primeiraCaixinha.historico.map(
                            (item: { saldo: string }) => parseFloat(item.saldo)
                        );

                        setLabels(labels);
                        setDataPoints(dataPoints);
                    } else {
                        setCaixinhaNome("");
                        setLabels(["Jun", "Jul", "Ago", "Set", "Out", "Nov"]);
                        setDataPoints([50, 55.00, 60.50, 66.55, 73.20, 80.53]);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados de rendimento:", error);
                } finally {
                    if (isActive) setLoading(false);
                }
            }

            fetchRendimento();

            // cleanup
            return () => {
                isActive = false;
            };
        }, [])
    );


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerESQ}>
                    <TouchableOpacity onPress={toggleModal} style={styles.headerUser}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.avatarImage} />
                        ) : (
                            <FontAwesome name="user" size={25} color="#fff" />
                        )}
                    </TouchableOpacity>
                    <View style={styles.headerUserAreaText}>
                        <Text style={styles.headerUserText}>{`Olá, ${nome}`}</Text>
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
                            {visivel ? `R$ ${saldo?.toFixed(2)}` : "R$ ••••"}
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

                    <Text style={styles.text}>
                        {caixinhaNome ? `Simulação da Caixinha: ${caixinhaNome}` : "Simulação Caixinha 6 meses"}
                    </Text>
                    <LineChart
                        data={{
                            labels: labels.length > 0 ? labels : ["Jun", "Jul", "Ago", "Set", "Out", "Nov"],
                            datasets: [
                                {
                                    data: dataPoints.length > 0 ? dataPoints : [50, 55.00, 60.50, 66.55, 73.20, 80.53],
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={240}
                        yAxisLabel="R$"

                        chartConfig={{
                            backgroundColor: "#000",
                            backgroundGradientFrom: "#000",
                            backgroundGradientTo: "#000",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(232, 120, 239, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#993399",
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 10,
                            borderRadius: 10,

                        }}
                    />
                </View>

                <SlideFromLeftWithGestureModal
                    //MOSTRANDO O MODAL E DEFININDO VALORES
                    visible={visible} onClose={() => setVisible(false)}>

                    <View style={styles.dadosUser}>
                        <Text style={styles.dadosUserTitle}>Dados bancários</Text>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH1}>Agência</Text>
                            <Text style={styles.dadosUserH2}>{`${agencia}`}</Text>
                        </View>
                        <View style={styles.dadosUserItem}>
                            <Text style={styles.dadosUserH1}>Conta</Text>
                            <Text style={styles.dadosUserH2}>{formatarConta(conta)}</Text>
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
                        <TouchableOpacity style={styles.opcaoUser} onPress={handleMinhaConta}>
                            <FontAwesome name="user" size={25} color="#fff" />
                            <Text style={styles.opcaoUserText}>Minha conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.opcaoUser} onPress={handleTrocarSenha}>
                            <FontAwesome name="lock" size={25} color="#fff" />
                            <Text style={styles.opcaoUserText}>Trocar senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.opcaoUser} onPress={handleSobreConta}>
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
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#993399"
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
        borderTopWidth: 3,
        borderColor: "#993399",
        flex: 1,
        backgroundColor: "#E878EF",
        alignItems: "center",
        paddingTop: 10,
    },
    text: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
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
        padding: 10,
        borderWidth: 2,
        borderColor: "#E878EF",
        borderRadius: 30
    },
    SairUserText: {
        textAlign: "center",
        flex: 1,
        fontSize: 18,
        marginLeft: 20,
        color: "#E878EF",
        fontWeight: "bold"
    }

});
