# Quick Start Guide - AstroLiana Development

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

## Initial Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd astroliana
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- Resend API key
- Telegram bot token
- Mapbox token
- Analytics keys

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## MCP Server Setup

### Start MCP Server

```bash
npm run mcp:dev
```

This starts the Model Context Protocol server that provides project context.

### Query Context

The MCP server provides a `getContext()` function:

```javascript
// Get all context
getContext()

// Get specific sections
getContext('project')
getContext('techStack.framework')
getContext('designSystem.colors.primary')
```

## Creating Your First Component

### 1. Server Component (Default)

```typescript
// app/components/ServiceCard.tsx
interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
}

export default function ServiceCard({ title, description, price }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="font-cormorant text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-text-secondary">{description}</p>
      <p className="mt-4 text-accent font-semibold">${price}</p>
    </div>
  );
}
```

### 2. Client Component (Interactive)

```typescript
// components/ContactButton.tsx
'use client';

import { useState } from 'react';

export function ContactButton() {
  const [clicked, setClicked] = useState(false);
  
  return (
    <button
      onClick={() => setClicked(true)}
      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
    >
      {clicked ? 'Message Sent!' : 'Contact Us'}
    </button>
  );
}
```

## Creating a Form

### 1. Define Validation Schema

```typescript
// lib/validations/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### 2. Create Form Component

```typescript
// components/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('name')} placeholder="Name" className="w-full px-4 py-2 border rounded" />
        {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
      </div>
      
      <div>
        <input {...register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded" />
        {errors.email && <span className="text-error text-sm">{errors.email.message}</span>}
      </div>
      
      <div>
        <textarea {...register('message')} placeholder="Message" className="w-full px-4 py-2 border rounded" />
        {errors.message && <span className="text-error text-sm">{errors.message.message}</span>}
      </div>
      
      <button type="submit" className="bg-primary text-white px-6 py-2 rounded">
        Send Message
      </button>
    </form>
  );
}
```

## Adding Animations

```typescript
// components/AnimatedCard.tsx
'use client';

import { motion } from 'framer-motion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-surface rounded-xl"
    >
      {children}
    </motion.div>
  );
}
```

## Working with Images

```typescript
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Astrology consultation"
      width={800}
      height={600}
      priority // For above-the-fold images
      className="rounded-lg"
    />
  );
}
```

## Creating API Routes

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await resend.emails.send({
      from: 'noreply@astroliana.com',
      to: 'info@astroliana.com',
      subject: 'New Contact Form Submission',
      html: `<p>Name: ${data.name}</p><p>Email: ${data.email}</p><p>Message: ${data.message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

## Common Development Tasks

### Run Linting

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Check TypeScript

```bash
npx tsc --noEmit
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Pages**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `PascalCase.ts` or `types.ts`
- **Hooks**: `useCamelCase.ts` (e.g., `useUserData.ts`)

## Import Aliases

```typescript
import { Button } from '@/components/ui/Button';      // Components
import { formatDate } from '@/lib/utils';             // Utilities
import { useUserData } from '@/hooks/useUserData';    // Hooks
import type { User } from '@/types/user';             // Types
```

## Common Patterns

### Conditional Rendering

```typescript
{isLoading && <Spinner />}
{error && <ErrorMessage message={error} />}
{data && <DataDisplay data={data} />}
```

### Lists

```typescript
{items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

### Conditional Styling

```typescript
<button className={`
  base-styles
  ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}
  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
`}>
  Button
</button>
```

## Debugging Tips

### Client Components

```typescript
'use client';
import { useEffect } from 'react';

export function DebugComponent({ data }: { data: any }) {
  useEffect(() => {
    console.log('Data changed:', data);
  }, [data]);
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### Server Components

```typescript
export default async function DebugPage() {
  const data = await fetchData();
  console.log('Server-side data:', data); // Shows in terminal, not browser
  return <div>{data.value}</div>;
}
```

## Helpful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## Getting Help

1. Check project documentation in `.context7/`
2. Use MCP server: `npm run mcp:dev` and query context
3. Review similar components in the codebase
4. Consult team members

## Next Steps

1. ✅ Set up environment
2. ✅ Start MCP server
3. 📝 Create your first component
4. 📝 Build a feature
5. 📝 Add tests
6. 📝 Create a PR

Happy coding! 🚀
