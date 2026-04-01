import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface TableProps {
  headers: string[];
  data: (string | number)[][];
  footer?: string[];
}

const Table: React.FC<TableProps> = ({ headers, data, footer }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            {headers.map((header, idx) => (
              <View key={idx} style={styles.cell}>
                <Text style={[styles.cellText, styles.headerText]}>{header}</Text>
              </View>
            ))}
          </View>

          {/* Table Body */}
          {data.map((rowData, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              {rowData.map((cellData, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <Text style={styles.cellText}>{cellData}</Text>
                </View>
              ))}
            </View>
          ))}

          {/* Table Footer */}
          {footer && (
            <View style={[styles.row, styles.footerRow]}>
              {footer.map((cell, idx) => (
                <View key={idx} style={styles.cell}>
                  <Text style={[styles.cellText, styles.footerText]}>{cell}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default function App() {
  const headers = ["Name", "Age", "City"];
  const data = [
    ["John Doe", 28, "New York"],
    ["Jane Smith", 34, "San Francisco"],
    ["Sam Green", 22, "Chicago"],
  ];
  const footer = ["Total", "", "3 people"];

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Table headers={headers} data={data} footer={footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    minHeight: 40,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
  },
  footerRow: {
    backgroundColor: "#e0e0e0",
  },
  evenRow: {
    backgroundColor: "#fafafa",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  cell: {
    padding: 8,
    minWidth: 100,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
  },
  headerText: {
    fontWeight: "bold",
  },
  footerText: {
    fontWeight: "600",
  },
});
