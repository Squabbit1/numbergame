import { View, Text, Pressable, StyleSheet } from "react-native";

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
        android_ripple={{ foreground: true, color: "#640233" }}
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
    overflow: "hidden", // Ensures ripple effect stays within rounded corners
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c", // Dark pink/purple background
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
