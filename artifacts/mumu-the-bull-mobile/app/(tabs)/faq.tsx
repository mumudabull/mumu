import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  {
    question: "How do I claim my new $MUMU tokens?",
    answer:
      "Go to migrate.fun/project/mig139 — connect the wallet you used to deposit your old $MUMU tokens, and claim your new $MUMU 1:1. THIS IS THE ONLY LINK. Please stay safe from all other scam links and unsolicited messages.",
  },
  {
    question: "How long do I have to claim or migrate?",
    answer:
      "The claim period is open for 90 days, lasting until approximately June 8th, 2026. We recommend claiming as soon as possible to ensure you receive your new tokens promptly.",
  },
  {
    question: "What if I missed the deposit window?",
    answer:
      "If you missed the initial deposit window (Feb 24 – Mar 10), you can still migrate during the 90-day claim period, but a 5% penalty will apply to your token conversion.",
  },
  {
    question: "Why did $MUMU migrate?",
    answer:
      "The migration was necessary to implement creator fees for ongoing revenue, rebalance the Liquidity Pool for better price discovery, and ensure proper supply management through token burns.",
  },
  {
    question: "What happens to unclaimed tokens after 90 days?",
    answer:
      "Once the 90-day claim period ends, all unclaimed tokens and leftover SOL will be moved to the project treasury to support future development and community initiatives.",
  },
  {
    question: "Is there a token burn involved?",
    answer:
      "Yes, approximately 450M excess tokens will be burned after the 90-day claim period to match the original circulating supply and prevent any dilution.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_DATA[0]; isOpen: boolean; onToggle: () => void }) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.faqItem,
        {
          backgroundColor: isOpen ? colors.card : "#0e0e0e",
          borderColor: isOpen ? colors.primary + "44" : colors.border,
        },
      ]}
    >
      <Pressable
        style={styles.faqQuestion}
        onPress={onToggle}
        testID={`faq-item-${item.question.slice(0, 10)}`}
      >
        <Text style={[styles.faqQuestionText, { color: colors.foreground }]}>{item.question}</Text>
        <View
          style={[
            styles.chevronWrapper,
            { backgroundColor: isOpen ? colors.primary + "22" : colors.muted },
          ]}
        >
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color={isOpen ? colors.primary : colors.mutedForeground}
          />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.faqAnswer}>
          <Text style={[styles.faqAnswerText, { color: colors.mutedForeground }]}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
}

export default function FAQScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Platform.OS === "web" ? 67 : insets.top + 16,
          paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>FAQ</Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          Common questions about the $MUMU migration and token.
        </Text>
      </View>

      <View style={styles.faqList}>
        {FAQ_DATA.map((item, idx) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
          />
        ))}
      </View>

      {/* Bottom Note */}
      <View style={[styles.noteCard, { backgroundColor: colors.secondary + "55", borderColor: colors.border }]}>
        <Ionicons name="information-circle-outline" size={18} color={colors.accent} />
        <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
          Still have questions? Reach out at{" "}
          <Text style={{ color: colors.primary }}>hello@mumu.ing</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: { paddingTop: 20, paddingBottom: 28 },
  headerTitle: {
    fontSize: 36,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  headerSub: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  faqList: { gap: 10, marginBottom: 24 },
  faqItem: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    gap: 12,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
  },
  chevronWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  faqAnswer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
});
