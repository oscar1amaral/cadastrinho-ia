import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5 py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-xl overflow-hidden relative">
             <div className="absolute inset-0 bg-primary/5 animate-pulse-slow"></div>
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A7v-n8S1976X3R9fGg090f-eN3T9m6o69w&s" alt="Pigz IA Logo" className="relative w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">Pigz <span className="text-primary italic">IA</span></span>
            <div className="h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-500"></div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-medium text-lavender-200/50 hover:text-white transition-colors">Sobre</a>
          <a href="#" className="text-sm font-medium text-lavender-200/50 hover:text-white transition-colors">Galeria</a>
          <a href="#" className="text-sm font-medium text-lavender-200/50 hover:text-white transition-colors">Suporte</a>
          <button className="px-6 py-2 rounded-full border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-all">
            Entrar
          </button>
        </nav>
        
        {/* Mobile menu simple icon */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;