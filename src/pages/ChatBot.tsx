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
  const navigation = useNavigation<any>();
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
            <ActivityIndicator size="small" color="#2E7D32" />
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
            <Feather name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7F8" },
  flex: { flex: 1 },
  header: {
    backgroundColor: "#2E7D32",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backBtn: { padding: 4, marginRight: 12 },
  headerInfo: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50", marginRight: 6 },
  subtitle: { fontSize: 12, color: "#E8F5E9" },
  chatList: { padding: 16, paddingBottom: 32 },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2E7D32",
    borderBottomRightRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  botText: { color: "#333" },
  userText: { color: "#FFF" },
  messageImage: { width: 200, height: 150, borderRadius: 12, marginBottom: 8, backgroundColor: '#EEE' },
  timestamp: { fontSize: 10, color: "#999", marginTop: 4, alignSelf: "flex-end" },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typingText: { fontSize: 12, color: "#666", marginLeft: 8, fontStyle: "italic" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  iconBtn: { padding: 8, marginRight: 4 },
  input: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 15,
    color: "#333",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  disabledSend: { backgroundColor: "#A5D6A7" },
});

export default ChatBot;
