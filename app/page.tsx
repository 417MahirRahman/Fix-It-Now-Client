import { CategoriesSection } from "./(HomePageSections)/CategorySection";
import { FAQ } from "./(HomePageSections)/FAQ";
import { Hero } from "./(HomePageSections)/HeroSection";
import { HowItWorks } from "./(HomePageSections)/How-It-Works";
import { OurMission } from "./(HomePageSections)/OurMission";
import { ServicesSection } from "./(HomePageSections)/ServiceSection";
import { TechniciansSection } from "./(HomePageSections)/TechnicianSection";

export default function HomePage() {
  return (
   <div>
    <Hero />
    <TechniciansSection/>
    <CategoriesSection/>
    <ServicesSection/>
    <HowItWorks/>
    <OurMission/>
    <FAQ/>
   </div>
  );
}
