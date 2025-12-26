import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QRGenerator from "@/components/QRGenerator";
import HowItWorks from "@/components/HowItWorks";
import Examples from "@/components/Examples";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToGenerator = () => {
    const generator = document.getElementById("generator");
    generator?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main>
        <Hero onGetStarted={scrollToGenerator} />
        <QRGenerator />
        <HowItWorks />
        <Examples />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
