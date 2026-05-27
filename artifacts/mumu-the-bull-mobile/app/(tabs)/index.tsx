import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Animated,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const METRICS = [
  {
    label: "Tokens Migrated",
    value: "84.2%",
    sub: "+2.1% this week",
    icon: "flash" as const,
    color: "#15bf55",
  },
  {
    label: "Active Migrators",
    value: "12,402",
    sub: "Wallets connected",
    icon: "people" as const,
    color: "#c15300",
  },
  {
    label: "Total Value Locked",
    value: "$42.8M",
    sub: "Market value",
    icon: "bar-chart" as const,
    color: "#3e683d",
  },
];

const SOCIAL_LINKS = [
  { label: "X / Twitter", icon: "logo-twitter", url: "https://twitter.com/mumusol" },
  { label: "Telegram", icon: "paper-plane", url: "https://t.me/mumusol" },
  { label: "DEXScreener", icon: "trending-up", url: "https://dexscreener.com" },
];

const CONTRACT = "7aBJkHqB...mUMU (tap to copy)";
const CONTRACT_FULL = "7aBJkHqBVnFdnRgDhVe8K3ZYT5VmUMU1234567890";

function MetricCard({ metric }: { metric: typeof METRICS[0] }) {
  const colors = useColors();
  return (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.metricIcon, { backgroundColor: metric.color + "22" }]}>
        <Ionicons name={metric.icon as any} size={20} color={metric.color} />
      </View>
      <Text style={[styles.metricValue, { color: colors.foreground }]}>{metric.value}</Text>
      <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{metric.label}</Text>
      <Text style={[styles.metricSub, { color: metric.color }]}>{metric.sub}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const handleCopyContract = () => {
    if (Platform.OS !== "web") {
      import("expo-clipboard").then(({ setStringAsync }) => {
        setStringAsync(CONTRACT_FULL);
      });
    }
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
      {/* Hero */}
      <View style={styles.hero}>
        <View style={[styles.heroBadge, { backgroundColor: colors.accent + "22", borderColor: colors.accent + "44" }]}>
          <View style={styles.liveDot} />
          <Text style={[styles.heroBadgeText, { color: colors.accent }]}>Live on Solana</Text>
        </View>
        <Text style={[styles.heroTitle, { color: colors.foreground }]}>
          MUMU{"\n"}
          <Text style={{ color: colors.primary }}>The Bull</Text>
        </Text>
        <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
          The official bull market movement of Solana. Migrate your $MUMU tokens and join the herd.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.ctaRow}>
          <Pressable
            style={({ pressed }) => [
              styles.ctaPrimary,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={() => Linking.openURL("https://migrate.fun/project/mig139")}
            testID="migrate-button"
          >
            <Text style={[styles.ctaPrimaryText, { color: colors.primaryForeground }]}>
              Migrate Now
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primaryForeground} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.ctaSecondary,
              { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => Linking.openURL("https://dexscreener.com")}
          >
            <Ionicons name="trending-up" size={16} color={colors.foreground} />
            <Text style={[styles.ctaSecondaryText, { color: colors.foreground }]}>Trade</Text>
          </Pressable>
        </View>
      </View>

      {/* Live Metrics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Live Migration Stats</Text>
          <View style={[styles.livePill, { backgroundColor: colors.accent + "22", borderColor: colors.accent + "33" }]}>
            <View style={styles.liveDotSmall} />
            <Text style={[styles.livePillText, { color: colors.accent }]}>Live</Text>
          </View>
        </View>
        <View style={styles.metricsGrid}>
          {METRICS.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </View>
      </View>

      {/* Contract Address */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Contract Address</Text>
        <Pressable
          style={({ pressed }) => [
            styles.contractBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
          onPress={handleCopyContract}
          testID="contract-copy"
        >
          <Text style={[styles.contractText, { color: colors.mutedForeground }]} numberOfLines={1}>
            {CONTRACT}
          </Text>
          <Ionicons name="copy-outline" size={18} color={colors.mutedForeground} />
        </Pressable>
        <Text style={[styles.contractWarning, { color: colors.primary }]}>
          Only migrate via the official link. Stay safe from scams.
        </Text>
      </View>

      {/* Social Links */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Community</Text>
        <View style={[styles.socialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {SOCIAL_LINKS.map((link, i) => (
            <Pressable
              key={link.label}
              style={({ pressed }) => [
                styles.socialRow,
                i < SOCIAL_LINKS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => Linking.openURL(link.url)}
            >
              <View style={styles.socialLeft}>
                <Ionicons name={link.icon as any} size={20} color={colors.primary} />
                <Text style={[styles.socialLabel, { color: colors.foreground }]}>{link.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  hero: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 16,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#15bf55",
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
    lineHeight: 58,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: "row",
    gap: 12,
  },
  ctaPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 6,
  },
  ctaPrimaryText: {
    fontSize: 15,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
  },
  ctaSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  ctaSecondaryText: {
    fontSize: 15,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
  },
  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#15bf55",
  },
  livePillText: {
    fontSize: 11,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  metricCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
  },
  metricLabel: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metricSub: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  contractBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  contractText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginRight: 8,
  },
  contractWarning: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  socialCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  socialLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  socialLabel: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
