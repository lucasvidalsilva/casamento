import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cream to-sage-light flex items-center justify-center relative overflow-hidden">
      
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-dancing text-sage-dark mb-12">
            Vamos nos casar!
          </h1>
        </div>
        
        <div className="mb-12">
          <div className="text-6xl md:text-7xl lg:text-8xl font-dancing text-sage-dark leading-tight">
            <div className="mb-0">Lidia</div>
            <div className="text-4xl md:text-5xl lg:text-6xl opacity-60 mb-2 text-white">&</div>
            <div className="mt-[-1.5rem]">Lucas</div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-sage-medium italic leading-relaxed">
            "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito."
          </p>
          <p className="text-base md:text-lg text-sage-medium mt-2 font-bold">
            – Colossenses 3:14
          </p>
        </div>
        
        <div className="text-2xl md:text-3xl font-dancing text-sage-dark">
          13 . 09 . 2025
        </div>
      </div>
  
    </section>
  );
};

export default HeroSection;