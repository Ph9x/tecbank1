import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, Alert } from "react-native";
import { Button } from "../../componentes/button";
import { TextInputMask } from 'react-native-masked-text';
import { router } from "expo-router";
import { useRegister } from "../context/RegisterContext";
import { checkCelular, checkCpf, checkEmail } from "../services/checkUsuario";

export default function infoPessoaisScreen() {
    const { userData, setUserData } = useRegister();       //EXPORTANDO DO REGISTRO

    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [dataNascimento, setDataNascimento] = useState(userData.dataNascimento);


    const handleProximo = () => {

        //VALIDAÇÃO DE DADOS
        if (!cpf || !nome || !email || !celular || !dataNascimento) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        const nomes = nome.trim().split(" ").filter(n => n.length > 0);
        if (nomes.length < 2) {
            Alert.alert("Erro", "Por favor, insira seu nome completo.");
            return;
        }
        if (cpf.length < 14) {
            Alert.alert("Erro", "O CPF é inválido.");
            return;
        }
        if (celular.length < 14) {
            Alert.alert("Erro", "O celular é inválido.");
            return;
        }
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValido) {
            Alert.alert("Erro", "E-mail inválido.");
            return;
        }
        // Validação da data de nascimento (formato e idade mínima 18 anos)
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dataRegex.test(dataNascimento)) {
            Alert.alert("Erro", "Data de nascimento inválida (use o formato DD/MM/YYYY)");
            return;
        }
        const [dia, mes, ano] = dataNascimento.split("/").map(Number);
        const data = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        const dataInvalida =
            data.getFullYear() !== ano ||
            data.getMonth() !== mes - 1 ||
            data.getDate() !== dia;
        const idade = hoje.getFullYear() - ano - (
            hoje.getMonth() < mes - 1 ||
                (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)
                ? 1
                : 0
        );
        if (dataInvalida || idade < 18) {
            Alert.alert("Erro", "Usuário menor de 18 anos.");
            return;
        }
        // Converte para formato YYYY-MM-DD para envio no banco de dados
        const dataNascimentoFormatada = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        //ARMAZENA OS DADOS EM setUserData
        setUserData(prev => ({
            ...prev,
            nome,
            cpf: cpf.replace(/\D/g, ""), // remove máscara do CPF
            email,
            celular: celular.replace(/\D/g, ""), // remove máscara do 
            dataNascimento: dataNascimentoFormatada,
        }));

        router.replace("/novaConta/endereco"); // ajuste o caminho se necessário
    };

    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>INFORMAÇÕES PESSOAIS</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            placeholderTextColor="#bbb"
                            autoCapitalize="words"
                            value={nome}
                            onChangeText={(text) => {
                                // Remove números e caracteres especiais, mas permite acentos e til
                                const textoLimpo = text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); // Permite letras, acentos e espaços
                                setNome(textoLimpo);
                            }}
                            maxLength={80}
                            keyboardType="default"
                        />

                        <TextInputMask

                            type={"cpf"}
                            style={styles.input}
                            placeholder="CPF"
                            placeholderTextColor="#bbb"
                            value={cpf}
                            onChangeText={setCpf}
                            keyboardType="number-pad"
                            //ASSIM QUE SAIR DO CAMPO DIGITADO IRÁ FAZER A VERIFICAÇÃO 
                            onBlur={async () => {     
                                const cpfSemMascara = cpf.replace(/\D/g, "");
                                if (cpfSemMascara.length === 11) {
                                    const cpfExiste = await checkCpf(cpfSemMascara);
                                    if (cpfExiste) {
                                        Alert.alert("CPF já cadastrado", "Por favor, verifique o CPF.")
                                        setCpf("");
                                    }
                                }
                            }}
                        />
                        <TextInputMask

                            type={"datetime"}
                            options={{
                                format: "DD/MM/YYYY"
                            }}

                            style={styles.input}
                            placeholder="Data de nascimento"
                            placeholderTextColor="#bbb"
                            value={dataNascimento}
                            onChangeText={setDataNascimento}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholderTextColor="#bbb"
                            value={email}
                            onChangeText={setEmail}
                            maxLength={256}
                            onBlur={async () => {
                                const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                                if (emailValido) {
                                    const existe = await checkEmail(email);
                                    if (existe) {
                                        Alert.alert("E-mail já cadastrado", "Por favor, verifique o e-mail.");
                                        setEmail("");
                                    }
                                }
                            }}
                        />
                        <TextInputMask

                            type={"cel-phone"}
                            options={{
                                maskType: "BRL",
                                withDDD: true,
                                dddMask: "(99) "        //ESPAÇO INVISIVEL PARA FAZER A VERIFICAÇÃO IGUAL ESTÁ NO BANCO DE DADOS (99) 999..
                            }}

                            style={styles.input}
                            placeholder="Celular"
                            placeholderTextColor="#bbb"
                            value={celular}
                            onChangeText={setCelular}
                            keyboardType="phone-pad"
                            onBlur={async ()=>{
                                //FAÇO A VERIFICAÇÃO COM BASE NO FORMATO QUE ESTÁ NO BANCO DE DADOS (99) 99999-9999
                                if (celular.length === 15) {
                                    const celularExiste = await checkCelular(celular);
                                    if (celularExiste) {
                                        Alert.alert("Celular já cadastrado", "Por favor, verifique o Celular.")
                                        setCelular("");
                                    }
                                }
                            }}
                        />
                    </View>

                    <Button
                        title="Próximo"
                        onPress={handleProximo}
                    >
                    </Button>


                </View>

            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E878EF",
        zIndex: 99
    },
    top: {
        backgroundColor: "#E878EF",
        height: 100,
        alignItems: "center",
        justifyContent: "center",

    },
    topText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 50,
        position: "absolute",
    },
    bottom: {
        backgroundColor: "#242323",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopLeftRadius: 100,
        paddingTop: 55
    },
    inputArea: {
        width: "80%",
    },

    input: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: "#CC00D9",
        color: "#fff",
        borderRadius: 20,
        fontSize: 14,
    },
});