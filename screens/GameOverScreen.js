import { Text } from "react-native";

function GameOverScreen({ guesses, userNumber}) {
  return (
    <Text>
      Game Over!{"\n"}
      It took me {guesses} guesses to guess the number {userNumber}!
    </Text>
  );
}

export default GameOverScreen;
