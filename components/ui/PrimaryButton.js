import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

/**
 * PrimaryButton component
 * Reusable button component with custom styling and ripple effect
 * @param {ReactNode} children - The button text or content to display
 * @param {Function} onPress - Callback function to execute when button is pressed
 */
function PrimaryButton({ children, onPress }) {

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={styles.buttonInnerContainer}
        onPress={onPress}
        android_ripple={{ foreground: true, color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

// Styles for the primary button component
const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1,
    borderRadius: 28,
    margin: 4,
    padding: 8,
    overflow: "hidden", // Ensures ripple effect stays within rounded corners
  },
  buttonInnerContainer: {
    
    backgroundColor: Colors.purple500, // Dark pink/purple background
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // Android shadow
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
