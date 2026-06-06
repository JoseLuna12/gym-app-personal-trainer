import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BodyDiagram, colors, typography, spacing, radius } from '@jlunamena/design-system';
import { BODY_FRONT_SVG, BODY_BACK_SVG } from '../assets/body-diagrams';

const SVG_BY_VIEW = { front: BODY_FRONT_SVG, back: BODY_BACK_SVG };

export default function BodyDiagramScreen() {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <View style={styles.toggle}>
          {(['front', 'back'] as const).map((v) => (
            <Pressable
              key={v}
              onPress={() => setView(v)}
              style={[styles.toggleBtn, view === v && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, view === v && styles.toggleTextActive]}>
                {v}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.diagram}>
        <BodyDiagram
          view={view}
          svgMarkupByView={SVG_BY_VIEW}
          selectedMuscles={selectedMuscles}
          onSelectedChange={setSelectedMuscles}
          interactionMode="editable"
          palette={colors.bodyDiagram}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.default,
    paddingTop: 56,
    paddingBottom: spacing.small,
  },
  backBtn: {
    padding: spacing.small,
  },
  backText: {
    color: colors.text.secondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.background.muted,
    borderRadius: radius.button,
    padding: 3,
    gap: 2,
  },
  toggleBtn: {
    paddingHorizontal: spacing.default,
    paddingVertical: spacing.small / 2,
    borderRadius: radius.button - 1,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    textTransform: 'capitalize',
  },
  toggleTextActive: {
    color: colors.background.default,
  },
  diagram: {
    flex: 1,
  },
});
