import { ThemeProvider } from "../ThemeProvider";
import Hero from "../Hero";

export default function HeroExample() {
  return (
    <ThemeProvider>
      <div className="pt-16">
        <Hero onGetStarted={() => console.log("Get started clicked")} />
      </div>
    </ThemeProvider>
  );
}
