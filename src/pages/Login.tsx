import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const Login = () => {
  const navigation = useNavigation<any>();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    language: "",
    farmSize: "",
    mainCrop: "",
  });

  const languages = [
    "हिंदी (Hindi)",
    "English",
    "मराठी (Marathi)",
    "ગુજરાતી (Gujarati)",
    "ਪੰਜਾਬੀ (Punjabi)",
    "বাংলা (Bengali)",
    "தமிழ் (Tamil)",
    "తెలుగు (Telugu)",
  ];

  const handleSubmit = () => {
    if (isLogin) {
      if (!formData.phone) {
        Alert.alert("Phone number required", "Please enter your phone number to continue.");
        return;
      }
    } else {
      if (!formData.name || !formData.phone || !formData.location || !formData.language) {
        Alert.alert("All fields required", "Please fill in all required fields to create your account.");
        return;
      }
    }

    Alert.alert(
      isLogin ? "Login Successful! 🎉" : "Registration Successful! 🎉",
      `Welcome${formData.name ? ", " + formData.name : " farmer"}! Taking you to your dashboard...`
    );

    // Reset the navigation stack so users cannot go back to Login after entering
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        })
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Back to Welcome */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#059669" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Feather name="zap" size={28} color="#fff" />
          </View>
          <Text style={styles.appName}>Farmlytics</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>
            {isLogin ? "Welcome Back, Farmer! 🌾" : "Join Farmlytics"}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? "Login to access your personalized farming dashboard"
              : "Create your account and start your smart farming journey"}
          </Text>

          {/* Name (Register only) */}
          {!isLogin && (
            <View style={styles.inputWrapper}>
              <Feather name="user" size={16} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>
          )}

          {/* Phone */}
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={16} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>

          {/* Register only fields */}
          {!isLogin && (
            <>
              <View style={styles.inputWrapper}>
                <Feather name="map-pin" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Location (Village, District, State)"
                  placeholderTextColor="#9ca3af"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather name="globe" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Preferred Language"
                  placeholderTextColor="#9ca3af"
                  value={formData.language}
                  onChangeText={(text) => setFormData({ ...formData, language: text })}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather name="maximize-2" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Farm Size (acres)"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={formData.farmSize}
                  onChangeText={(text) => setFormData({ ...formData, farmSize: text })}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather name="feather" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Main Crop (e.g. Wheat, Rice)"
                  placeholderTextColor="#9ca3af"
                  value={formData.mainCrop}
                  onChangeText={(text) => setFormData({ ...formData, mainCrop: text })}
                />
              </View>

              {/* Language chips */}
              <Text style={styles.langLabel}>Quick select language:</Text>
              <View style={styles.langChips}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={[
                      styles.chip,
                      formData.language === lang && styles.chipSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, language: lang })}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        formData.language === lang && styles.chipTextSelected,
                      ]}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.85}>
            <Feather name="arrow-right-circle" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>{isLogin ? "Login" : "Create Account"}</Text>
          </TouchableOpacity>

          {/* Toggle */}
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchWrapper}>
            <Text style={styles.switchText}>
              {isLogin ? "New to Farmlytics? " : "Already have an account? "}
              <Text style={styles.switchLink}>
                {isLogin ? "Create Account" : "Login"}
              </Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0fdf4" },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0fdf4",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: { color: "#059669", fontWeight: "600", marginLeft: 4, fontSize: 15 },

  logoContainer: { alignItems: "center", marginBottom: 20 },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 4,
    shadowColor: "#059669",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  appName: { fontSize: 22, fontWeight: "bold", color: "#059669" },

  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 18,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  inputIcon: { paddingLeft: 12, paddingRight: 4 },
  input: {
    flex: 1,
    paddingVertical: 11,
    paddingRight: 12,
    fontSize: 14,
    color: "#111827",
  },

  langLabel: { fontSize: 12, color: "#6b7280", marginBottom: 8, marginTop: 2 },
  langChips: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16, gap: 6 },
  chip: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#f9fafb",
  },
  chipSelected: { borderColor: "#059669", backgroundColor: "#d1fae5" },
  chipText: { fontSize: 11, color: "#6b7280" },
  chipTextSelected: { color: "#059669", fontWeight: "600" },

  button: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 2,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  switchWrapper: { marginTop: 16, alignItems: "center" },
  switchText: { color: "#6b7280", fontSize: 13 },
  switchLink: { color: "#059669", fontWeight: "bold" },

  footerText: {
    marginTop: 14,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
  },
});
