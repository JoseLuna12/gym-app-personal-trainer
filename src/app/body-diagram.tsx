import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BodyDiagram, colors, typography, spacing, radius } from '@jlunamena/design-system';
import type { BodyDiagramIntensity } from '@jlunamena/design-system';

const sorenessLevels: BodyDiagramIntensity[] = ['off', 'low', 'medium', 'high'];

export default function BodyDiagramScreen() {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [intensityByMuscle, setIntensityByMuscle] = useState<Record<string, BodyDiagramIntensity>>(
    {}
  );
  const [debugForceVisible, setDebugForceVisible] = useState(false);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);

  const selectedMuscles = Object.keys(intensityByMuscle);

  const cycleSoreness = (key: string) => {
    setIntensityByMuscle((current) => {
      const currentLevel = current[key] ?? 'off';
      const nextLevel =
        sorenessLevels[(sorenessLevels.indexOf(currentLevel) + 1) % sorenessLevels.length];
      const next = { ...current };

      if (nextLevel === 'off') {
        delete next[key];
      } else {
        next[key] = nextLevel;
      }

      return next;
    });
  };

  const handleSelectedChange = (nextSelected: string[]) => {
    const currentSelected = new Set(selectedMuscles);
    const incomingSelected = new Set(nextSelected);

    const added = nextSelected.find((key) => !currentSelected.has(key));
    if (added) {
      cycleSoreness(added);
      return;
    }

    const removed = selectedMuscles.find((key) => !incomingSelected.has(key));
    if (removed) {
      cycleSoreness(removed);
    }
  };

  const diagramProps = {
    view,
    selectedMuscles,
    onSelectedChange: handleSelectedChange,
    interactionMode: 'editable' as const,
    palette: colors.bodyDiagram,
    debugForceVisible,
    overlayStyle: { blur: 12, blendMode: 'color-dodge' },
    intensityByMuscle,
  };

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
              <Text style={[styles.toggleText, view === v && styles.toggleTextActive]}>{v}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.diagram}>
        <BodyDiagram {...diagramProps} />
        <Pressable onPress={() => setShowFullscreenPreview(true)} style={styles.expandButton}>
          <Text style={styles.expandButtonText}>Expand</Text>
        </Pressable>
      </View>

      <View style={styles.footerBar}>
        <Pressable
          onPress={() => setDebugForceVisible((value) => !value)}
          style={[styles.toolbarButton, debugForceVisible && styles.toolbarButtonActive]}
        >
          <Text style={[styles.toolbarText, debugForceVisible && styles.toolbarTextActive]}>
            Debug {debugForceVisible ? 'on' : 'off'}
          </Text>
        </Pressable>
        <Pressable onPress={() => setIntensityByMuscle({})} style={styles.toolbarButton}>
          <Text style={styles.toolbarText}>Clear</Text>
        </Pressable>
        <Text style={styles.footerText}>
          Tap cycles soreness: off, low, medium, high
        </Text>
      </View>

      <Modal
        visible={showFullscreenPreview}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowFullscreenPreview(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Body Diagram Preview</Text>
            <Pressable
              onPress={() => setShowFullscreenPreview(false)}
              style={styles.toolbarButton}
            >
              <Text style={styles.toolbarText}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalDiagram}>
            <BodyDiagram {...diagramProps} />
          </View>
        </View>
      </Modal>
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
  expandButton: {
    position: 'absolute',
    top: spacing.small,
    right: spacing.small,
    paddingHorizontal: spacing.small,
    paddingVertical: 7,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.background.highlight,
    backgroundColor: 'rgba(8, 8, 10, 0.82)',
  },
  expandButtonText: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  footerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: spacing.small,
    borderTopWidth: 1,
    borderTopColor: colors.background.highlight,
    backgroundColor: colors.background.muted,
  },
  toolbarButton: {
    paddingHorizontal: spacing.small,
    paddingVertical: 7,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.background.highlight,
    backgroundColor: colors.background.default,
  },
  toolbarButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toolbarText: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  toolbarTextActive: {
    color: colors.background.default,
  },
  footerText: {
    flex: 1,
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.default,
    paddingTop: 56,
    paddingBottom: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.highlight,
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
  },
  modalDiagram: {
    flex: 1,
    padding: spacing.small,
  },
});
