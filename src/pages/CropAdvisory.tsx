import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useToast } from "../hooks/use-toast";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Sprout, Droplets, Scissors, Calendar, Thermometer, Target, Clock, MapPin } from "lucide-react-native";

const CropAdvisory = () => {
  const navigation = useNavigation();
  const { show: toast } = useToast();
  const [selectedCrop, setSelectedCrop] = useState("");

  const advisoryCategories = [
    {
      id: "irrigation",
      title: "Irrigation Schedule",
      icon: Droplets,
      color: "#3B82F6", // blue
      recommendations: [
        "Water your crops early morning (5-7 AM) or evening (6-8 PM)",
        "Check soil moisture 2-3 inches deep before watering",
        "Apply 25-30mm water per week for wheat crops",
      ]
    },
    {
      id: "fertilizer",
      title: "Fertilizer Application",
      icon: Target,
      color: "#10B981", // green
      recommendations: [
        "Apply Urea 50kg/acre after first rain",
        "Mix DAP 100kg/acre during sowing time",
        "Use organic compost 2 tons/acre for better soil health",
      ]
    },
    {
      id: "pruning",
      title: "Crop Management",
      icon: Scissors,
      color: "#F59E0B", // orange
      recommendations: [
        "Remove weak and diseased branches regularly",
        "Maintain proper plant spacing for air circulation",
        "Harvest when 80% of grains turn golden yellow",
      ]
    },
    {
      id: "sowing",
      title: "Sowing Guidelines",
      icon: Calendar,
      color: "#8B5CF6", // purple
      recommendations: [
        "Best sowing time: Mid-November to December",
        "Seed rate: 100-125 kg/hectare for wheat",
        "Row spacing: 20-23 cm for optimal growth",
      ]
    },
  ];

  const currentAdvisory = {
    crop: "Wheat",
    location: "Punjab, India",
    stage: "Flowering Stage",
    weather: "Sunny, 22°C",
    nextAction: "Apply second dose of fertilizer",
    priority: "high"
  };

  const handleGetPersonalizedAdvice = () => {
    toast({
      title: "Generating Personalized Advice",
      description: "AI is analyzing your crop data and weather conditions...",
    });
    setTimeout(() => {
      toast({
        title: "Advisory Ready!",
        description: "Check your personalized recommendations below.",
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft width={20} height={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <View style={styles.iconWrapper}>
            <Sprout width={20} height={20} color="#10B981" />
          </View>
          <View>
            <Text style={styles.headerText}>Crop Advisory</Text>
            <Text style={styles.headerSubtitle}>Personalized farming guidance</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Current Status */}
        <View style={[styles.card, currentAdvisory.priority === "high" && { borderLeftColor: "#EF4444" }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Current Crop Status</Text>
            <View style={[styles.badge, currentAdvisory.priority === "high" ? styles.badgeHigh : styles.badgeNormal]}>
              <Text style={styles.badgeText}>{currentAdvisory.priority === "high" ? "High Priority" : "Normal"}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <View style={styles.infoBlock}>
                <View style={styles.iconRow}>
                  <Sprout width={16} height={16} color="#000" />
                  <Text style={styles.label}>Crop</Text>
                </View>
                <Text style={styles.value}>{currentAdvisory.crop}</Text>
              </View>
              <View style={styles.infoBlock}>
                <View style={styles.iconRow}>
                  <MapPin width={16} height={16} color="#000" />
                  <Text style={styles.label}>Location</Text>
                </View>
                <Text style={styles.value}>{currentAdvisory.location}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.infoBlock}>
                <View style={styles.iconRow}>
                  <Clock width={16} height={16} color="#000" />
                  <Text style={styles.label}>Growth Stage</Text>
                </View>
                <Text style={styles.value}>{currentAdvisory.stage}</Text>
              </View>
              <View style={styles.infoBlock}>
                <View style={styles.iconRow}>
                  <Thermometer width={16} height={16} color="#000" />
                  <Text style={styles.label}>Weather</Text>
                </View>
                <Text style={styles.value}>{currentAdvisory.weather}</Text>
              </View>
            </View>
            <View style={styles.nextAction}>
              <Text style={styles.nextActionText}>🎯 Next Action: {currentAdvisory.nextAction}</Text>
            </View>
          </View>
        </View>

        {/* Get Personalized Advice */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get AI-Powered Advice</Text>
          <Text style={styles.cardSubtitle}>Tell us about your current situation for personalized recommendations</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Wheat, Rice, Cotton"
              value={selectedCrop}
              onChangeText={setSelectedCrop}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Concerns</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Describe any issues you're facing with your crops..."
              multiline
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleGetPersonalizedAdvice}>
            <Text style={styles.buttonText}>Get Personalized Advice</Text>
          </TouchableOpacity>
        </View>

        {/* Advisory Categories */}
        <Text style={styles.sectionTitle}>Advisory Categories</Text>
        {advisoryCategories.map((category) => (
          <View key={category.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: category.color }]}>
                <category.icon width={20} height={20} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{category.title}</Text>
            </View>
            {category.recommendations.map((rec, idx) => (
              <View key={idx} style={styles.recommendation}>
                <View style={styles.bullet} />
                <Text style={styles.value}>{rec}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Quick Tips */}
        <View style={[styles.card, { backgroundColor: "#E0F2FE" }]}>
          <Text style={[styles.cardTitle, { color: "#0284C7" }]}>💡 Today's Quick Tips</Text>
          <View>
            <Text style={styles.tip}>• Check soil moisture levels before 8 AM</Text>
            <Text style={styles.tip}>• Apply organic mulch to retain soil moisture</Text>
            <Text style={styles.tip}>• Monitor for early signs of pest infestation</Text>
            <Text style={styles.tip}>• Ensure proper drainage in your fields</Text>
          </View>
        </View>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default CropAdvisory;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#F0FDF4" },
  header: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderColor: "#E5E7EB" },
  backButton: { marginRight: 12 },
  headerTitle: { flexDirection: "row", alignItems: "center" },
  iconWrapper: { width: 40, height: 40, borderRadius: 8, backgroundColor: "#10B981", alignItems: "center", justifyContent: "center", marginRight: 8 },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  headerSubtitle: { fontSize: 14, color: "#6B7280" },
  content: { padding: 16, paddingBottom: 32 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#10B981" },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  cardSubtitle: { fontSize: 14, color: "#6B7280", marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeHigh: { backgroundColor: "#EF4444" },
  badgeNormal: { backgroundColor: "#9CA3AF" },
  badgeText: { color: "#FFFFFF", fontSize: 12 },
  cardContent: { marginTop: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  infoBlock: { flex: 1 },
  iconRow: { flexDirection: "row", alignItems: "center" },
  label: { fontSize: 12, color: "#6B7280", marginLeft: 4 },
  value: { fontSize: 14, fontWeight: "600", color: "#111827" },
  nextAction: { backgroundColor: "#D1FAE5", padding: 8, borderRadius: 8 },
  nextActionText: { fontSize: 14, fontWeight: "500", color: "#10B981" },
  inputGroup: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, padding: 8 },
  button: { backgroundColor: "#10B981", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#111827" },
  recommendation: { flexDirection: "row", alignItems: "flex-start", marginBottom: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#10B981", marginTop: 6, marginRight: 8 },
  tip: { fontSize: 14, color: "#111827", marginBottom: 4 },
});

