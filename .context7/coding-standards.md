# AstroLiana Coding Standards

## TypeScript Guidelines

### Type Safety

Always enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type vs Interface

**Use `interface` for:**
- Object shapes
- Component props
- Extendable types

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}
```

**Use `type` for:**
- Unions and intersections
- Primitive aliases
- Tuple types
- Mapped types

```typescript
type Status = 'pending' | 'active' | 'inactive';
type ID = string | number;
type Point = [number, number];
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### Type Inference

Leverage TypeScript's type inference when possible:

```typescript
// Good - type is inferred
const users = ['Alice', 'Bob', 'Charlie'];
const count = users.length;

// Good - explicit type needed
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// Avoid - unnecessary type annotation
const name: string = 'Alice';
```

## React Component Standards

### Functional Components

Always use functional components with TypeScript:

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// For children prop
interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
```

### Server vs Client Components

**Server Components (Default):**

```typescript
// app/components/UserList.tsx
// No 'use client' directive - this is a Server Component

interface User {
  id: string;
  name: string;
}

export default async function UserList() {
  // Can fetch data directly
  const users: User[] = await fetchUsers();
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Client Components:**

```typescript
// components/InteractiveForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function InteractiveForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data: FormData) => {
    setSubmitted(true);
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### Custom Hooks

Always prefix custom hooks with `use`:

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage`, error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Form Handling with React Hook Form + Zod

```typescript
// lib/validations/contact.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// components/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span className="error">{errors.name.message}</span>}
      
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span className="error">{errors.email.message}</span>}
      
      <textarea {...register('message')} placeholder="Message" />
      {errors.message && <span className="error">{errors.message.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## Error Handling

### Async/Await with Try-Catch

```typescript
async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Log to error tracking service (e.g., Sentry)
    return null;
  }
}
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Naming Conventions

### Files and Directories

```
✅ Good:
components/UserProfile.tsx
hooks/useUserData.ts
lib/utils/formatDate.ts
types/api.ts

❌ Bad:
components/userProfile.tsx
hooks/UseUserData.ts
lib/utils/format-date.ts
types/API.ts
```

### Variables and Functions

```typescript
// Constants - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// Variables - camelCase
const userName = 'Alice';
const isLoggedIn = true;

// Functions - camelCase, descriptive verb
function fetchUserData(userId: string) { }
function validateEmail(email: string) { }

// Boolean variables - is/has/should prefix
const isLoading = true;
const hasError = false;
const shouldRetry = true;

// Event handlers - handle/on prefix
const handleClick = () => { };
const onSubmit = () => { };
```

### Components and Types

```typescript
// Components - PascalCase
export function UserProfile() { }
export function NavigationMenu() { }

// Types and Interfaces - PascalCase
interface UserData { }
type ApiResponse<T> = { }

// Enums - PascalCase
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
```

## Import Organization

```typescript
// 1. React and Next.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// 3. Internal absolute imports
import { Button } from '@/components/ui/Button';
import { useUserData } from '@/hooks/useUserData';
import { formatDate } from '@/lib/utils';

// 4. Relative imports
import { LocalComponent } from './LocalComponent';
import styles from './styles.module.css';

// 5. Type imports (can be mixed with regular imports if preferred)
import type { User } from '@/types/user';
```

## Code Comments

### When to Comment

```typescript
// ✅ Good - Explains WHY, not WHAT
// Using exponential backoff to avoid overwhelming the API during high traffic
async function retryWithBackoff(fn: () => Promise<any>, maxRetries: number) {
  // ...
}

// ✅ Good - Complex business logic
// Calculate birth chart houses using Placidus system
// Formula: https://en.wikipedia.org/wiki/House_(astrology)#Placidus
function calculateHouses(latitude: number, longitude: number) {
  // ...
}

// ❌ Bad - Obvious comment
// Set the name variable to user's name
const name = user.name;

// ❌ Bad - Outdated comment
// TODO: Fix this later (written 2 years ago)
```

### JSDoc for Complex Functions

```typescript
/**
 * Calculates the astrological chart for a given date, time, and location
 * 
 * @param birthDate - ISO 8601 formatted date string
 * @param birthTime - 24-hour format time string (HH:MM)
 * @param location - Geographic coordinates
 * @returns Complete birth chart data including planets, houses, and aspects
 * 
 * @example
 * const chart = calculateBirthChart(
 *   '1990-01-15',
 *   '14:30',
 *   { lat: 40.7128, lng: -74.0060 }
 * );
 */
export function calculateBirthChart(
  birthDate: string,
  birthTime: string,
  location: { lat: number; lng: number }
): BirthChart {
  // Implementation
}
```

## Performance Best Practices

### Image Optimization

```typescript
// Always use next/image
import Image from 'next/image';

<Image
  src="/astro-logo.png"
  alt="AstroLiana Logo"
  width={200}
  height={100}
  priority // Use for above-the-fold images
/>

<Image
  src={user.avatarUrl}
  alt={user.name}
  width={50}
  height={50}
  loading="lazy" // Use for below-the-fold images
/>
```

### Dynamic Imports

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Disable SSR if component uses browser APIs
});

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  );
}
```

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data }: { data: number[] }) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => complexCalculation(item));
  }, [data]);

  // Memoize callbacks to prevent re-renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <div onClick={handleClick}>{processedData.length}</div>;
}
```

## Accessibility Best Practices

### Semantic HTML

```tsx
// ✅ Good
<nav>
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content...</p>
  </article>
</main>

// ❌ Bad
<div>
  <div>
    <div><a href="/about">About</a></div>
    <div><a href="/services">Services</a></div>
  </div>
</div>
```

### ARIA Labels

```tsx
// Icon buttons need labels
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// Decorative images should be hidden
<img src="decoration.png" alt="" role="presentation" />

// Form inputs need labels
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

### Keyboard Navigation

```tsx
'use client';

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Trap focus within modal
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

## Testing

### Component Testing Example

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```
