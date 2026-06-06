# Investigación: Uso de Blending Modes en SVG con React Native

## Contexto
En entornos Web, los *Blending Modes* (como `mix-blend-mode`) se pueden aplicar directamente mediante CSS a etiquetas `<svg>`, `<g>` o `<path>`. Sin embargo, en aplicaciones móviles utilizando `react-native-svg`, esta característica no ha estado soportada históricamente de forma directa en las primitivas del SVG.

## Avances Recientes en React Native
Con las actualizaciones recientes de React Native (especialmente a partir de la versión 0.76 y la Nueva Arquitectura, y disponible en la versión **0.81.5** que utiliza este proyecto), se ha añadido soporte nativo para la propiedad de estilo `mixBlendMode` directamente en el componente fundamental `<View>`. 

Esto significa que, en lugar de intentar aplicar el blend mode a un nodo SVG específico, el comportamiento se puede replicar componiendo múltiples vistas.

### Valores Soportados
La propiedad `mixBlendMode` en el componente `<View>` soporta la mayoría de los modos de fusión estándar de CSS, tales como:
- `normal`
- `multiply`
- `screen`
- `overlay`
- `darken`
- `lighten`
- `color-dodge`
- `color-burn`
- `hard-light`
- `soft-light`
- `difference`
- `exclusion`
- `hue`
- `saturation`
- `color`
- `luminosity`

*(Nota: En Android, requiere versión 10 o superior).*

## Alternativas de Implementación

Existen 3 enfoques principales para resolver esto en el proyecto actual (`gympairo`):

### 1. Enfoque Nativo Puro (View mixBlendMode)
Se reescribe la renderización del SVG utilizando la librería `react-native-svg`. Se separan las capas que requieren efectos de fusión en distintos contenedores `<View>`.

**Ejemplo:**
```tsx
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function BlendedSVG() {
  return (
    <View style={{ flex: 1 }}>
      {/* Capa de fondo (Imagen o SVG base) */}
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
         <BaseImageOrSvg />
      </View>
      
      {/* Capa de músculos con mixBlendMode aplicado al contenedor */}
      <View style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        mixBlendMode: 'multiply' // <-- Aplicado a la View nativa
      }}>
        <Svg viewBox="0 0 1020 2088">
          <Path d="..." fill="red" />
        </Svg>
      </View>
    </View>
  );
}
```

### 2. Enfoque React Native Skia
Utilizar la librería `@shopify/react-native-skia`. Es un motor de renderizado gráfico de alto rendimiento que incluye soporte completo de primera clase para *Blend Modes*, shaders y máscaras.
- Ideal si se requieren gráficos muy complejos, animaciones fluidas o efectos que sobrepasan las capacidades del `mixBlendMode` básico.

### 3. Enfoque Expo DOM Components (Recomendado para migración rápida)
Dado que el componente `BodyDiagram` actual del sistema de diseño renderiza elementos web (`<div>`, `dangerouslySetInnerHTML`), Expo 52+ ofrece la directiva `"use dom"`. 
Esto permite que un componente web corra de manera embebida y altamente optimizada dentro de la app móvil, manteniendo todo el CSS y comportamiento de navegador (incluyendo el `mix-blend-mode` de CSS).

## Conclusión para el Proyecto `gympairo`
Dado que el proyecto utiliza React Native 0.81.5 y Expo, la solución de usar `mixBlendMode` en un componente `<View>` superpuesto es completamente viable y nativa. Si se desea evitar una reescritura del componente del Design System hacia primitivas de `react-native-svg`, la arquitectura de Expo DOM Components es una alternativa excelente.