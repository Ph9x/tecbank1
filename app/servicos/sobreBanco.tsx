import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

export default function sobreBancoScreen() {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SOBRE O BANCO</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="xmark" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.area}>
                <View style={styles.areaCima}>
                    <Text style={styles.sectionTitle}>Relatores</Text>
                    <View style={styles.imageRow}>
                        <View style={styles.personContainer}>

                            <Image
                                source={require('../../assets/integrantes/NICOLAS_LEITE.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.personName}>Nicolas Leite</Text>
                            <Text style={styles.personRole}>Relator</Text>
                        </View>
                        <View style={styles.personContainer}>

                            <Image
                                source={require('../../assets/integrantes/NICOLAS_QUEIROZ.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.personName}>Nicolas Queiroz</Text>
                            <Text style={styles.personRole}>Relator</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.areaBaixo}>
                    <Text style={styles.sectionTitle}>Desenvolvedores</Text>
                    <View style={styles.imageRow}>
                        <View style={styles.personContainer}>

                            <Image
                                source={require('../../assets/integrantes/THIAGO.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.personName}>Thiago</Text>
                            <Text style={styles.personRole}>Front-end</Text>
                        </View>
                        <View style={styles.personContainer}>

                            <Image
                                source={require('../../assets/integrantes/PEDRO.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.personName}>Pedro</Text>
                            <Text style={styles.personRole}>Front-end/{'\n'}Back-end</Text>
                        </View>
                        <View style={styles.personContainer}>

                            <Image
                                source={require('../../assets/integrantes/HENRY.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.personName}>Henry</Text>
                            <Text style={styles.personRole}>Back-end</Text>
                        </View>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#333",
    },
    header: {
        height: 80,
        backgroundColor: "#333",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 25,
        borderBottomWidth: 3,
        borderColor: "#993399",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    area: {
        flex: 1,
    },
    areaCima: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    areaBaixo: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        marginTop: -20
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 30,
        color: "#fff",
    },

    imageRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },

    personContainer: {
        alignItems: "center",
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: "#993399",
    },

    personRole: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "500"
    },
    personName: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#ccc",
    },
});
