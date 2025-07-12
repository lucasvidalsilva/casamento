import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2025-09-13T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-dancing text-center text-sage-dark mb-12">
          Contagem Regressiva
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-sage-light/30 text-center min-w-[100px] md:min-w-[120px]"
            >
              <div className="text-3xl md:text-4xl font-bold text-sage-dark mb-2">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sage-medium text-sm md:text-base capitalize font-medium">
                {unit === 'days' ? 'Dias' : 
                 unit === 'hours' ? 'Horas' : 
                 unit === 'minutes' ? 'Minutos' : 'Segundos'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;