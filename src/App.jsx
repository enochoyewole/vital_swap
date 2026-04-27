import Navbar from "./components/Navbar";
import VitalSwapHero from "./components/VitalSwapHero";
import CalculatorSection from "./components/CalculatorSection";
import VirtualCardSection from "./components/VirtualCardSection";
import FeesSection from "./components/FeesSection";
import FAQSection from "./components/FAQSection";
import ReferralSection from "./components/ReferralSection";
import CustomerStories from "./components/CustomerStories";
import TrustSection from "./components/TrustSection";
import ChatAssistant from "./components/ChatAssistant";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import FeeStructureSection from "./components/FeeStructureSection"; 

function App() {
  return (
    <div>
      <Navbar />
      <VitalSwapHero />
       <div id="features"><FeeStructureSection /></div>
       <div id="calculator"><CalculatorSection /></div>
       <VirtualCardSection />
       <div id="pricing"><FeesSection /></div>
       <div id="faqs"><FAQSection /></div>      
      <ReferralSection />
      <CustomerStories />
      <TrustSection />
      <ChatAssistant />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;