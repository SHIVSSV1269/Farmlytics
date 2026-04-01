import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import heroFarmingImg from "../assets/hero-farming.png";

const features = [
  {
    icon: "zap",
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
          colors={["rgba(255,255,255,0.8)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.8)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Smart Crop Advisory</Text>
          <Text style={styles.heroSubtitle}>
            Empowering Indian farmers with AI-driven insights for better crop management and higher yields
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity style={[styles.button, styles.buttonHero]} onPress={() => navigation.navigate("Login")}>
              <Feather name="zap" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonEarth]} onPress={() => navigation.navigate("Dashboard")}>
              <Text style={[styles.buttonText, { color: "#333" }]}>View Demo</Text>
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
      <LinearGradient colors={["#34D399", "#10B981"]} style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Farming?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of farmers already using Smart Crop Advisory to increase their yields and reduce costs
        </Text>
        <TouchableOpacity style={[styles.button, styles.buttonCTA]} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  hero: { height: 500, justifyContent: "center", alignItems: "center" },
  heroContent: { alignItems: "center", paddingHorizontal: 16 },
  heroTitle: { fontSize: 36, fontWeight: "bold", textAlign: "center", color: "#059669" },
  heroSubtitle: { fontSize: 16, textAlign: "center", color: "#555", marginVertical: 16, maxWidth: 300 },
  heroButtons: { flexDirection: "row", marginTop: 16, gap: 12 },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  buttonHero: { backgroundColor: "#059669" },
  buttonEarth: { backgroundColor: "#D1FAE5" },
  buttonCTA: { backgroundColor: "#064E3B", marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  heroFooter: { fontSize: 12, color: "#777", marginTop: 16, textAlign: "center" },

  section: { paddingHorizontal: 16, paddingVertical: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 24 },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featureCard: { backgroundColor: "#059669", borderRadius: 12, width: "48%", padding: 16, marginBottom: 16 },
  featureIcon: { backgroundColor: "#10B981", padding: 12, borderRadius: 50, marginBottom: 8, alignItems: "center" },
  featureTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  featureDesc: { fontSize: 12, color: "#E0F2F1" },

  ctaSection: { paddingVertical: 32, alignItems: "center" },
  ctaTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 12 },
  ctaSubtitle: { fontSize: 14, color: "#D1FAE5", textAlign: "center", maxWidth: 300 },
});
