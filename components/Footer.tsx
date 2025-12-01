
import React from 'react';
import { content } from '../content';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 bg-slate-950 border-t border-slate-800 text-center">
      <p className="text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} {content.footer.copyright}. All rights reserved. 
        <span className="mx-2 text-slate-700">|</span>
        {content.footer.tagline}
      </p>
    </footer>
  );
};
