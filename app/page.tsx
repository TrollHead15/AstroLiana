import {
  HeroSection,
  AboutSection,
  LeadMagnetsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LeadMagnetsSection />
    </main>
  );
}
