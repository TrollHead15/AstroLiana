# AstroLiana Architecture

## Overview

AstroLiana is built using Next.js 14 with the App Router, following a feature-based modular architecture with Server Components as the default rendering strategy.

## Project Structure

```
astroliana/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Route groups
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── ui/                  # UI primitives (atoms)
│   ├── forms/               # Form components
│   ├── layout/              # Layout components
│   └── features/            # Feature-specific components
├── lib/                     # Utilities and helpers
│   ├── utils.ts             # General utilities
│   ├── validations.ts       # Zod schemas
│   └── api/                 # API clients
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── config/                  # Configuration files
├── public/                  # Static assets
└── .context7/               # MCP context configuration
```

## Component Architecture

### Server Components (Default)

Server Components are the default in Next.js 14 App Router. Use them for:
- Static content rendering
- Data fetching from databases
- Accessing backend resources
- Reducing client-side JavaScript

```typescript
// app/components/UserProfile.tsx
export default async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}
```

### Client Components

Mark components with `'use client'` when you need:
- Browser APIs (localStorage, window, etc.)
- React hooks (useState, useEffect, etc.)
- Event handlers
- Third-party libraries that rely on browser features

```typescript
// components/ui/InteractiveButton.tsx
'use client';

import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Data Fetching Strategy

### Server-Side (Preferred)

1. **Server Components**: Fetch data directly in components
2. **Server Actions**: Handle form submissions and mutations
3. **Route Handlers**: Create API endpoints when needed

### Client-Side (When Necessary)

1. **React Hook Form**: Form state management
2. **fetch/axios**: API calls from client components
3. **SWR/React Query**: Not used - prefer Server Components

## State Management

- **Server State**: Server Components + Server Actions
- **Form State**: React Hook Form + Zod validation
- **UI State**: React useState/useReducer
- **Global State**: React Context (minimal use)

## Routing

Next.js 14 App Router with:
- File-based routing in `app/` directory
- Route groups for organization `(group-name)`
- Layouts for shared UI
- Loading and error states with `loading.tsx` and `error.tsx`

## API Integration

### Email (Resend)
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
```

### Telegram Bot
```typescript
import TelegramBot from 'node-telegram-bot-api';
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
```

### Analytics
- PostHog for product analytics
- Plausible for privacy-friendly web analytics

### Geocoding (Mapbox)
```typescript
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
```

## Performance Optimization

1. **Image Optimization**: Use `next/image` for all images
2. **Font Optimization**: Use `next/font` for custom fonts
3. **Code Splitting**: Automatic with Next.js, use `dynamic()` for manual control
4. **Caching**: Leverage Next.js caching strategies (fetch cache, route cache)
5. **Static Generation**: Use when possible for best performance

## Security Practices

1. **Environment Variables**: Store secrets in `.env.local`
2. **API Protection**: Validate all inputs with Zod
3. **Authentication**: Implement proper auth (recommendation: NextAuth.js)
4. **CSRF Protection**: Built into Next.js Server Actions
5. **Content Security Policy**: Configure in `next.config.js`

## Deployment

Target: Vercel (optimal for Next.js)
- Automatic deployments from Git
- Preview deployments for PRs
- Environment variables configured in Vercel dashboard
- Edge functions for API routes (when applicable)
