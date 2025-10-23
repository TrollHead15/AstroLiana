export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-display font-heading text-primary">
          Welcome to Next.js 14
        </h1>
        <p className="text-body-lg text-foreground/80">
          Modern application with TypeScript, Tailwind CSS, and custom fonts
        </p>
        <div className="flex gap-4 justify-center">
          <div className="bg-primary text-white px-6 py-3 rounded-lg">
            Primary Color
          </div>
          <div className="bg-accent text-white px-6 py-3 rounded-lg">
            Accent Color
          </div>
        </div>
      </div>
    </main>
  );
}
