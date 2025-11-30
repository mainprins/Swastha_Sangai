import HeroSection from "../components/HeroSection"
import { FeatureDescription } from "../components/FeatureDescription"
import Navbar from "../components/Navbar"


function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureDescription
        badge="✨ Your User Fitness Profile"
        heading="Personalized Insights for Better Performance"
        description="A quick overview of your health, activity level, and fitness goals—crafted to help you track progress and personalize your fitness journey."
        buttons={{
          secondary: {
            text: "Get Started",
            url: "https://www.shadcnblocks.com"
          }
        }}
        image={{
          src: "/feature-1-image.jpg",
          alt: "A muscular man running down the streets."
        }}
      />
      <FeatureDescription
        badge="🎥 Seamless Video Calling"
        heading="Connect Clearly, Anytime, Anywhere"
        reverse={true}
        description="Experience smooth, high-quality video calls designed to keep you connected with friends, family, and teams—no matter the distance."
        buttons={{
          secondary: {
            text: "Start a Call",
            url: "https://www.shadcnblocks.com"
          }
        }}
        image={{
          src: "/feature-2-image.jpg",
          alt: "Person."
        }}
      />

    </>
  )
}

export default App