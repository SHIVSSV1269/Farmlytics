import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const PestScanner = () => {
  const navigation = useNavigation<any>();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);

  const recentScans = [
    { id: 1, date: "Today, 2:30 PM", crop: "Wheat", result: "Healthy", confidence: 98, status: "healthy" },
    { id: 2, date: "Yesterday, 10:15 AM", crop: "Rice", result: "Brown Plant Hopper", confidence: 87, status: "pest" },
    { id: 3, date: "2 days ago", crop: "Cotton", result: "Leaf Spot Disease", confidence: 91, status: "disease" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "#4CAF50";
      case "pest": return "#F44336";
      case "disease": return "#FF9800";
      default: return "#777";
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult({
            detected: true,
            pest: "Aphids",
            confidence: 94,
            severity: "moderate",
            treatment: {
              immediate: "Apply neem oil spray",
              preventive: "Introduce ladybugs as natural predators",
              chemical: "Use imidacloprid-based insecticide if severe",
            },
          });
          Alert.alert("Scan Complete!", "Pest detected with 94% confidence");
          return 1;
        }
        return prev + 0.1;
      });
    }, 200);
  };

  const handleCameraCapture = async () => {
    const result = await launchCamera({ mediaType: "photo" });
    if (!result.didCancel) handleScan();
  };

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (!result.didCancel) handleScan();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pest Scanner</Text>
      </View>

      {/* Scanning Section */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          {isScanning ? (
            <Feather name="activity" size={40} color="#fff" />
          ) : (
            <Feather name="camera" size={40} color="#fff" />
          )}
        </View>
        <Text style={styles.cardTitle}>
          {isScanning ? "Scanning in Progress..." : "Scan Your Crop"}
        </Text>
        <Text style={styles.cardDescription}>
          {isScanning ? "AI is analyzing your crop for pests and diseases" : "Take a photo or upload an image of your crop for instant analysis"}
        </Text>

        {isScanning && (
          <View style={{ marginTop: 16 }}>
            <Progress.Bar progress={scanProgress} width={null} color="#4CAF50" />
            <Text style={styles.progressText}>
              {scanProgress < 0.3 ? "Preprocessing image..." :
               scanProgress < 0.7 ? "Analyzing crop health..." :
               scanProgress < 0.9 ? "Identifying potential issues..." :
               "Generating recommendations..."}
            </Text>
          </View>
        )}

        {!isScanning && !scanResult && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]} onPress={handleCameraCapture}>
              <Feather name="camera" size={28} color="#fff" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#009688" }]} onPress={handleImageUpload}>
              <Feather name="upload" size={28} color="#fff" />
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        )}

        {scanResult && (
          <View style={{ marginTop: 16 }}>
            <View style={[styles.badge, { backgroundColor: scanResult.severity === "high" ? "#F44336" : "#9E9E9E" }]}>
              <Text style={styles.badgeText}>{scanResult.confidence}% Confidence</Text>
            </View>

            <View style={[styles.resultCard, { borderLeftColor: "#F44336" }]}>
              <Text style={styles.resultTitle}>{scanResult.pest} Detected</Text>
              <Text style={styles.resultText}>Severity: {scanResult.severity}</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.treatmentTitle}>Treatment Recommendations:</Text>
              <Text style={styles.treatmentText}>• Immediate: {scanResult.treatment.immediate}</Text>
              <Text style={styles.treatmentText}>• Preventive: {scanResult.treatment.preventive}</Text>
              <Text style={styles.treatmentText}>• Chemical: {scanResult.treatment.chemical}</Text>
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#fff", borderWidth: 1, borderColor: "#4CAF50", marginTop: 16 }]} onPress={() => { setScanResult(null); setScanProgress(0); }}>
              <Text style={[styles.buttonText, { color: "#4CAF50" }]}>Scan Another Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Recent Scans */}
      <Text style={styles.sectionTitle}>Recent Scans</Text>
      {recentScans.map((scan) => (
        <View key={scan.id} style={styles.recentCard}>
          <Feather name={scan.status === "healthy" ? "check-circle" : scan.status === "pest" ? "alert-triangle" : "slash"} size={24} color={getStatusColor(scan.status)} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.recentCrop}>{scan.crop}</Text>
            <Text style={styles.recentDate}>{scan.date}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: getStatusColor(scan.status), fontWeight: "bold" }}>{scan.result}</Text>
            <Text style={styles.recentConfidence}>{scan.confidence}% confidence</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default PestScanner;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E0F2F1" },
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 12, color: "#333" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16 },
  iconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#009688", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  cardDescription: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 4 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  button: { flex: 1, marginHorizontal: 4, padding: 12, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", marginTop: 4 },
  progressText: { textAlign: "center", marginTop: 4, color: "#777" },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: "center" },
  badgeText: { color: "#fff", fontWeight: "bold" },
  resultCard: { padding: 12, borderLeftWidth: 4, backgroundColor: "#fff", marginTop: 8 },
  resultTitle: { fontWeight: "bold", fontSize: 16 },
  resultText: { fontSize: 14, color: "#777" },
  treatmentTitle: { fontWeight: "bold", marginTop: 8 },
  treatmentText: { fontSize: 14, color: "#555", marginLeft: 4 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  recentCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
  recentCrop: { fontWeight: "bold", fontSize: 16 },
  recentDate: { fontSize: 12, color: "#777" },
  recentConfidence: { fontSize: 12, color: "#777" },
});
