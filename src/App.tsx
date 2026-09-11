import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import { StickyCta } from "./components/StickyCta";
import { LeadProvider } from "./lead";
import { Benefits } from "./components/sections/Benefits";
import { Program } from "./components/sections/Program";
import { Journey } from "./components/sections/Journey";
import { Pricing } from "./components/sections/Pricing";
import { Schedule } from "./components/sections/Schedule";
import { Coaches } from "./components/sections/Coaches";
import { Testimonials } from "./components/sections/Testimonials";
import { Gallery } from "./components/sections/Gallery";
import { Tradition } from "./components/sections/Tradition";
import { Camp } from "./components/sections/Camp";
import { Parents } from "./components/sections/Parents";
import { Faq } from "./components/sections/Faq";
import { FinalCta } from "./components/sections/FinalCta";

export default function App() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Program />
        <Journey />
        <Pricing />
        <Schedule />
        <Coaches />
        <Testimonials />
        <Gallery />
        <Tradition />
        <Camp />
        <Parents />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <div aria-hidden="true" className="h-[76px] lg:hidden" />
      <StickyCta />
      <ChatBot />
    </LeadProvider>
  );
}
