import React from 'react';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import StorySection from './components/StorySection';
import GiftListSection from './components/GiftListSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CountdownTimer />
      <StorySection />
      <GiftListSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}

export default App;