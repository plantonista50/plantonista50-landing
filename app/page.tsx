import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { FluxStage } from "@/lib/scene/flux-stage";
import { Hero } from "@/components/hero";
import { PrivacyAct } from "@/components/privacy-act";
import { Telemetry } from "@/components/telemetry";
import { TrustBar } from "@/components/trust-bar";
import { Wound } from "@/components/wound";
import { InvestmentReframe } from "@/components/investment-reframe";
import { Manifesto } from "@/components/manifesto";
import { Suite } from "@/components/suite";
import { MidCta } from "@/components/mid-cta";
import { TriagemSpotlight } from "@/components/triagem-spotlight";
import { Safety } from "@/components/safety";
import { Testimonials } from "@/components/testimonials";
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
      <Hero />
      <PrivacyAct />
      <Telemetry />
      <TrustBar />
      <Wound />
      <InvestmentReframe />
      <Manifesto />
      <Suite />
      <MidCta />
      <TriagemSpotlight />
      <Safety />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
