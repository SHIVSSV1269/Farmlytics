import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react-native";

export default function Pagination() {
  return (
    <View style={styles.container}>
      {/* Previous */}
      <Pressable style={styles.button}>
        <ChevronLeft size={18} />
        <Text style={styles.text}>Previous</Text>
      </Pressable>

      {/* Page numbers */}
      <View style={styles.pages}>
        <Pressable style={[styles.pageButton, styles.active]}>
          <Text style={styles.pageText}>1</Text>
        </Pressable>
        <Pressable style={styles.pageButton}>
          <Text style={styles.pageText}>2</Text>
        </Pressable>
        <Pressable style={styles.pageButton}>
          <Text style={styles.pageText}>3</Text>
        </Pressable>
        <MoreHorizontal size={18} />
        <Pressable style={styles.pageButton}>
          <Text style={styles.pageText}>10</Text>
        </Pressable>
      </View>

      {/* Next */}
      <Pressable style={styles.button}>
        <Text style={styles.text}>Next</Text>
        <ChevronRight size={18} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  pages: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 3,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  active: {
    backgroundColor: "#007bff",
  },
  pageText: {
    color: "black",
    fontSize: 14,
  },
});
