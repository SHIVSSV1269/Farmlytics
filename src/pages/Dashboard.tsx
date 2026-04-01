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
      route: "CropAdvisory",
      stats: "12 new tips",
    },
    {
      id: "pest-scanner",
      title: "Pest Scanner",
      description: "AI-powered pest & disease detection",
      icon: "camera",
      route: "PestScanner",
      stats: "95% accuracy",
    },
    {
      id: "weather",
      title: "Weather Updates",
      description: "Real-time weather alerts and forecasts",
      icon: "cloud",
      route: "Weather",
      stats: "Rain in 2 days",
    },
    {
      id: "market",
      title: "Market Prices",
      description: "Latest crop prices from local markets",
      icon: "trending-up",
      route: "MarketPrices",
      stats: "₹2,500/quintal",
    },
    {
      id: "chatbot",
      title: "AI Farm Assistant",
      description: "Disease Diagnosis & Help",
      icon: "message-circle",
      route: "ChatBot",
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
  safeArea: { flex: 1, backgroundColor: "#000000" },
  container: { flex: 1, backgroundColor: "#0E0E0E" },

  header: {
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  greeting: { fontSize: 20, fontWeight: "600", color: "#ffffff", letterSpacing: 0.5 },
  subGreeting: { fontSize: 13, color: "#888888", marginTop: 4, fontWeight: "500" },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  statsBar: {
    flexDirection: "row",
    backgroundColor: "#000000",
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { fontSize: 12, color: "#E0E0E0", fontWeight: "600", marginLeft: 4 },
  statDivider: { width: 1, height: 20, backgroundColor: "#2A2A2A" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#888888",
    marginTop: 28,
    marginBottom: 16,
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
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#1A1A1A",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fullWidthCard: {
    width: "100%",
  },
  cardIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { color: "#ffffff", fontWeight: "600", fontSize: 14, marginBottom: 6, letterSpacing: 0.3 },
  cardDescription: { color: "#888888", fontSize: 11, lineHeight: 16, marginBottom: 12, fontWeight: "500" },
  cardStatsBadge: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  cardStats: { color: "#E0E0E0", fontSize: 10, fontWeight: "600", letterSpacing: 0.5 },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#555555",
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 16,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Dashboard;
