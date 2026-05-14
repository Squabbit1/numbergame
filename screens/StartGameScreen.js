import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

/**
 * StartGameScreen component
 * Initial screen where the user enters a number to start the game
 * Validates that the number is between 1 and 99
 * @param {Function} onConfirmedNumber - Callback function to pass the confirmed number to parent
 */
function StartGameScreen({ onConfirmedNumber }) {
  // Track the number entered by the user
  const [enteredNumber, setEnteredNumber] = useState("");
  const { width, height } = useWindowDimensions();
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
  const margintopDistance = height < width ? 10 : 75; // Adjust top margin based on device height
  // Render the input screen with number input and action buttons
  return (
    <ScrollView style={styles.mainScreen}> 
     {/*  mainly for IOS to avoid keyboard covering content when in landscape mode */}
      <KeyboardAvoidingView style={styles.mainScreen} behavior="position">  
        {/*  mainly for IOS to avoid keyboard covering content when in landscape mode */}
        <View style={[styles.rootContainer, { marginTop: margintopDistance }]}>
          <Title>Pick a Number</Title>
          <Card>
            <InstructionText>Pick a number between 1 and 99</InstructionText>
            <TextInput
              style={styles.numberInputContainer}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              <PrimaryButton onPress={confirmInputHandler}>
                Confirm
              </PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

// Styles for the start game screen

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
  rootContainer: {
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 20,
    textAlign: "center",
  },
});
