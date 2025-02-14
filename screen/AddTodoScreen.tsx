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
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import { db } from "../firebaseConfig";

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
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.text}>Add Gatividhi</Text>
        <TextInput
          label="Gatividhi"
          mode="outlined"
          placeholder="Enter Gatividhi"
          value={title}
          onChangeText={(text) => setTitle(text)}
          theme={{
            colors: {
              primary: "#ffffff",
              placeholder: "#000000",
              text: "#000000",
            },
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.createTodoBtn}
          onPress={addTodo}
        >
          <Text style={styles.btnText}>Create ToDo</Text>
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
    backgroundColor: "#f7f7f7",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  createTodoBtn: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTodoScreen;
