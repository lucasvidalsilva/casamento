import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  additionalGuests: number;
}

const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    additionalGuests: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'additionalGuests' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage for demo purposes
    const savedRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
    const newRSVP = {
      ...formData,
      timestamp: new Date().toISOString(),
      totalGuests: formData.additionalGuests + 1
    };
    savedRSVPs.push(newRSVP);
    localStorage.setItem('rsvps', JSON.stringify(savedRSVPs));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-sage-medium to-sage-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-dancing text-cream mb-6">
              Presença Confirmada!
            </h2>
            <p className="text-xl text-cream/90 leading-relaxed">
              Muito obrigado por confirmar sua presença! Estamos ansiosos para celebrar este momento especial com você.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-sage-medium to-sage-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-dancing text-center text-cream mb-12">
            Confirmar sua Presença
          </h2>
          
          <form onSubmit={handleSubmit} className="bg-cream/10 backdrop-blur-sm rounded-2xl p-8 border border-cream/20">
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-cream text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage-light/30 bg-white/90 text-sage-dark placeholder-sage-medium/60 focus:outline-none focus:ring-2 focus:ring-cream/50 focus:border-cream"
                  placeholder="Digite seu nome completo"
                />
              </div>
              
              
              
              <div>
                <label htmlFor="additionalGuests" className="block text-cream text-sm font-medium mb-2">
                  Quantas pessoas virão além de você?
                </label>
                <select
                  id="additionalGuests"
                  name="additionalGuests"
                  value={formData.additionalGuests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-light/30 bg-white/90 text-sage-dark focus:outline-none focus:ring-2 focus:ring-cream/50 focus:border-cream"
                >
                  <option value={0}>Apenas eu</option>
                  <option value={1}>1 pessoa</option>
                  <option value={2}>2 pessoas</option>
                  <option value={3}>3 pessoas</option>
                  <option value={4}>4 pessoas</option>
                  <option value={5}>5 ou mais pessoas</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !formData.fullName || !formData.phone}
                className="w-full bg-cream text-sage-dark py-4 px-6 rounded-lg font-medium hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sage-dark"></div>
                    Confirmando...
                  </>
                ) : (
                  <>
                    Confirmar Presença
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;