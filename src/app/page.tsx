import { Hero } from "@/components/Landing/Hero";
import { FeatureShowcase } from "@/components/Landing/FeatureShowcase";
import { HowItWorks } from "@/components/Landing/HowItWorks";
import { LearningPathsPreview } from "@/components/Landing/LearningPathsPreview";
import { RankingsAndProgress } from "@/components/Landing/RankingsAndProgress";
import { Community } from "@/components/Landing/Community";
import { FAQ } from "@/components/Landing/FAQ";
import { FinalCTA } from "@/components/Landing/FinalCTA";
import { Footer } from "@/components/Landing/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <HowItWorks />
      <LearningPathsPreview />
      <RankingsAndProgress />
      <Community />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
