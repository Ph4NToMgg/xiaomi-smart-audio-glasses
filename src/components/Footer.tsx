import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#060609]/95 backdrop-blur-2xl border-t border-zinc-800/80 py-16 text-zinc-300 font-mono text-xs shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          {/* Brand Left */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-extrabold font-heading text-base shadow-[0_0_15px_rgba(255,199,0,0.4)]">
                mi
              </div>
              <span className="text-base font-bold text-white font-heading tracking-wide">
                Xiaomi Smart Audio Glasses
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Mijia Smart Eyewear Division. Crafting the future of open-ear audio technology with high-precision optics and featherlight ergonomics.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-yellow-400 font-bold mb-3 uppercase tracking-widest text-[11px]">Product</h4>
              <ul className="space-y-2 text-zinc-300 font-medium">
                <li><a href="#story-animation" className="hover:text-yellow-400 transition-colors">Storytelling</a></li>
                <li><a href="#acoustics" className="hover:text-yellow-400 transition-colors">Acoustic Engine</a></li>
                <li><a href="#frames" className="hover:text-yellow-400 transition-colors">Frame Styles</a></li>
                <li><a href="#gestures" className="hover:text-yellow-400 transition-colors">Touch Controls</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-yellow-400 font-bold mb-3 uppercase tracking-widest text-[11px]">Support</h4>
              <ul className="space-y-2 text-zinc-300 font-medium">
                <li><a href="#specs" className="hover:text-yellow-400 transition-colors">Tech Specs</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">User Manual (PDF)</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Xiaomi Earbuds App</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Warranty & Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-yellow-400 font-bold mb-3 uppercase tracking-widest text-[11px]">Global</h4>
              <ul className="space-y-2 text-zinc-300 font-medium">
                <li><a href="https://www.mi.com/global/product/xiaomi-smart-audio-glasses/" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">Mi Global Official</a></li>
                <li><a href="https://www.mi.com/kz-ru/product/mijia-smart-audio-glasses/" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">Mi Kazakhstan</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Xiaomi Inc. All rights reserved. Mijia Smart Audio Eyewear.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-300 hover:text-yellow-400 transition-colors px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 font-bold backdrop-blur-md cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-yellow-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
