import { View, StyleSheet, Alert} from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessList from "../components/game/GuessList";

/**
 * Helper: generate a random integer between min (inclusive) and max (exclusive)
 * If the random equals `exclude`, it recurses to get a different value.
 */
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

// Module-scoped boundaries used to keep track of the current search range.
// These persist across re-renders but are reset when a new game starts.
let minBoundary = 1;
let maxBoundary = 100;

/**
 * GameScreen component
 *
 * Props:
 * - userNumber: the number chosen by the user (the target)
 * - onGameOver: callback(numberOfGuesses) invoked when the app guesses correctly
 *
 * Behavior overview:
 * - Pick an initial random guess (not equal to userNumber).
 * - Show current guess and two buttons (higher / lower).
 * - When user indicates higher/lower:
 *     - Validate the hint (prevent cheating).
 *     - Shrink the search range (minBoundary / maxBoundary).
 *     - Generate a new guess inside the updated range.
 *     - Track every guess in `guesses` for display in a FlatList.
 * - When current guess === userNumber, call onGameOver with number of guesses
 *   and reset the min/max boundaries.
 */
function GameScreen({ userNumber, onGameOver }) {
  // initialGuess: one random guess to start the game
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  // currentGuess: the latest guess the app made (renders in NumberContainer)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // guesses: array of guess objects {id, value}, newest first for FlatList.
  const [guesses, setGuesses] = useState([
    { id: Math.random().toString(), value: initialGuess },
  ]);

  /**
   * Effect: monitor when the current guess matches the user's number.
   * - If they match, call onGameOver with how many guesses we took.
   * - Reset the min/max boundaries for the next game.
   */
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guesses.length);
      // reset boundaries so the next game starts fresh
      minBoundary = 1;
      maxBoundary = 100;
    }
    // we intentionally depend on currentGuess and userNumber here
  }, [currentGuess, userNumber, onGameOver]);

  /**
   * Handle the user pressing Higher or Lower.
   * - direction is "higher" or "lower"
   * - Validate the input: if the user lies (direction contradicts known bounds),
   *   show an alert and ignore the action.
   * - Update the min/max boundaries according to feedback.
   * - Generate a new guess, update currentGuess and prepend it to guesses array.
   */
  function nextGuessHandler(direction) {
    // guard against contradictory user hints
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    // Narrow the search range according to the user's hint
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      // when higher, we can exclude the current guess itself
      minBoundary = currentGuess + 1;
    }

    // Pick a new guess inside the updated boundaries, excluding the previous guess
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    // Update state: display new guess and push it to the guesses list (newest-first)
    setCurrentGuess(newRndNumber);
    setGuesses((prevGuesses) => [
      { id: Math.random().toString(), value: newRndNumber },
      ...prevGuesses,
    ]);
  }
  // UI structure:
  // - Title, NumberContainer showing currentGuess
  // - Card with instruction text and two arrow buttons (Ionicons inside PrimaryButton)
  // - FlatList that renders each previous guess
  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>

      {/* Large display of the current guess */}
      <NumberContainer>{currentGuess}</NumberContainer>

      {/* Card groups instruction text and the two action buttons */}
      <Card>
        <InstructionText style={styles.instructionText}>
          Is your number Higher or Lower?
        </InstructionText>

        {/* Button row: two PrimaryButtons side-by-side */}
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("higher")}>
            {/* arrow-up icon indicates 'Higher' (icon color matches button text) */}
            <Ionicons name="arrow-up" size={24} color="white" />
          </PrimaryButton>

          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            {/* arrow-down icon indicates 'Lower' */}
            <Ionicons name="arrow-down" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>
+      {/* guesses list handled by GuessList component */}
+      <GuessList guesses={guesses} />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  // Row for the higher/lower buttons
  buttonContainer: {
    flexDirection: "row", // place buttons horizontally
    justifyContent: "center", // center them in the Card
  },
  instructionText: {
    marginBottom: 20,
  },
});