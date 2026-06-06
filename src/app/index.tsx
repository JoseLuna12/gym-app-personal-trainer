import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { colors, typography, spacing, radius } from "@jlunamena/design-system";

export default function DomiScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Design System</Text>
        <Text style={styles.title}>Dummy</Text>
        <Text style={styles.subtitle}>Connected</Text>

        <View style={styles.swatchRow}>
          <View style={[styles.swatch, { backgroundColor: colors.primary }]} />
          <View style={[styles.swatch, { backgroundColor: colors.accent }]} />
          <View
            style={[
              styles.swatch,
              { backgroundColor: colors.background.highlight },
            ]}
          />
          <View
            style={[
              styles.swatch,
              { backgroundColor: colors.background.muted },
            ]}
          />
        </View>

        <Text style={styles.meta}>
          @jlunamena/design-system{"\n"}
          primary: {colors.primary} · accent: {colors.accent}
        </Text>

        <Pressable onPress={() => router.push('/body-diagram')} style={styles.navBtn}>
          <Text style={styles.navBtnText}>Body Diagram →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.default,
    padding: spacing.default,
  },
  card: {
    backgroundColor: colors.background.muted,
    borderRadius: radius.card,
    padding: spacing.default,
    alignItems: "center",
    gap: spacing.small,
    width: "100%",
    maxWidth: 360,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    color: colors.primary,
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.accent,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  swatchRow: {
    flexDirection: "row",
    gap: spacing.small,
    marginTop: spacing.small,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    textAlign: "center",
    marginTop: spacing.small,
    lineHeight: typography.size.xs * typography.lineHeight.relaxed,
  },
  navBtn: {
    marginTop: spacing.small,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingHorizontal: spacing.default,
    paddingVertical: spacing.small,
    width: "100%",
    alignItems: "center",
  },
  navBtnText: {
    color: colors.background.default,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
  },
});
