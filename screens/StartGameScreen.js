import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";

/**
 * StartGameScreen component
 * Initial screen where the user enters a number to start the game
 * Validates that the number is between 1 and 99
 * @param {Function} onConfirmedNumber - Callback function to pass the confirmed number to parent
 */
function StartGameScreen({ onConfirmedNumber }) {
  // Track the number entered by the user
  const [enteredNumber, setEnteredNumber] = useState("");

  /**
   * Handler for text input changes
   * @param {string} enteredText - The text entered by the user
   */
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  /**
   * Handler for confirm button press
   * Validates the input and either shows an error or confirms the number
   */
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    // Validate that number is between 1 and 99
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // Show alert for invalid input
      Alert.alert(
        "Invalid Input",
        "Please enter a valid number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }],
      );
      return;
    }
    // Pass the valid number to the parent component
    onConfirmedNumber(chosenNumber);
  }

  /**
   * Handler for reset button press
   * Clears the input field
   */
  function resetInputHandler() {
    setEnteredNumber("");
  }

  // Render the input screen with number input and action buttons
  return (
    <View style={styles.rootContainer}>
      <Title >Pick a Number</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.instruction}> Pick a number between 1 and 99 </Text>
        <TextInput
          style={styles.numberInputContainer}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

// Styles for the start game screen
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  inputContainer: {
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

  buttonContainer: {
    flexDirection: "row", // Place buttons side by side
    justifyContent: "Center",
  },

  numberInputContainer: {
    width: 50,
    fontSize: 32,
    color: Colors.yellow500, // Gold text color
    fontWeight: "bold",
    backgroundColor: Colors.purple700,
    borderBottomColor: Colors.yellow500, // Gold underline
    borderBottomWidth: 2,
    marginVertical: 8,
    textAlign: "center",
  },
  instruction: {
    color: Colors.yellow500,
    fontSize: 20,
    marginBottom: 8,
  },
});
