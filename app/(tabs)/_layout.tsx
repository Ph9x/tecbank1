import FontAwesome from "@expo/vector-icons/FontAwesome5";       //PEGA ICONES
import { Tabs } from "expo-router";         //ÁREAS ESPECÍFICAS

//(tabs) -> ÁREAS DO LAYOUT (inicio, categorias, sobre mim)

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#fff",
            headerShown:false,
            tabBarStyle:{       //AREA DE BAIXO DO MEU TAB 
                backgroundColor: "#333",

            }
        }}>
            <Tabs.Screen
                name="home"             //CAMINHO PARA ABA
                options={{
                    title: "Início",     //nome
                    tabBarIcon: ({ color }) => <FontAwesome        //PROPS DO ICONE
                        size={25}       //TAMANHO
                        name="home"     //NOME DO ICONE
                        color={color}
                    />
                }}
            />
            <Tabs.Screen
                name="areaPix"
                options={{
                    headerShown: false,     //REMOVER HEADER DO TAB
                    title: "Pagamentos",
                    tabBarIcon: ({ color }) => <FontAwesome        //PROPS DO ICONE
                        size={25}
                        name="money-bill"
                        color={color}
                    />
                }}
            />
            <Tabs.Screen
                name="carteira"
                options={{
                    title: "Carteira",
                    tabBarIcon: ({ color }) => <FontAwesome        //PROPS DO ICONE
                        size={25}
                        name="wallet"
                        color={color}
                    />
                }}
            />
            <Tabs.Screen
                name="cartao"
                options={{
                    title: "Cartão",
                    tabBarIcon: ({ color }) => <FontAwesome        //PROPS DO ICONE
                        size={25}
                        name="credit-card"
                        color={color}
                    />
                }}
            />
        </Tabs>
    );
}