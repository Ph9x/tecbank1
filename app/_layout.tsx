import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 20, // Tamanho da fonte do título
                    fontWeight: "bold"
                },
                headerStyle: {
                    backgroundColor: "#E878EF"
                }

            }}
        >
            <Stack.Screen name="index" options={{ title: "Voltar", headerShown: false }} />

            <Stack.Screen name="login" options={{
                title: "Login",
            }} />

            <Stack.Screen name="novaConta" options={{
                title: "Cadastro"
            }} />

            <Stack.Screen name="(tabs)"         //HOME/CARTÃO/SEGUROS
                options={{
                    title: "AREAS",
                    headerShown: false,
                    headerBackVisible: false,   //ESCONDE O BOTÃO DE VOLTAR DO HEADER
                    gestureEnabled: false
                }}   //TIRA A OPÇÃO DE VOLTAR DESLIZANDO A TELA
            />

            <Stack.Screen name="servicos/seguro"         //TELA DE SEGURO
                options={{
                    title: "Tipo de Seguros",
                    headerShown: false,
                }}
            />

            <Stack.Screen name="servicos/trocarSenha"         //TELA DE TROCAR SENHA
                options={{
                    title: "Trocar Senha",
                    headerShown: false,
                }}
            />

            <Stack.Screen name="servicos/extrato"
                options={{
                    title: "Extrato",
                    headerShown: false,
                }}
            />

            <Stack.Screen name="servicos/registrarChavePix"
                options={{
                    title: "Chave Pix",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/guardarDinheiro"
                options={{
                    title: "Guardar Dinheiro",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/EscanearPix"
                options={{
                    title: "Escanear pix",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/pagarBoleto"
                options={{
                    title: "Pagar Boleto",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/cartaoSolicitado"
                options={{
                    title: "Cartão Solicitado",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/minhaConta"
                options={{
                    title: "Minha Conta",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/informacoes"
                options={{
                    title: "Informações",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/sobreBanco"
                options={{
                    title: "Sobre o Banco",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/pix/pix"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/pix/dadosUser"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="servicos/pix/copiaCola"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown: false,
                }}
            />
        </Stack>


    );
}

