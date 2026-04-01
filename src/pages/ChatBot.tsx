import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { askGemini } from "../services/geminiApi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  image?: string;
  loading?: boolean;
}

const ChatBot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Farmlytics AI Assistant. 🌿\n\nHow can I help you today? You can ask about irrigation, pests, or upload a photo of your plant for disease diagnosis.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string, imageUri?: string, base64Image?: string) => {
    if (!text.trim() && !imageUri) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
      image: imageUri,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    Keyboard.dismiss();

    // Prepare prompt
    let prompt = text;
    if (imageUri) {
      prompt = text || "Please analyze this plant image. Identify the plant and diagnose any visible diseases or nutrient deficiencies. Suggest treatments if any issue is found.";
    }

    const response = await askGemini(prompt, base64Image);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: "bot",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleImagePicker = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        handleSend("", asset.uri, asset.base64);
      }
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isBot = item.sender === "bot";
    return (
      <View style={[styles.messageContainer, isBot ? styles.botMessage : styles.userMessage]}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.messageImage} />
        )}
        {item.text ? (
          <Text style={[styles.messageText, isBot ? styles.botText : styles.userText]}>
            {item.text}
          </Text>
        ) : null}
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>AI Farm Assistant</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.subtitle}>Online · Expert Advice</Text>
            </View>
          </View>
        </View>

        {/* Chat List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={scrollToBottom}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#888" />
            <Text style={styles.typingText}>AI is analyzing...</Text>
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.iconBtn}>
            <Feather name="camera" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask about crops or pests..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            onPress={() => handleSend(inputText)} 
            style={[styles.sendBtn, !inputText.trim() && styles.disabledSend]}
            disabled={!inputText.trim()}
          >
            <Feather name="send" size={20} color={inputText.trim() ? "#000" : "#666"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E0E0E" },
  flex: { flex: 1 },
  header: {
    backgroundColor: "#000000",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  backBtn: { padding: 4, marginRight: 12 },
  headerInfo: { flex: 1 },
  title: { fontSize: 18, fontWeight: "600", color: "#FFFFFF", letterSpacing: 0.5 },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#00FF66", marginRight: 8 },
  subtitle: { fontSize: 12, color: "#888888", fontWeight: "500" },
  chatList: { padding: 16, paddingBottom: 32 },
  messageContainer: {
    maxWidth: "85%",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderBottomLeftRadius: 2,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2B2B2B",
    borderBottomRightRadius: 2,
  },
  messageText: { fontSize: 15, lineHeight: 24 },
  botText: { color: "#E0E0E0" },
  userText: { color: "#FFFFFF" },
  messageImage: { width: 220, height: 160, borderRadius: 6, marginBottom: 10, backgroundColor: '#000' },
  timestamp: { fontSize: 10, color: "#555", marginTop: 8, alignSelf: "flex-end", fontWeight: "600" },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  typingText: { fontSize: 12, color: "#666", marginLeft: 10, fontStyle: "italic", fontWeight: "500" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  iconBtn: { padding: 8, marginRight: 8 },
  input: {
    flex: 1,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    fontSize: 15,
    color: "#FFFFFF",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  disabledSend: { backgroundColor: "#1A1A1A" },
});

export default ChatBot;
