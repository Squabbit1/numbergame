import { View, Text, StyleSheet } from "react-native";
import Title from "../components/Title";
/**
 * GameScreen component
 * Displays the main game interface where the user plays the guessing game
 * Currently shows a placeholder text
 */
function GameScreen() {
  return (
    <View style={styles.container}>
  <Title>Opponent's Guess</Title>
{/* Guess */}
<View>
<Text>Higher or Lower?</Text>
{/* + or - */}
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

});
