# Gympairo

Mobile app built with Expo (React Native) and TypeScript.

## Stack

- **Expo** v56 — managed workflow, file-based routing via `expo-router`
- **React Native** with TypeScript
- **NativeWind / Tailwind** for styling
- **React Compiler** enabled

## Getting started

```bash
npm install
npx expo start
```

Open on device via Expo Go, iOS Simulator, or Android Emulator.

## Project structure

```
src/
  app/          # File-based routes (expo-router)
  components/   # Shared UI components
  constants/    # Theme, colors, spacing
  hooks/        # Custom hooks
```

## Design tokens

All tokens live in `src/constants/theme.ts`.

### Palette

| Token | Hex |
|---|---|
| `Palette.primary.brand` | `#FDC026` |
| `Palette.accent[500]` | `#76B8E0` |
| `Palette.background.default` | `#141414` |
| `Palette.background.muted` | `#1C1C1E` |
| `Palette.background.highlight` | `#2C2A30` |
| `Palette.background.depth` | `#0A0A0A` |
| `Palette.text.primary` | `#EBEBEB` |
| `Palette.text.secondary` | `#8A8A8A` |

### Spacing scale

| Token | Value |
|---|---|
| `Spacing.half` | 2 |
| `Spacing.one` | 4 |
| `Spacing.two` | 8 |
| `Spacing.three` | 16 |
| `Spacing.four` | 24 |
| `Spacing.five` | 32 |
| `Spacing.six` | 64 |
