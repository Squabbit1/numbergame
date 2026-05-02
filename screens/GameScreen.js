import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
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
  const [guesses, setGuesses] = useState(1);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guesses);
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
    setGuesses((prevGuesses) => prevGuesses + 1);
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Is your number Higher or Lower?</InstructionText>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("higher")}>
            Higher
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            Lower
          </PrimaryButton>
        </View>
      </Card>
      <View style={styles.guessesContainer}>
        <FlatList
          data={guesses}
          renderItem={(itemData) => {
            return (
            <guessNumber
                text={itemData.item.text}
                id={itemData.item.id}
                />
            );
            }}
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
    justifyContent: "Center",
  },
  guessesContainer: {
    flex: 1,
    padding: 16,
  },
});
