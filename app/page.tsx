import {
  HeroSection,
  AboutSection,
  LeadMagnetsSection,
} from "@/components/sections";
import { LeadMagnetModals } from "@/components/modals/LeadMagnetModals";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LeadMagnetsSection />
      <LeadMagnetModals />
    </main>
  );
}
