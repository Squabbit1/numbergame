// Main application entry — manages screen flow and global assets (fonts, background)
import { useState } from "react"; // React hook to manage component state
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// App screens
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// App constants and font loading
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

/**
 * Main App component for the Number Game
 * - Loads custom fonts before rendering UI
 * - Tracks game state (selected number, whether the game is over, how many rounds)
 * - Chooses which screen to render: StartGameScreen, GameScreen, or GameOverScreen
 */
export default function App() {
  // Track the user's chosen number (undefined until selected)
  const [userNumber, setUserNumber] = useState();

  // Whether the game has finished (true shows GameOverScreen when userNumber exists)
  const [gameIsOver, setGameIsOver] = useState(true);

  // How many guesses the app used; passed to GameOverScreen
  const [guessRounds, setGuessRounds] = useState(0);

  // Load custom fonts from the assets/fonts folder.
  // useFonts returns a boolean that indicates when fonts are ready.
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // While fonts are loading, render the AppLoading component to block UI.
  // (AppLoading shows a splash until the fonts are ready.)
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  /**
   * Handler: user has confirmed their chosen number on the Start screen.
   * - store the chosen number and switch to the GameScreen
   */
  function confirmedNumberHandler(confirmedNumber) {
    setUserNumber(confirmedNumber);
    setGameIsOver(false);
  }

  /**
   * Handler: called by GameScreen when the app guesses the number.
   * - marks the game as over and stores how many guesses it took
   */
  function gameOverHandler(guesses) {
    setGameIsOver(true);
    setGuessRounds(guesses);
  }

  /**
   * Handler: start a new game by clearing stored number/rounds.
   * - passed to GameOverScreen so the user can reset the app
   */
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  // Decide which screen to show based on current state:
  // - default: start screen where the user picks a number
  let screen = <StartGameScreen onConfirmedNumber={confirmedNumberHandler} />;

  // If the user has chosen a number, show the GameScreen (the guessing UI)
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  // If the game is over and we have a userNumber, show the GameOverScreen
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        guesses={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  // Render the selected screen inside a decorative background:
  // - LinearGradient provides the gradient background
  // - ImageBackground overlays a faint image (opacity controlled in imageStyle)
  // - SafeAreaView ensures content avoids notches / status bar areas
  return (
    <LinearGradient colors={[Colors.purple650, Colors.yellow500]} style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.15 }} // make background image subtle
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
    flex: 1, // fill the whole screen
  },
  /** 
   * Note: commented-out alternative container was left for reference.
   * Keep the simple full-screen container above for consistent layout.
   */
});