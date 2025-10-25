# Sections Components

## HeroSection

Hero section component with animated entrance effects and smooth scroll to CTA target.

### Features

- ✅ **Responsive Design**: Mobile-first approach with adaptive text sizes and spacing
- ✅ **Animations**: Framer Motion animations with staggered entrance
  - Fade in for heading (delay: 0.2s)
  - Slide up + fade in for subheading (delay: 0.4s)
  - Scale + fade in for CTA button (delay: 0.6s)
- ✅ **Smooth Scroll**: Integrated with Lenis for smooth scrolling to lead magnets section
- ✅ **Accessibility**:
  - Semantic HTML (`section`, `h1`, `p`, `button`)
  - ARIA labels for screen readers
  - Focus-visible states with proper styling
  - Keyboard navigation support
  - WCAG AA color contrast compliance
- ✅ **Reduced Motion Support**: Respects `prefers-reduced-motion` user preference
- ✅ **Hover Effects**:
  - Scale transform (1.05)
  - Shadow on hover and focus
  - Smooth transitions (200ms)
- ✅ **Performance Optimizations**:
  - Hardware-accelerated animations (transform, opacity)
  - Optimized with `will-change` CSS property

### Usage

```tsx
import { HeroSection } from "@/components/sections";

export default function Page() {
  return <HeroSection onCTAClick={() => console.log("CTA clicked")} />;
}
```

### Props

| Prop       | Type       | Required | Description                                 |
| ---------- | ---------- | -------- | ------------------------------------------- |
| onCTAClick | () => void | No       | Optional callback fired when CTA is clicked |

### Scroll Target

The CTA button scrolls to an element with ID `lead-magnets`. Make sure this element exists on your page.

## LeadMagnetsSection

Placeholder section for lead magnets display.

### Features

- ✅ Semantic HTML with proper ID for scroll target
- ✅ Responsive layout
- ✅ Consistent styling with design system

### Usage

```tsx
import { LeadMagnetsSection } from "@/components/sections";

export default function Page() {
  return <LeadMagnetsSection />;
}
```
