import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const MIGRATION_STEPS = [
  {
    number: "01",
    title: "Visit the Migration Portal",
    desc: "Go to migrate.fun/project/mig139 — this is the ONLY official link.",
    status: "done",
  },
  {
    number: "02",
    title: "Connect Your Wallet",
    desc: "Connect the wallet that holds your old $MUMU tokens.",
    status: "done",
  },
  {
    number: "03",
    title: "Claim 1:1",
    desc: "Claim your new $MUMU tokens at a 1:1 ratio (5% penalty if past deposit window).",
    status: "active",
  },
  {
    number: "04",
    title: "Claim Period Ends",
    desc: "The 90-day claim window closes ~June 8, 2026. Unclaimed tokens go to treasury.",
    status: "upcoming",
  },
];

const WHY_ITEMS = [
  {
    icon: "cash-outline" as const,
    title: "Creator Fees",
    desc: "Enable ongoing revenue via creator fees for sustainable project development.",
  },
  {
    icon: "water-outline" as const,
    title: "LP Rebalance",
    desc: "Rebalance the Liquidity Pool for better price discovery and stability.",
  },
  {
    icon: "flame-outline" as const,
    title: "Token Burn",
    desc: "~450M excess tokens burned to match original circulating supply — no dilution.",
  },
];

const SECURITY_WARNINGS = [
  "Only use migrate.fun/project/mig139 — the ONLY official migration link.",
  "No team member will ever DM you asking for your seed phrase or private key.",
  "Ignore links from unofficial Telegram groups or Twitter DMs.",
  "Always verify the URL in your browser before connecting your wallet.",
];

export default function MigrationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          $MUMU Migration
        </Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          Migrate your old tokens to the new contract. The claim window closes June 8, 2026.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.migrateBtn,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => Linking.openURL("https://migrate.fun/project/mig139")}
          testID="migrate-portal-btn"
        >
          <Ionicons name="open-outline" size={16} color={colors.primaryForeground} />
          <Text style={[styles.migrateBtnText, { color: colors.primaryForeground }]}>
            Open Migration Portal
          </Text>
        </Pressable>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>How It Works</Text>
        <View style={[styles.timelineCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {MIGRATION_STEPS.map((step, i) => (
            <View
              key={step.number}
              style={[
                styles.timelineRow,
                i < MIGRATION_STEPS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.stepBadge,
                    {
                      backgroundColor:
                        step.status === "done"
                          ? colors.accent + "22"
                          : step.status === "active"
                          ? colors.primary + "22"
                          : colors.muted,
                    },
                  ]}
                >
                  {step.status === "done" ? (
                    <Ionicons name="checkmark" size={14} color={colors.accent} />
                  ) : step.status === "active" ? (
                    <Text style={[styles.stepNumber, { color: colors.primary }]}>{step.number}</Text>
                  ) : (
                    <Text style={[styles.stepNumber, { color: colors.mutedForeground }]}>{step.number}</Text>
                  )}
                </View>
                <View
                  style={[
                    styles.stepLine,
                    {
                      backgroundColor: i < MIGRATION_STEPS.length - 1 ? colors.border : "transparent",
                    },
                  ]}
                />
              </View>
              <View style={styles.timelineText}>
                <Text
                  style={[
                    styles.stepTitle,
                    {
                      color:
                        step.status === "upcoming" ? colors.mutedForeground : colors.foreground,
                    },
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={[styles.stepDesc, { color: colors.mutedForeground }]}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Why Migrated */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Why We Migrated</Text>
        <View style={styles.whyGrid}>
          {WHY_ITEMS.map((item) => (
            <View
              key={item.title}
              style={[styles.whyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.whyIcon, { backgroundColor: colors.primary + "22" }]}>
                <Ionicons name={item.icon} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.whyTitle, { color: colors.foreground }]}>{item.title}</Text>
              <Text style={[styles.whyDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Security Warnings */}
      <View style={styles.section}>
        <View style={[styles.securityCard, { backgroundColor: "#1a0000", borderColor: colors.destructive + "44" }]}>
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark" size={20} color={colors.destructive} />
            <Text style={[styles.securityTitle, { color: colors.destructive }]}>Stay Safe — Scam Warnings</Text>
          </View>
          {SECURITY_WARNINGS.map((w, i) => (
            <View key={i.toString()} style={styles.warningRow}>
              <Ionicons name="alert-circle-outline" size={14} color={colors.destructive} style={{ marginTop: 2 }} />
              <Text style={[styles.warningText, { color: "#ff9999" }]}>{w}</Text>
            </View>
          ))}
        </View>
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
    marginBottom: 20,
  },
  migrateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  migrateBtnText: {
    fontSize: 15,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
  },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  timelineCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  timelineRow: {
    flexDirection: "row",
    padding: 16,
    gap: 14,
  },
  timelineLeft: {
    alignItems: "center",
    width: 32,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
  },
  stepLine: {
    flex: 1,
    width: 1,
    marginTop: 4,
  },
  timelineText: { flex: 1, paddingTop: 4, paddingBottom: 8 },
  stepTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  whyGrid: { gap: 12 },
  whyCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
  },
  whyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  whyTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  whyDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  securityCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
  },
  securityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: "700" as const,
    fontFamily: "Inter_700Bold",
  },
  warningRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
});
