
import { View, Text, FlatList, StyleSheet } from "react-native";

/**
 * GuessList
 * - Renders the guesses array (newest-first) as a FlatList
 * - Labels rounds so the UI shows "Guess 1 was 45" etc.
 *
 * Props:
 * - guesses: [{id, value}, ...]
 */
export default function GuessList({ guesses }) {
  function renderItem({ item, index }) {
    const round = guesses.length - index; // newest-first -> compute human round
    return (
      <View style={styles.listItem}>
        <Text style={styles.guessText}>Guess {round} was</Text>
        <Text style={styles.guessNumber}>{item.value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={guesses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});