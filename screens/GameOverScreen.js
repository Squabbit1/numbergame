import { View, StyleSheet, Image } from "react-native";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";

/**
 * GameOverScreen component
 * - Shows a "Game Over" message, how many guesses the app took,
 *   the user's chosen number, a button to start a new game,
 *   and an image below the card.
 *
 * Props:
 * - guesses: number of guesses it took
 * - userNumber: the number the user picked
 * - onStartNewGame: callback to reset/start a new game
 */
function GameOverScreen({ guesses, userNumber, onStartNewGame }) {
  return (
    // Root container for the whole screen
    <View>
      {/* Card wraps the textual content and button for visual grouping */}
      <Card>
        {/* Title component displays the heading */}
        <Title>Game Over!{"\n"}</Title>

        {/* InstructionText shows the summary with interpolated props */}
        <InstructionText>
          It took me {guesses} guesses to guess the number {userNumber}!
        </InstructionText>

        {/* Button row: centers the PrimaryButton inside the card */}
        <View style={styles.buttonContainer}>
          {/* PrimaryButton triggers the parent callback to start a new game */}
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </Card>

      {/* Image displayed below the Card.
          - source: local asset (GIF in this example)
          - style: controls size and centering
          - resizeMode: 'contain' keeps aspect ratio while fitting the box
      */}
      <Image
        source={require("../assets/images/greatjob.gif")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  // Row that holds the button(s) and centers them horizontally
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  // Image styling:
  // - alignSelf: 'center' ensures the image is centered within the parent
  // - width/height control the displayed size
  // - marginTop gives spacing between the Card and the image
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginTop: 20,
  },
});