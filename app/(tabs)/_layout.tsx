import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarInactiveTintColor: "#777",
                tabBarActiveTintColor: "#fff",
                headerShown: false,
                tabBarStyle: { backgroundColor: "#333" },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={25} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="areaPix"
                options={{
                    headerShown: false,
                    title: "Pagamentos",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={25} name="money-bill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="carteira"
                options={{
                    title: "Carteira",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={25} name="wallet" color={color} />
                    ),
                }}
            />
                <Tabs.Screen
                    name="cartao"
                    options={{
                        title: "Cartão",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={25} name="credit-card" color={color} />
                        ),
                    }}
                />
        </Tabs>
    );
}
