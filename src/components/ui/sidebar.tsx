import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIDEBAR_STORAGE_KEY = "@sidebar_state";
const SCREEN_WIDTH = Dimensions.get("window").width;

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openMobile: boolean;
  setOpenMobile: (val: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

  // Load sidebar state from AsyncStorage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored !== null) setIsOpen(stored === "true");
    })();
  }, []);

  // Save state
  useEffect(() => {
    AsyncStorage.setItem(SIDEBAR_STORAGE_KEY, isOpen ? "true" : "false");
  }, [isOpen]);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, openMobile, setOpenMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

// ---------------- Sidebar ----------------
export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useSidebar();
  const widthAnim = useRef(new Animated.Value(isOpen ? 250 : 60)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isOpen ? 250 : 60,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[styles.sidebar, { width: widthAnim }]}>
      <ScrollView>{children}</ScrollView>
    </Animated.View>
  );
};

// ---------------- Sidebar Trigger ----------------
export const SidebarTrigger: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity onPress={toggleSidebar} style={styles.trigger}>
      <Text style={{ fontSize: 18 }}>≡</Text>
    </TouchableOpacity>
  );
};

// ---------------- Sidebar Menu ----------------
export const SidebarMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.menu}>{children}</View>;
};

export const SidebarMenuItem: React.FC<{ label: string; onPress?: () => void }> = ({
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
};

// ---------------- Mobile Sheet ----------------
export const SidebarMobileSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openMobile, setOpenMobile } = useSidebar();
  return (
    <Modal visible={openMobile} animationType="slide" transparent={true}>
      <View style={styles.sheetOverlay}>
        <View style={styles.sheetContent}>
          <ScrollView>{children}</ScrollView>
          <TouchableOpacity onPress={() => setOpenMobile(false)} style={styles.closeButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#1F2937",
    height: "100%",
    paddingTop: 20,
  },
  trigger: {
    padding: 10,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: "#F9FAFB",
    fontSize: 16,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start",
  },
  sheetContent: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "#111827",
    padding: 16,
    height: "100%",
  },
  closeButton: {
    padding: 12,
    backgroundColor: "#DC2626",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 6,
  },
});
