import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  DefaultTheme,
} from "react-native-paper";
import { db } from "../firebaseConfig";

// Custom Paper theme to enforce light mode
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000", // Black for focus underline
    background: "#FFFFFF", // White background for TextInput
    placeholder: "#777777", // Grey placeholder
  },
};

const AddTodoScreen = () => {
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    if (title.trim()) {
      try {
        console.log("Adding:", title);
        await addDoc(collection(db, "todos"), { title, completed: false });
        setTitle("");
        Alert.alert("Success", "Gatividhi added successfully");
      } catch (error) {
        Alert.alert("Error", "Failed to add Gatividhi");
        console.error("Firestore Error:", error);
      }
    } else {
      Alert.alert("Validation", "Please enter a valid Gatividhi");
    }
  };

  return (
    <PaperProvider theme={lightTheme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.header}>Add Gatividhi</Text>
        <TextInput
          label="Gatividhi"
          mode="outlined"
          placeholder="Enter your Gatividhi"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          theme={lightTheme} // Enforcing light theme specifically for the TextInput
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.createTodoBtn}
          onPress={addTodo}
        >
          <Text style={styles.btnText}>Create Gatividhi</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF", // Enforcing white background for the screen
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000", // Black text
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF", // White input background
    color: "#000000", // Black text inside input
  },
  createTodoBtn: {
    backgroundColor: "#000000", // Black button
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  btnText: {
    color: "#FFFFFF", // White text on the button
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddTodoScreen;
