import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
    title:string;
    onPress: () => void;
}

export const Button = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7} // Altera opacidade ao pressionar
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "80%",
        backgroundColor: "#CC00D9", // Cor principal
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 20,
        marginBottom: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,

    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    }

})