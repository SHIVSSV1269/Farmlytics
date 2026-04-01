import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import dayjs from "dayjs";

interface CalendarProps {
  onSelect?: (date: Date) => void;
  selected?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ onSelect, selected }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const weeks: (Date | null)[][] = [];
  let dayCount = 1 - startDay;
  while (dayCount <= daysInMonth) {
    const week: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      if (dayCount > 0 && dayCount <= daysInMonth) {
        week.push(currentMonth.date(dayCount).toDate());
      } else {
        week.push(null);
      }
      dayCount++;
    }
    weeks.push(week);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
          <ChevronLeft size={20} />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{currentMonth.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
          <ChevronRight size={20} />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      {/* Dates */}
      {weeks.map((week, wi) => (
        <View key={wi} style={styles.weekRow}>
          {week.map((date, di) => {
            const isSelected =
              date &&
              selected &&
              dayjs(date).isSame(selected, "day");
            return (
              <TouchableOpacity
                key={di}
                style={[
                  styles.day,
                  isSelected && styles.selectedDay,
                ]}
                disabled={!date}
                onPress={() => date && onSelect?.(date)}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                  {date ? dayjs(date).date() : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  monthLabel: { fontSize: 16, fontWeight: "600" },
  navBtn: { padding: 6 },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    color: "#6b7280",
  },
  day: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  dayText: { fontSize: 14, color: "#111827" },
  selectedDay: { backgroundColor: "#3b82f6" },
  selectedDayText: { color: "#fff", fontWeight: "600" },
});
