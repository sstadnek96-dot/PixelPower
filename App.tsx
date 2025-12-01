
import React from 'react';
import { PixelHero } from './components/PixelHero';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { content } from './content';

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-slate-900 flex flex-col">
      <Header />
      
      {/* Hero Section with Interactive Canvas */}
      <section className="relative h-screen w-full overflow-hidden">
        <PixelHero />
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 drop-shadow-lg text-center tracking-tighter p-4">
            {content.hero.title}
          </h1>
          <p className="mt-4 text-slate-300 text-xl md:text-2xl font-light tracking-wide text-center max-w-2xl px-4">
            {content.hero.subtitle}
          </p>
          
          <div className="absolute bottom-10 animate-bounce">
             <svg 
              className="w-8 h-8 text-cyan-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full py-24 px-4 md:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {content.contact.title} <span className="text-cyan-400">{content.contact.highlight}</span> together.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {content.contact.subtitle}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-fuchsia-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-lg font-medium text-slate-200">{content.brand.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-yellow-400">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-lg font-medium text-slate-200">{content.brand.location}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-fuchsia-600 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default App;
