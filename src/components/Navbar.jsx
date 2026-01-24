import React from 'react';
import { useLanguage } from '../App';

const Navbar = ({ activeScreen, navigate }) => {
    const { t } = useLanguage();

    return (
        <div id="navbar-container" className={`absolute bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 transition-transform duration-300 ease-in-out ${['scan', 'pin', 'success', 'pay', 'bank', 'my-qr', 'debit-card-details'].includes(activeScreen) ? 'translate-y-[200%]' : ''}`}>
            <nav className="magic-nav bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl px-2 py-2 flex justify-between items-center relative shadow-lg dark:shadow-black/50 border border-slate-100 dark:border-slate-700">
                <button onClick={() => navigate('home')} className={`nav-btn flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${activeScreen === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                    <i className={`fa-solid fa-house text-lg ${activeScreen === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}></i>
                    <span className={`text-[10px] font-medium ${activeScreen === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{t('nav_home')}</span>
                </button>
                <button onClick={() => navigate('insights')} className={`nav-btn flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${activeScreen === 'insights' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                    <i className={`fa-solid fa-chart-pie text-lg ${activeScreen === 'insights' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}></i>
                    <span className={`text-[10px] font-medium ${activeScreen === 'insights' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{t('nav_insights')}</span>
                </button>
                <div className="relative -top-8 mx-2" onClick={() => navigate('scan')}>
                    <div className="scan-float w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-400/50 dark:shadow-indigo-900/50 border-[6px] border-slate-50 dark:border-slate-900">
                        <i className="fa-solid fa-qrcode text-2xl"></i>
                    </div>
                </div>
                <button onClick={() => navigate('chat')} className={`nav-btn flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${activeScreen === 'chat' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                    <i className={`fa-solid fa-robot text-lg ${activeScreen === 'chat' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}></i>
                    <span className={`text-[10px] font-medium ${activeScreen === 'chat' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{t('nav_ask_ai')}</span>
                </button>
                <button onClick={() => navigate('history')} className={`nav-btn flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${activeScreen === 'history' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                    <i className={`fa-solid fa-clock-rotate-left text-lg ${activeScreen === 'history' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}></i>
                    <span className={`text-[10px] font-medium ${activeScreen === 'history' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{t('nav_history')}</span>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;