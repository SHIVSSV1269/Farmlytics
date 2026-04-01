import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { ChevronRight, MoreHorizontal } from "lucide-react-native";

type BreadcrumbProps = {
  children: React.ReactNode;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return <View style={styles.breadcrumb}>{children}</View>;
};

export const BreadcrumbList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.list}>{children}</View>;
};

export const BreadcrumbItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.item}>{children}</View>;
};

type BreadcrumbLinkProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{label}</Text>
    </TouchableOpacity>
  );
};

export const BreadcrumbPage: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Text style={styles.page} accessibilityRole="text" accessibilityState={{ disabled: true }}>
      {label}
    </Text>
  );
};

export const BreadcrumbSeparator: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <View style={styles.separator}>{children ?? <ChevronRight size={16} color="#555" />}</View>;
};

export const BreadcrumbEllipsis: React.FC = () => {
  return (
    <View style={styles.ellipsis}>
      <MoreHorizontal size={18} color="#555" />
    </View>
  );
};

// ================= Styles =================
const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "#007bff",
    fontSize: 14,
  },
  page: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    marginHorizontal: 4,
  },
  ellipsis: {
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
