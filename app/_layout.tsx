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
                headerStyle:{
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
        </Stack>
    );
}