import React, { useContext } from 'react';
import { useLanguage } from '../App';

const Header = ({ toggleMenu, activateVoice, navigate, userProfile }) => {
  const { t } = useLanguage();

  const firstName = userProfile?.name ? userProfile.name.split(' ')[0] : 'User';

  return (
    <header id="app-header" className="px-4 py-3 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-between items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl z-40 absolute left-0 w-full top-0 border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">

      {/* LEFT: Branding + Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
          <span className="font-extrabold text-2xl italic tracking-tighter bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm hover:scale-105 transition-transform">EasyPay</span>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5 sm:mx-1"></div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
          <img
            src={userProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"}
            alt="User"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5"
          />
          <div className="hidden min-[400px]:block leading-tight">
            <p className="text-[8px] text-slate-400 font-bold uppercase">Hello,</p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{firstName}</p>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Voice */}
        <button onClick={activateVoice} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 active:scale-90 transition-transform">
          <i className="fa-solid fa-microphone text-sm"></i>
        </button>

        {/* Notification */}
        <button onClick={() => navigate('notification')} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm relative active:scale-90 transition-transform">
          <i className="fa-regular fa-bell"></i>
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        {/* Menu */}
        <button onClick={toggleMenu} className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center active:scale-90 transition-transform">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

    </header>
  );
};

export default Header;
