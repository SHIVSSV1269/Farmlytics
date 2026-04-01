import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Dashboard = () => {
  const navigation = useNavigation<any>();

  const dashboardCards = [
    {
      id: "advisory",
      title: "Crop Advisory",
      description: "Get personalized farming recommendations",
      icon: "activity",
      color: "#4f46e5",
      route: "CropAdvisory",
      stats: "12 new tips",
    },
    {
      id: "pest-scanner",
      title: "Pest Scanner",
      description: "AI-powered pest & disease detection",
      icon: "camera",
      color: "#10b981",
      route: "PestScanner",
      stats: "95% accuracy",
    },
    {
      id: "weather",
      title: "Weather Updates",
      description: "Real-time weather alerts and forecasts",
      icon: "cloud",
      color: "#f97316",
      route: "Weather",
      stats: "Rain in 2 days",
    },
    {
      id: "market",
      title: "Market Prices",
      description: "Latest crop prices from local markets",
      icon: "trending-up",
      color: "#22c55e",
      route: "MarketPrices",
      stats: "₹2,500/quintal",
    },
    {
      id: "chatbot",
      title: "AI Farm Assistant",
      description: "Disease Diagnosis & Help",
      icon: "message-circle",
      route: "ChatBot",
      color: "#FF9800",
      stats: "24/7 Support",
      isFullWidth: true,
    },
  ];

  const handleCardClick = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back! 👋</Text>
            <Text style={styles.subGreeting}>What would you like to do today?</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Icon name="user" size={22} color="#fff" />
          </View>
        </View>

        {/* Quick stats bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Icon name="sun" size={16} color="#f97316" />
            <Text style={styles.statText}>22°C</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="droplet" size={16} color="#3b82f6" />
            <Text style={styles.statText}>68% Humidity</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="map-pin" size={16} color="#10b981" />
            <Text style={styles.statText}>Punjab</Text>
          </View>
        </View>

        {/* Section title */}
        <Text style={styles.sectionTitle}>Main Features</Text>

        {/* Feature Cards */}
        <View style={styles.cardGrid}>
          {dashboardCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card, 
                { backgroundColor: card.color },
                card.isFullWidth && styles.fullWidthCard
              ]}
              onPress={() => handleCardClick(card.route)}
              activeOpacity={0.85}
            >
              <View style={styles.cardIconWrapper}>
                <Icon name={card.icon} size={28} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
              <View style={styles.cardStatsBadge}>
                <Text style={styles.cardStats}>{card.stats}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer note */}
        <Text style={styles.footer}>All data is updated in real-time from trusted sources.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#059669" },
  container: { flex: 1, backgroundColor: "#f0fdf4" },

  header: {
    backgroundColor: "#059669",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subGreeting: { fontSize: 13, color: "#d1fae5", marginTop: 2 },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  statsBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: 12, color: "#374151", fontWeight: "600", marginLeft: 4 },
  statDivider: { width: 1, height: 20, backgroundColor: "#e5e7eb" },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 16,
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  card: {
    width: (width - 48) / 2,
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  fullWidthCard: { width: "100%" },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  cardDescription: { color: "rgba(255,255,255,0.85)", fontSize: 11, lineHeight: 16, marginBottom: 10 },
  cardStatsBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  cardStats: { color: "#fff", fontSize: 10, fontWeight: "600" },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 24,
    marginTop: 4,
    paddingHorizontal: 16,
  },
});

export default Dashboard;
