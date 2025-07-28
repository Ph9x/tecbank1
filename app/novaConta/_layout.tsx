import { Stack } from "expo-router";
import { RegisterProvider } from "../context/RegisterContext";

export default function Layout() {
    return (
        <RegisterProvider>      
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="infoPessoais" options={{ title: "Dados Pessoais" }} />
                <Stack.Screen name="endereco" options={{ title: "Endereço" }} />
                <Stack.Screen name="confirmacao" options={{ title: "Confirmar" }} />
                <Stack.Screen name="aviso" options={{ title: "Aviso" }} />
            </Stack>
        </RegisterProvider>

    );
}
