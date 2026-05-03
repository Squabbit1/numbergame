// ...existing code...
import { View, StyleSheet, Image, Text } from "react-native";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";

/**
 * GameOverScreen component
 *
 * - Displays a centered "Game Over" title and a Card containing:
 *   - a summary message with the number of guesses and the picked number.
 *     The numbers are rendered as nested <Text> elements so they can use
 *     a bold font style (font must be loaded in App.js before rendering).
 *   - a PrimaryButton that triggers onStartNewGame when pressed.
 * - Shows a local image below the Card, centered and scaled with 'contain'.
 *
 * Props:
 * - guesses (number): how many guesses the app took
 * - userNumber (number): the user's chosen number
 * - onStartNewGame (function): callback to reset/start a new game
 *
 * Notes:
 * - InstructionText is expected to render a Text container, which allows
 *   nesting plain <Text> elements for inline styling.
 * - Ensure the "open-sans-bold" font is loaded in App.js before this screen
 *   mounts; otherwise the boldText style will fall back to the default font.
 */
function GameOverScreen({ guesses, userNumber, onStartNewGame }) {
  return (
    // Root container: centers the entire screen content vertically & horizontally
    <View style={styles.rootContainer}>
      {/* Heading */}
      <Title>Game Over!</Title>

      {/* Card groups the summary text and the action button */}
      <Card>
        {/* Summary text: nested <Text> elements are used for bold styling */}
        <InstructionText>
          It took me <Text style={styles.boldText}>{guesses}</Text>
          {" "}guesses to guess the number{" "}
          <Text style={styles.boldText}>{userNumber}</Text>!
        </InstructionText>

        {/* Button row: centered inside the Card; PrimaryButton calls parent handler */}
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </Card>

      {/* Decorative image below the Card:
          - Local asset required via relative path
          - style ensures it stays centered and maintains aspect ratio
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
  // Root container centers everything on screen
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Row that holds the button(s) and centers them horizontally inside the Card
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  // Image styling:
  // - alignSelf centers the image within the parent View
  // - width/height control displayed size; adjust as needed for different screens
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginTop: 20,
  },

  // Bold inline text style — relies on the loaded bold font
  boldText: {
    fontFamily: "open-sans-bold",
    color: "white",
  },
});