import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons} from "@expo/vector-icons";
/**
 * GameScreen component
 * Displays the main game interface where the user plays the guessing game
 */

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([
    { id: Math.random().toString(), value: initialGuess },
  ]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guesses.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
    setGuesses((prevGuesses) => [
      { id: Math.random().toString(), value: newRndNumber },
      ...prevGuesses,
    ]);
  }
  function renderGuessItem({ item, index }) {
    // newest-first ordering -> round number = total - index
    const round = guesses.length - index;
    return (
      <View style={styles.listItem}>
        <Text style={styles.guessText}>Guess {round} was</Text>
        <Text style={styles.guessNumber}>{item.value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Is your number Higher or Lower?
        </InstructionText>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("higher")}>
            Higher
            {"\n"}
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </PrimaryButton>

          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            Lower {"\n"}
            <Ionicons name="remove-circle-outline" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>

      <View style={styles.guessesContainer}>
        <FlatList
          data={guesses}
          renderItem={renderGuessItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "row", // Place buttons side by side
    justifyContent: "center",
  },
  guessesContainer: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  guessText: {
    fontSize: 16,
  },
  guessNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionText: {
    marginBottom: 20,
  },
});
