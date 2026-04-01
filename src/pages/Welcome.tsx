
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import heroFarmingImg from "../assets/hero-farming.png";

const features = [
  {
    icon: "zap", // Using Feather icons as placeholders
    title: "Smart Crop Advisory",
    description: "Get personalized farming guidance based on your location and crop type",
  },
  {
    icon: "users",
    title: "Farmer Community",
    description: "Connect with fellow farmers and share experiences in your local language",
  },
  {
    icon: "shield",
    title: "AI-Powered Detection",
    description: "Identify pests and diseases instantly with our advanced AI technology",
  },
  {
    icon: "smartphone",
    title: "Offline Support",
    description: "Access essential farming advice even without internet connectivity",
  },
];

const Welcome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: heroFarmingImg }}
        style={styles.hero}
        imageStyle={{ opacity: 0.2 }}
      >
        <LinearGradient
          colors={["rgba(14,14,14,0.9)", "rgba(14,14,14,0.7)", "rgba(14,14,14,0.9)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Smart Crop Advisory</Text>
          <Text style={styles.heroSubtitle}>
            Empowering Indian farmers with AI-driven insights for better crop management and higher yields
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity style={[styles.button, styles.buttonHero]} onPress={() => navigation.navigate("Login")}>
              <Feather name="zap" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={[styles.buttonText, { color: "#000" }]}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonEarth]} onPress={() => navigation.navigate("Dashboard")}>
              <Text style={[styles.buttonText, { color: "#FFF" }]}>View Demo</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heroFooter}>Available in Hindi, English & Regional Languages</Text>
        </View>
      </ImageBackground>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revolutionizing Indian Agriculture</Text>
        <Text style={styles.sectionSubtitle}>
          Advanced technology meets traditional farming wisdom to help you make informed decisions
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Feather name={feature.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <LinearGradient colors={["#1A1A1A", "#000000"]} style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Farming?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of farmers already using Smart Crop Advisory to increase their yields and reduce costs
        </Text>
        <TouchableOpacity style={[styles.button, styles.buttonCTA]} onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.buttonText, { color: "#000" }]}>Start Your Journey</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E0E0E" },
  hero: { height: 500, justifyContent: "center", alignItems: "center" },
  heroContent: { alignItems: "center", paddingHorizontal: 16 },
  heroTitle: { fontSize: 36, fontWeight: "700", textAlign: "center", color: "#FFFFFF", letterSpacing: 1 },
  heroSubtitle: { fontSize: 16, textAlign: "center", color: "#AAAAAA", marginVertical: 16, maxWidth: 320, lineHeight: 24 },
  heroButtons: { flexDirection: "row", marginTop: 16, gap: 12 },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonHero: { backgroundColor: "#FFFFFF" },
  buttonEarth: { backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  buttonCTA: { backgroundColor: "#FFFFFF", marginTop: 20, paddingHorizontal: 24 },
  buttonText: { fontSize: 16, fontWeight: "600", color: "#000" },
  heroFooter: { fontSize: 12, color: "#666", marginTop: 24, textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 },

  section: { paddingHorizontal: 16, paddingVertical: 32 },
  sectionTitle: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 8, color: "#FFFFFF" },
  sectionSubtitle: { fontSize: 14, color: "#888888", textAlign: "center", marginBottom: 32, lineHeight: 22 },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featureCard: { backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 8, width: "48%", padding: 16, marginBottom: 16 },
  featureIcon: { backgroundColor: "#2A2A2A", width: 48, height: 48, borderRadius: 8, marginBottom: 12, justifyContent: "center", alignItems: "center" },
  featureTitle: { fontSize: 15, fontWeight: "600", color: "#FFFFFF", marginBottom: 6 },
  featureDesc: { fontSize: 12, color: "#888888", lineHeight: 18 },

  ctaSection: { paddingVertical: 40, alignItems: "center", borderTopWidth: 1, borderTopColor: "#1A1A1A" },
  ctaTitle: { fontSize: 24, fontWeight: "700", color: "#FFFFFF", textAlign: "center", marginBottom: 12 },
  ctaSubtitle: { fontSize: 14, color: "#AAAAAA", textAlign: "center", maxWidth: 320, lineHeight: 22 },
});

