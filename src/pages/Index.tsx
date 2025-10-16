import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import ProofResults from "@/components/ProofResults";
import Audiences from "@/components/Audiences";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pricing />
      <Benefits />
      <HowItWorks />
      <ProofResults />
      <Audiences />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
