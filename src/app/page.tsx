import AboutSection from "@/components/home/about";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="relative w-screen">
      <Hero />
      <AboutSection />
    </div>
  );
}
