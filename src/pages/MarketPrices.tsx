import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const MarketPrices = () => {
  const navigation = useNavigation<any>();
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const cropPrices = [
    { name: "Wheat", currentPrice: 2500, previousPrice: 2400, change: 4.17, market: "Punjab Mandi", unit: "quintal", quality: "A Grade", trend: "up", volume: "1200 tons" },
    { name: "Rice (Basmati)", currentPrice: 4200, previousPrice: 4350, change: -3.45, market: "Haryana Mandi", unit: "quintal", quality: "Premium", trend: "down", volume: "800 tons" },
    { name: "Cotton", currentPrice: 6800, previousPrice: 6600, change: 3.03, market: "Gujarat Mandi", unit: "quintal", quality: "Medium", trend: "up", volume: "500 tons" },
    { name: "Sugarcane", currentPrice: 380, previousPrice: 375, change: 1.33, market: "UP Mandi", unit: "quintal", quality: "Standard", trend: "up", volume: "2000 tons" },
    { name: "Maize", currentPrice: 1850, previousPrice: 1920, change: -3.65, market: "MP Mandi", unit: "quintal", quality: "A Grade", trend: "down", volume: "900 tons" },
    { name: "Soybean", currentPrice: 4500, previousPrice: 4450, change: 1.12, market: "Maharashtra Mandi", unit: "quintal", quality: "Premium", trend: "up", volume: "600 tons" }
  ];

  const priceAlerts = [
    { crop: "Wheat", targetPrice: 2600, currentPrice: 2500, status: "below" },
    { crop: "Rice", targetPrice: 4000, currentPrice: 4200, status: "above" },
    { crop: "Cotton", targetPrice: 7000, currentPrice: 6800, status: "below" },
  ];

  const handleSetPriceAlert = (cropName: string) => {
    Alert.alert("Price Alert Set", `You'll be notified when ${cropName} reaches your target price`);
  };

  const filteredCrops = cropPrices.filter(
    crop =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedMarket === "all" || crop.market.includes(selectedMarket))
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Market Prices</Text>
          <Text style={styles.headerSubtitle}>Real-time crop prices</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#999" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search crops..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Crop Prices */}
      <Text style={styles.sectionTitle}>Live Prices</Text>
      {filteredCrops.map((crop, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cropIcon}>
              <Text style={{ fontWeight: "bold", color: "#4CAF50" }}>{crop.name[0]}</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropQuality}>{crop.quality}</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => handleSetPriceAlert(crop.name)}>
              <Feather name="star" size={20} color="#FFD700" />
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <View>
              <View style={styles.priceContainer}>
                <Feather name="dollar-sign" size={16} color="#4CAF50" />
                <Text style={styles.priceText}>{crop.currentPrice}</Text>
                <Text style={styles.unitText}>/{crop.unit}</Text>
              </View>
              <View style={styles.changeContainer}>
                <Feather name={crop.change > 0 ? "trending-up" : "trending-down"} size={16} color={crop.change > 0 ? "green" : "red"} />
                <Text style={[styles.changeText, { color: crop.change > 0 ? "green" : "red" }]}>
                  {crop.change > 0 ? "+" : ""}{crop.change}%
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.marketRow}>
                <Feather name="map-pin" size={14} color="#999" />
                <Text style={styles.marketText}>{crop.market}</Text>
              </View>
              <Text style={styles.volumeText}>Volume: {crop.volume}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Price Alerts */}
      <Text style={styles.sectionTitle}>Your Price Alerts</Text>
      {priceAlerts.map((alert, index) => (
        <View key={index} style={styles.alertCard}>
          <View>
            <Text style={styles.cropName}>{alert.crop}</Text>
            <Text style={styles.volumeText}>
              Target: {alert.targetPrice} | Current: {alert.currentPrice}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: alert.status === "above" ? "#F87171" : "#9CA3AF" }]}>
            <Text style={{ color: "#fff", fontSize: 12 }}>{alert.status === "above" ? "Above" : "Below"} target</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default MarketPrices;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  container: {
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#777",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cropIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  cropName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cropQuality: {
    fontSize: 12,
    color: "#777",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 4,
  },
  unitText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 2,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  marketRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  marketText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 2,
  },
  volumeText: {
    fontSize: 12,
    color: "#777",
  },
  alertCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
