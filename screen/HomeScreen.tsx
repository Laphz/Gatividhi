import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "expo-router";
import { Checkbox } from "react-native-paper";

const HomeScreen = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for Firestore
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosList);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  // Toggle todo completion
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, "todos", id), { completed: !completed });
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  // delete todo
  const deleteTodo = async (id: string) => {
    Alert.alert("Delete Gatividhi", "Are you sure to delete this Gatividhi?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "todos", id));
            Alert.alert("Success", "Gatividhi delete successfully.");
          } catch (error) {
            Alert.alert("Error", "Something went wrong!");
            console.log("[ERROR] ", error);
          }
        },
      },
    ]);
  };

  // Render each todo item
  const renderTodo = ({ item }: { item: any }) => (
    <TouchableOpacity
      onLongPress={() => deleteTodo(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.todoItem}>
        <Checkbox
          status={item.completed ? "checked" : "unchecked"}
          onPress={() => toggleTodo(item.id, item.completed)}
          color="#000000"
        />
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Gatividhiya</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : todos.length === 0 ? (
        <Text style={styles.emptyText}>No Gatividhiya yet. Add some!</Text>
      ) : (
        <FlatList
          data={todos.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderTodo}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Link asChild href="/todos">
        <TouchableOpacity activeOpacity={0.7} style={styles.createTodoBtn}>
          <Text style={styles.btnText}>Create Gatividhi</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    color: "#000000",
    flex: 1, // Takes up remaining space
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  createTodoBtn: {
    backgroundColor: "#000000",
    padding: 15,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
