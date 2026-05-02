import { StyleSheet, Text } from "react-native";


function Title ({children}) {
    return ( <Text style={styles.title}>{children}</Text>

    )
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    //borderWidth: 2,
    //borderColor: "white",
    padding: 12,
  }
});