import {Text, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

function InstructionText({children}) {
    return <Text style={styles.instruction}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
  instruction: {
    color: Colors.yellow500,
    fontSize: 18,
    marginBottom: 8,
  },
});
