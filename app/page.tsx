import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { DemoScrub } from "@/components/demo-scrub";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { Wound } from "@/components/wound";
import { Suite } from "@/components/suite";
import { TriagemSpotlight } from "@/components/triagem-spotlight";
import { Telemetry } from "@/components/telemetry";
import { PrivacyAct } from "@/components/privacy-act";
import { Safety } from "@/components/safety";
import { LgpdCompliance } from "@/components/lgpd-compliance";
import { SecurityBadges } from "@/components/security-badges";
import { MidCta } from "@/components/mid-cta";
import { InvestmentReframe } from "@/components/investment-reframe";
import { Manifesto } from "@/components/manifesto";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { OrbStage } from "@/lib/orb/orb-stage";

export default function Home() {
  return (
    <>
      <div className="world-bg" aria-hidden="true" />
      <OrbStage />
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <StickyCta />
      <Nav />

      {/* Funil: promessa → dor → produto → prova/segurança → valor → planos → ação */}
      <Hero />
      <DemoScrub />
      <TrustBar />
      <Wound />
      <Suite />
      <TriagemSpotlight />
      <Telemetry />
      <PrivacyAct />
      <Safety />
      <LgpdCompliance />
      <SecurityBadges />
      <MidCta />
      <InvestmentReframe />
      <Manifesto />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
