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
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
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
                placeholderTextColor="#666666"
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
                  placeholderTextColor="#666666"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather name="globe" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Preferred Language"
                  placeholderTextColor="#666666"
                  value={formData.language}
                  onChangeText={(text) => setFormData({ ...formData, language: text })}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather name="maximize-2" size={16} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Farm Size (acres)"
                  placeholderTextColor="#666666"
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
                  placeholderTextColor="#666666"
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
            <Feather name="arrow-right-circle" size={18} color="#000" style={{ marginRight: 8 }} />
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
  safeArea: { flex: 1, backgroundColor: "#0E0E0E" },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#0E0E0E",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backText: { color: "#FFFFFF", fontWeight: "600", marginLeft: 6, fontSize: 15 },

  logoContainer: { alignItems: "center", marginBottom: 24 },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: { fontSize: 24, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.5 },

  card: {
    backgroundColor: "#000000",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    color: "#AAAAAA",
    fontSize: 13,
    lineHeight: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#121212",
  },
  inputIcon: { paddingLeft: 14, paddingRight: 6 },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 14,
    fontSize: 15,
    color: "#FFFFFF",
  },

  langLabel: { fontSize: 12, color: "#888888", marginBottom: 10, marginTop: 4, fontWeight: "500" },
  langChips: { flexDirection: "row", flexWrap: "wrap", marginBottom: 24, gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#1A1A1A",
  },
  chipSelected: { borderColor: "#FFFFFF", backgroundColor: "#FFFFFF" },
  chipText: { fontSize: 12, color: "#AAAAAA", fontWeight: "500" },
  chipTextSelected: { color: "#000000", fontWeight: "700" },

  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: { color: "#000000", fontWeight: "700", fontSize: 16 },

  switchWrapper: { marginTop: 24, alignItems: "center" },
  switchText: { color: "#888888", fontSize: 14 },
  switchLink: { color: "#FFFFFF", fontWeight: "700" },

  footerText: {
    marginTop: 20,
    fontSize: 11,
    color: "#555555",
    textAlign: "center",
    lineHeight: 16,
  },
});
