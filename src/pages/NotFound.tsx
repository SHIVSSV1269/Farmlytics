import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const NotFound = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      route.name
    );
  }, [route.name]);

  const handleNavigateHome = () => {
    navigation.navigate("Welcome");
  };

  const handleNavigateDashboard = () => {
    navigation.navigate("Dashboard"); // Adjust screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Feather name="leaf" size={40} color="#4CAF50" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.errorCode}>404</Text>
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.description}>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.heroButton} onPress={handleNavigateHome}>
            <Feather name="home" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.heroButtonText}>Return to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} onPress={handleNavigateDashboard}>
            <Text style={styles.outlineButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#A7FFEB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  errorCode: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 4,
  },
  buttonContainer: {
    width: "100%",
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  heroButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 16,
  },
});
