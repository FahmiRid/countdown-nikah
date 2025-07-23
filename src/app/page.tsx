"use client";

import { useState, useEffect } from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FloatingHeartProps {
  delay: number;
  duration: number;
  size: string;
  opacity: number;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({ delay, duration, size, opacity }) => (
  <div 
    className={`absolute animate-bounce heart-float ${size} text-pink-300`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity: opacity,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  >
    ❤️
  </div>
);

interface CountdownItemProps {
  label: string;
  value: number;
  color: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ label, value, color }) => (
  <div className="group transform hover:scale-110 transition-all duration-300">
    <div className={`bg-gradient-to-br ${color} p-6 md:p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-4xl md:text-6xl font-bold mb-2 animate-pulse">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  </div>
);

export default function NikahCountdown(): JSX.Element {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate: number = new Date('2025-08-23T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now: number = new Date().getTime();
      const difference: number = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems: CountdownItemProps[] = [
    { label: 'Days', value: timeLeft.days, color: 'from-rose-500 to-pink-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-pink-500 to-purple-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-purple-500 to-rose-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-rose-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Hearts */}
        {Array.from({ length: 15 }, (_, i) => (
          <FloatingHeart 
            key={i}
            delay={i * 0.5}
            duration={3 + (i % 3)}
            size={i % 3 === 0 ? 'text-2xl' : i % 3 === 1 ? 'text-lg' : 'text-sm'}
            opacity={0.3 + (i % 3) * 0.2}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        
        {/* Header with Animation */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="text-rose-500 animate-pulse" size={40} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Our Nikah Day
            </h1>
            <Heart className="text-rose-500 animate-pulse" size={40} />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-rose-400" size={24} />
            <p className="text-2xl md:text-3xl font-semibold text-rose-700">
              23 August 2025
            </p>
          </div>
          
          <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-bold text-lg md:text-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            #KESHAYANGANFAHMI
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {countdownItems.map((item, index) => (
            <div key={item.label} style={{ animationDelay: `${index * 0.2}s` }}>
              <CountdownItem {...item} />
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
            <Clock className="text-rose-400 mx-auto mb-4" size={32} />
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
              &quot;Dan Segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah). 
              <br />
              <span className="text-rose-600 font-semibold">
                Surah Az-Zariyat Ayat 49&quot;
              </span>
            </p>
          </div>
        </div>

        {/* Footer with romantic quote */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-rose-600 text-lg font-medium mb-4">
            &quot;Love is not about how many days, months, or years you have been together...&quot;
          </p>
          <p className="text-rose-500 text-base">
            &quot;It&apos;s about how much you love each other every single day.&quot;
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes heart-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .heart-float {
          animation: heart-float 4s ease-in-out infinite;
        }
        
        /* Glassmorphism effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
