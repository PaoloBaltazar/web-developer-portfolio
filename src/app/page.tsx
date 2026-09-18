import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollProgress />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
