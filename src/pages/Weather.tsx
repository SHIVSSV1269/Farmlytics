import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const Weather = () => {
  const navigation = useNavigation<any>();

  const currentWeather = {
    location: "Punjab, India",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    pressure: 1013,
    icon: "cloud"
  };

  const hourlyForecast = [
    { time: "12 PM", temp: 22, icon: "sun" },
    { time: "1 PM", temp: 24, icon: "cloud" },
    { time: "2 PM", temp: 26, icon: "cloud" },
    { time: "3 PM", temp: 25, icon: "cloud-rain" },
    { time: "4 PM", temp: 23, icon: "cloud-rain" },
    { time: "5 PM", temp: 21, icon: "cloud-rain" },
  ];

  const weeklyForecast = [
    { day: "Today", high: 26, low: 18, condition: "Partly Cloudy", icon: "cloud", rain: 20 },
    { day: "Tomorrow", high: 24, low: 16, condition: "Heavy Rain", icon: "cloud-rain", rain: 85 },
    { day: "Thursday", high: 22, low: 15, condition: "Rainy", icon: "cloud-rain", rain: 70 },
    { day: "Friday", high: 25, low: 17, condition: "Sunny", icon: "sun", rain: 5 },
  ];

  const alerts = [
    { type: "warning", title: "Heavy Rain Alert", message: "Heavy rainfall expected in next 48 hours. Take precautions for your crops.", time: "Active until Thursday", icon: "alert-triangle" },
    { type: "info", title: "Optimal Irrigation Time", message: "Weather conditions are ideal for irrigation tomorrow morning.", time: "Tomorrow 6-8 AM", icon: "droplets" },
  ];

  const farmingAdvice = [
    { title: "Irrigation Timing", advice: "Avoid watering for next 2 days due to expected rainfall", icon: "droplets", priority: "high" },
    { title: "Pest Protection", advice: "High humidity may increase pest activity. Monitor closely", icon: "eye", priority: "medium" },
    { title: "Harvest Planning", advice: "Consider harvesting mature crops before Thursday's rain", icon: "calendar", priority: "high" },
  ];

  const getIconName = (name: string) => name; // map string to Feather icon

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Updates</Text>
      </View>

      {/* Current Weather */}
      <View style={styles.card}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCenter}>
            <Feather name="map-pin" size={16} color="#777" />
            <Text style={styles.subText}>{currentWeather.location}</Text>
          </View>
          <Text style={styles.subText}>Updated 10 min ago</Text>
        </View>

        <View style={styles.rowSpaceBetween}>
          <View>
            <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
            <Text style={styles.subText}>{currentWeather.condition}</Text>
          </View>
          <Feather name={getIconName(currentWeather.icon)} size={48} color="#007BFF" />
        </View>

        <View style={styles.grid2}>
          <View style={styles.rowCenter}>
            <Feather name="droplets" size={16} color="#2196F3" />
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.subText}>Humidity</Text>
              <Text style={styles.boldText}>{currentWeather.humidity}%</Text>
            </View>
          </View>
          <View style={styles.rowCenter}>
            <Feather name="wind" size={16} color="#777" />
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.subText}>Wind</Text>
              <Text style={styles.boldText}>{currentWeather.windSpeed} km/h</Text>
            </View>
          </View>
          <View style={styles.rowCenter}>
            <Feather name="eye" size={16} color="#9C27B0" />
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.subText}>Visibility</Text>
              <Text style={styles.boldText}>{currentWeather.visibility} km</Text>
            </View>
          </View>
          <View style={styles.rowCenter}>
            <Feather name="navigation" size={16} color="#FF9800" />
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.subText}>Pressure</Text>
              <Text style={styles.boldText}>{currentWeather.pressure} mb</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Alerts */}
      <Text style={styles.sectionTitle}>Weather Alerts</Text>
      {alerts.map((alert, i) => (
        <View key={i} style={[styles.card, { borderLeftWidth: 4, borderLeftColor: alert.type === "warning" ? "#FF9800" : "#2196F3" }]}>
          <View style={styles.rowStart}>
            <Feather name={getIconName(alert.icon)} size={20} color={alert.type === "warning" ? "#FF9800" : "#2196F3"} />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={styles.boldText}>{alert.title}</Text>
              <Text style={styles.subText}>{alert.message}</Text>
              <Text style={[styles.subText, { fontSize: 12, marginTop: 2 }]}>{alert.time}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Hourly Forecast */}
      <Text style={styles.sectionTitle}>Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyForecast.map((hour, i) => (
          <View key={i} style={[styles.card, { minWidth: 80, alignItems: "center", marginRight: 8 }]}>
            <Text style={styles.subText}>{hour.time}</Text>
            <Feather name={getIconName(hour.icon)} size={24} color="#007BFF" />
            <Text style={styles.boldText}>{hour.temp}°</Text>
          </View>
        ))}
      </ScrollView>

      {/* 7-Day Forecast */}
      <Text style={styles.sectionTitle}>7-Day Forecast</Text>
      {weeklyForecast.map((day, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.rowSpaceBetween}>
            <View style={styles.rowStart}>
              <Feather name={getIconName(day.icon)} size={24} color="#007BFF" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.boldText}>{day.day}</Text>
                <Text style={styles.subText}>{day.condition}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              {day.rain > 0 && (
                <View style={styles.rowCenter}>
                  <Feather name="droplets" size={16} color="#2196F3" />
                  <Text style={[styles.subText, { marginLeft: 2 }]}>{day.rain}%</Text>
                </View>
              )}
              <Text style={styles.boldText}>{day.high}°</Text>
              <Text style={styles.subText}>{day.low}°</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Farming Advice */}
      <Text style={styles.sectionTitle}>Farming Advice</Text>
      {farmingAdvice.map((advice, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.rowStart}>
            <Feather name={getIconName(advice.icon)} size={20} color="#007BFF" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.boldText}>{advice.title}</Text>
                <Text style={[styles.subText, { color: advice.priority === "high" ? "#F44336" : "#777" }]}>{advice.priority}</Text>
              </View>
              <Text style={styles.subText}>{advice.advice}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E0F2F1" },
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 12, color: "#333" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 },
  rowSpaceBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowStart: { flexDirection: "row", alignItems: "flex-start" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  grid2: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 8 },
  subText: { fontSize: 12, color: "#777" },
  boldText: { fontWeight: "bold", color: "#333" },
  temperature: { fontSize: 36, fontWeight: "bold", color: "#333" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
});
