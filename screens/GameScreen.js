import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
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

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {
    if (direction === "lower" ) {
      maxBoundary = currentGuess;
    }
    else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => nextGuessHandler("higher")}>Higher</PrimaryButton>
        <PrimaryButton onPress={nextGuessHandler.bind(this,"lower")}>Lower</PrimaryButton>
      </View>
      <View>
        <Text>Log Rounds</Text>
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
  }
});
