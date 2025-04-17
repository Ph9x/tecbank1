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
                    headerShown:false,
                    headerBackVisible: false,   //ESCONDE O BOTÃO DE VOLTAR DO HEADER
                    gestureEnabled: false  }}   //TIRA A OPÇÃO DE VOLTAR DESLIZANDO A TELA
            />

            <Stack.Screen name="servicos/seguro"         //TELA DE SEGURO
                options={{
                    title: "Tipo de Seguros",
                    headerShown:false,
                }}   
            />
            <Stack.Screen name="servicos/pix/pix"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown:false,
                }}   
            />
            <Stack.Screen name="servicos/pix/dadosUser"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown:false,
                }}   
            />
            <Stack.Screen name="servicos/pix/copiaCola"         //TELA DE SEGURO
                options={{
                    title: "Pix",
                    headerShown:false,
                }}   
            />
        </Stack>

        
    );
}

