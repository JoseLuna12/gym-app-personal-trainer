import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey Pairo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.background.default,
  },
  title: {
    color: Palette.text.primary,
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1,
  },
});
