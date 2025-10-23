# Next.js 14 Project

Modern Next.js 14 application with TypeScript, Tailwind CSS, and custom configuration.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3+
- **Fonts:** Cormorant Garamond (headings), Inter (body)
- **Animations:** Framer Motion, GSAP, Lenis
- **Forms:** React Hook Form + Zod
- **Code Quality:** ESLint, Prettier, Husky

## Custom Design System

### Colors

- **Primary:** `#2D2B55` (индиго)
- **Background:** `#F9F6EE` (кремовый)
- **Accent:** `#D4AF37` (золотой)

### Typography

- **Headings:** Cormorant Garamond (600, 700)
- **Body:** Inter (400, 500)
- Responsive font sizes using `clamp()`

## Project Structure

```
/app                 # Next.js App Router
/components
  /ui               # Reusable UI components
  /sections         # Landing page sections
  /modals           # Modal components
/lib
  /utils            # Utility functions
  /validations      # Zod validation schemas
  /hooks            # Custom React hooks
/public
  /assets           # Static assets (PDF, images)
  /icons            # SVG icons
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from template:

```bash
cp .env.local.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript strict mode
- ✅ Tailwind CSS with custom design tokens
- ✅ Google Fonts (Cormorant Garamond, Inter)
- ✅ ESLint + Prettier configuration
- ✅ Pre-commit hooks (Husky + lint-staged)
- ✅ Optimized images (WebP, AVIF)
- ✅ Accessibility support (prefers-reduced-motion)
- ✅ Path aliases (@/components, @/lib, etc.)

## Environment Variables

See `.env.local.example` for required environment variables.
