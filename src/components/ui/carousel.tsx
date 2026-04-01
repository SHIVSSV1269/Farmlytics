import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel, { type ICarouselInstance } from "react-native-reanimated-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

type Props = {
  data: string[]; // ensure your data is typed
};

export default function RNCarousel({ data }: Props) {
  const carouselRef = useRef<ICarouselInstance | null>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={width * 0.8}
        height={200}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={600}
        renderItem={(props: { item: string; index: number }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{props.item}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.navButton, { left: 20 }]}
        onPress={() => carouselRef.current?.scrollTo({ count: -1, animated: true })}
      >
        <ArrowLeft size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, { right: 20 }]}
        onPress={() => carouselRef.current?.scrollTo({ count: 1, animated: true })}
      >
        <ArrowRight size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  item: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 12, backgroundColor: "#f3f4f6" },
  text: { fontSize: 20, fontWeight: "600" },
  navButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 999,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
