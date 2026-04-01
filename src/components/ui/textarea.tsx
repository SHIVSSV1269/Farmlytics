import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* Tabs List */}
      <View style={styles.tabsList}>
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIndex;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabTrigger, isActive && styles.tabTriggerActive]}
              onPress={() => setActiveIndex(idx)}
            >
              <Text style={[styles.tabTriggerText, isActive && styles.tabTriggerTextActive]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {tabs[activeIndex].content}
      </View>
    </View>
  );
};

export default function App() {
  const tabs = [
    {
      key: "tab1",
      title: "Tab One",
      content: <Text>This is content for Tab One</Text>,
    },
    {
      key: "tab2",
      title: "Tab Two",
      content: <Text>This is content for Tab Two</Text>,
    },
    {
      key: "tab3",
      title: "Tab Three",
      content: <Text>This is content for Tab Three</Text>,
    },
  ];

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Tabs tabs={tabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  tabsList: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 4,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  tabTriggerActive: {
    backgroundColor: "#007bff",
  },
  tabTriggerText: {
    color: "#666",
    fontWeight: "600",
  },
  tabTriggerTextActive: {
    color: "#fff",
  },
  tabContent: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    minHeight: 100,
  },
});
