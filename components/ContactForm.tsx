import React, { useState } from 'react';
import { FormStatus } from '../types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);

    // Simulate API call
    setTimeout(() => {
      setStatus(FormStatus.SUCCESS);
      setFormData({ name: '', email: '', message: '' });
      // Reset success message after 3 seconds
      setTimeout(() => setStatus(FormStatus.IDLE), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Tell me about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
          placeholder="I have a concept for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === FormStatus.SUBMITTING}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg tracking-wide uppercase transition-all transform hover:-translate-y-1 ${
          status === FormStatus.SUBMITTING
            ? 'bg-slate-700 cursor-wait text-slate-400'
            : status === FormStatus.SUCCESS
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]'
        }`}
      >
        {status === FormStatus.SUBMITTING ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : status === FormStatus.SUCCESS ? (
          'Message Sent!'
        ) : (
          "Send Message"
        )}
      </button>
      
      {status === FormStatus.SUCCESS && (
        <p className="text-center text-green-400 text-sm animate-pulse">
          Thanks for reaching out! I'll get back to you shortly.
        </p>
      )}
    </form>
  );
};