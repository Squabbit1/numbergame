// Import necessary dependencies
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

/**
 * Main App component for the Number Game
 * Manages the game state and navigation between screens
 */

export default function App() {
// Track the user's chosen number
const [userNumber, setUserNumber] = useState();

/**
 * Handler function called when the user confirms their number
 * @param {number} confirmedNumber - The number chosen by the user
 */
function confirmedNumberHandler(confirmedNumber) {
  setUserNumber(confirmedNumber);
}

// Default screen is the start screen where user enters a number
let screen = <StartGameScreen onConfirmedNumber={confirmedNumberHandler}/>;

// Once user has confirmed a number, switch to the game screen
if (userNumber) {
  screen = <GameScreen />;
}
  // Render the app with gradient background and image overlay
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.15 }}
        style={styles.container}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            {screen}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </LinearGradient>
  );
}

// Styles for the app container
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
  },
  /**container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },*/
});
