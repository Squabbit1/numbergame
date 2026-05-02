import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";


function Card({children}) {
    return <View style={styles.card}>{children}</View>
     }

export default Card;

const styles = StyleSheet.create({
card: {
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.purple700, // Dark purple background
    borderRadius: 8,
    elevation: 4, // Android shadow
    shadowColor: "black", // iOS shadow properties
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },

})