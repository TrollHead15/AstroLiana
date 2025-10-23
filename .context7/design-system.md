# AstroLiana Design System

## Color Palette

### Primary Colors

```css
--primary: #2D2B55;        /* Deep mystical purple */
--background: #F9F6EE;     /* Warm beige */
--accent: #D4AF37;         /* Golden accent */
```

### Extended Palette

```css
--primary-light: #4A4770;
--primary-dark: #1F1D3A;
--accent-light: #E8D077;
--accent-dark: #B8941F;
--text-primary: #1F1D3A;
--text-secondary: #6B6880;
--text-muted: #A8A5B8;
--border: #E5E2D8;
--surface: #FFFFFF;
--surface-hover: #F5F2EA;
```

### Semantic Colors

```css
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
--info: #2196F3;
```

## Typography

### Font Families

```typescript
import { Cormorant_Garamond, Inter } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});
```

### Type Scale

```css
/* Headings - Cormorant Garamond */
--text-h1: 3.5rem;      /* 56px */
--text-h2: 2.5rem;      /* 40px */
--text-h3: 2rem;        /* 32px */
--text-h4: 1.5rem;      /* 24px */
--text-h5: 1.25rem;     /* 20px */
--text-h6: 1.125rem;    /* 18px */

/* Body - Inter */
--text-body-lg: 1.125rem;   /* 18px */
--text-body: 1rem;          /* 16px */
--text-body-sm: 0.875rem;   /* 14px */
--text-caption: 0.75rem;    /* 12px */
```

### Line Heights

```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing System

Based on Tailwind CSS default spacing scale (base: 4px):

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
```

## Components

### Buttons

```tsx
// Primary Button
<button className="
  bg-primary text-white
  px-6 py-3 rounded-lg
  font-medium
  hover:bg-primary-dark
  transition-colors duration-300
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  Button Text
</button>

// Secondary Button
<button className="
  bg-transparent text-primary border-2 border-primary
  px-6 py-3 rounded-lg
  font-medium
  hover:bg-primary hover:text-white
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  Button Text
</button>

// Accent Button
<button className="
  bg-accent text-primary
  px-6 py-3 rounded-lg
  font-medium
  hover:bg-accent-dark
  transition-colors duration-300
  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
">
  Button Text
</button>
```

### Form Inputs

```tsx
<input
  type="text"
  className="
    w-full px-4 py-3
    bg-surface border border-border rounded-lg
    text-text-primary placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all duration-200
  "
  placeholder="Enter text..."
/>
```

### Cards

```tsx
<div className="
  bg-surface border border-border rounded-xl
  p-6 shadow-sm
  hover:shadow-md hover:border-primary/20
  transition-all duration-300
">
  Card Content
</div>
```

## Animations

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-custom: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Common Animations with Framer Motion

```tsx
// Fade In
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Slide Up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Content
</motion.div>

// Scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
>
  Button
</motion.button>

// Stagger Children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Reduced Motion

Always respect user preferences:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{
    y: shouldReduceMotion ? 0 : [0, -10, 0],
  }}
  transition={{
    duration: shouldReduceMotion ? 0 : 2,
  }}
/>
```

Or in CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Breakpoints

```typescript
const breakpoints = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large desktop
};
```

### Usage in Tailwind

```tsx
<div className="
  w-full          // Mobile
  md:w-1/2        // Tablet and up
  lg:w-1/3        // Desktop and up
">
  Responsive Content
</div>
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Border Radius

```css
--radius-sm: 0.375rem;    /* 6px */
--radius: 0.5rem;         /* 8px */
--radius-md: 0.75rem;     /* 12px */
--radius-lg: 1rem;        /* 16px */
--radius-xl: 1.5rem;      /* 24px */
--radius-full: 9999px;    /* Fully rounded */
```

## Accessibility

### Focus States

All interactive elements must have visible focus indicators:

```css
.focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2;
}
```

### Color Contrast

All text must meet WCAG 2.2 Level AA standards:
- Normal text: minimum 4.5:1 contrast ratio
- Large text (18px+ or 14px+ bold): minimum 3:1 contrast ratio

### Touch Targets

Minimum touch target size: 44x44px for mobile devices.

```tsx
<button className="min-h-[44px] min-w-[44px] p-3">
  <Icon />
</button>
```
