import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{children}</Text>
        </View>
    );
}
export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.yellow500,
        padding: 24,
        margin: 24,
        alignItems: "center",
        justifyContent: "center",
        borderradious: 8,
    },
    number: {
        color: Colors.yellow500,
        fontSize: 36,
        fontWeight: "bold",
    }
});
