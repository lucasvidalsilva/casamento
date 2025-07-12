import React from 'react';

const VenueSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-sage-medium to-sage-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-dancing text-cream mb-12">
            Local do Casamento
          </h2>
          
          <div className="mb-8 flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500.452468580624!2d-61.18398012433496!3d-11.675158637745488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1752188292880!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
          
          <div className="bg-cream/10 backdrop-blur-sm rounded-2xl p-6 border border-cream/20 text-center">
            <p className="text-xl md:text-2xl text-cream font-light leading-relaxed">
              Av. Costa e Silva - N°407 - Bairro Alvorada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;