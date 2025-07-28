import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, Alert } from "react-native";
import { Button } from "../../componentes/button";
import { TextInputMask } from 'react-native-masked-text';
import { router } from "expo-router";
import { useRegister } from "../context/RegisterContext";

export default function EnderecoScreen() {
    const { userData, setUserData } = useRegister();
    const [cepInvalido, setCepInvalido] = useState(false);  //CASO O CEP SEJA INVALIDO 


    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");


    //BUSCAR ENDEREÇO VIA API
    const buscarEndereco = async (cepLimpo: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (data.erro) {
                setCepInvalido(true);
                Alert.alert("Erro", "CEP não encontrado.");
                setRua("");
                setCidade("");
                setUf("");
                setNumero("");
                return;
            }

            setRua(data.logradouro || "");
            setCidade(data.localidade || "");
            setUf(data.uf || "");
            setCepInvalido(false);  //CEP VÁLIDO
        } catch (error) {
            Alert.alert("Erro", "Erro ao buscar o endereço.");
        }
    };

    // TIRANDO A MASCARA PARA BUSCAR O ENDEREÇO NA MINHA API 
    useEffect(() => {
        const cepSemMascara = cep.replace(/\D/g, "");
        if (cepSemMascara.length === 8) {
            buscarEndereco(cepSemMascara);
        }
    }, [cep]);

    const handleProximo = () => {

        if (cepInvalido) {      //SÓ IRÁ PROSSEGUIR SE INSERIR UM CEP VÁLIDO
            Alert.alert("Erro", "Insira um CEP válido para continuar.");
            return;
        }
        //VERIFICA SE TODOS OS CAMPOS FORAM ENVIADOS
        if (!cep || !rua || !numero || !cidade || !uf) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (cep.length < 9) {
            Alert.alert("Erro", "O cep é inválido");
            return;
        }

        setUserData(prev => ({
            ...prev,
            cep: cep,           //X remove a máscara do CEP
            rua,
            numero,
            cidade,
            uf: uf.toUpperCase(), // garante que seja maiúsculo
        }));
        router.replace("/novaConta/confirmacao"); //SE DER TUDO CERTO VAI PARA OUTRA PÁGINA
    };

    return (
        <KeyboardAvoidingView                   //Evita que o teclado esconda os campo de entrada 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para iOS e Android
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

                <View style={styles.top}>
                    <Text style={styles.topText}>ENDEREÇO</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.inputArea}>

                        <TextInputMask
                            type={"custom"}
                            options={{
                                mask: "99999-999"
                            }}
                            style={styles.input}
                            placeholder="CEP"
                            placeholderTextColor="#bbb"
                            value={cep}
                            onChangeText={setCep}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Rua"
                            placeholderTextColor="#bbb"
                            autoCapitalize="words"      //DEIXA TODA LETRA MAIÚSCULA
                            value={rua}
                            onChangeText={setRua}
                            maxLength={256}
                            editable={cepInvalido}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Número"
                            placeholderTextColor="#bbb"
                            value={numero}
                            onChangeText={setNumero}
                            keyboardType="numeric"
                            maxLength={12}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            placeholderTextColor="#bbb"
                            value={cidade}
                            onChangeText={setCidade}
                            keyboardType="default"
                            maxLength={48}
                            editable={cepInvalido}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="UF"
                            placeholderTextColor="#bbb"
                            value={uf}
                            onChangeText={setUf}
                            keyboardType="default"
                            maxLength={2}
                            editable={cepInvalido}
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