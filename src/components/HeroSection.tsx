import React from 'react';
import { Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cream to-sage-light flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 border-2 border-sage-medium rounded-full"></div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20">
        <div className="w-16 h-16 border-2 border-sage-medium rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-10 opacity-10">
        <Heart size={40} className="text-sage-medium" />
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-dancing text-sage-dark mb-12">
            Vamos nos casar!
          </h1>
        </div>
        
        <div className="mb-12">
          <div className="text-6xl md:text-7xl lg:text-8xl font-dancing text-sage-dark leading-tight">
            <div className="mb-2">Lidia</div>
            <div className="text-4xl md:text-5xl lg:text-6xl opacity-60 mb-2">&</div>
            <div>Lucas</div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-sage-medium italic leading-relaxed">
            "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito."
          </p>
          <p className="text-base md:text-lg text-sage-medium mt-2">
            – Colossenses 3:14
          </p>
        </div>
        
        <div className="text-2xl md:text-3xl font-dancing text-sage-dark">
          13 . 09 . 2025
        </div>
      </div>
      
      {/* Scroll indicator */}
    </section>
  );
};

export default HeroSection;