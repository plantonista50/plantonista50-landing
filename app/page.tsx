import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { FluxStage } from "@/lib/scene/flux-stage";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { Wound } from "@/components/wound";
import { Suite } from "@/components/suite";
import { TriagemSpotlight } from "@/components/triagem-spotlight";
import { Telemetry } from "@/components/telemetry";
import { PrivacyAct } from "@/components/privacy-act";
import { Safety } from "@/components/safety";
import { MidCta } from "@/components/mid-cta";
import { InvestmentReframe } from "@/components/investment-reframe";
import { Manifesto } from "@/components/manifesto";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="world-bg" aria-hidden="true" />
      <FluxStage />
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <StickyCta />
      <Nav />

      {/* Funil: promessa → dor → produto → prova/segurança → valor → planos → ação */}
      <Hero />
      <TrustBar />
      <Wound />
      <Suite />
      <TriagemSpotlight />
      <Telemetry />
      <PrivacyAct />
      <Safety />
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
