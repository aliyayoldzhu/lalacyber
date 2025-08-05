import Header from "../components/Header";
import Hero from "../components/Hero";
import Section from "../components/Section";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Section 
        title="Clean & Minimal"
        description="Embracing simplicity through thoughtful design choices and strategic use of whitespace."
      >
        <FeatureGrid />
      </Section>
      <Footer />
    </div>
  );
};

export default Index;
