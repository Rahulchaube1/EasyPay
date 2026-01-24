import React, { useState } from 'react';
import { useLanguage } from '../App';

const Sidebar = ({ isOpen, onClose, navigate }) => {
    const { language, setLanguage, t } = useLanguage();
    const [showLangMenu, setShowLangMenu] = useState(false);

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    ];

    // Prevent scrolling when sidebar is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setShowLangMenu(false); // Reset to main menu
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div id="sidebar-overlay" className="absolute inset-0 z-[100] flex">
            {/* Backdrop / Overlay area - click to close */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
                onClick={onClose}
            ></div>

            {/* Sidebar Panel - Slides in from left */}
            <div className="relative z-10 w-[85%] max-w-[320px] h-full bg-slate-50 dark:bg-slate-900 shadow-2xl flex flex-col animate-[slideInLeft_0.3s_ease-out] border-r border-white/10">

                {/* 1. Profile / Header Space */}
                <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden shrink-0">
                    {/* Abstract Shapes */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-white/20 shadow-lg flex items-center justify-center text-indigo-600 text-2xl font-black">
                                RC
                            </div>
                            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-indigo-700 rounded-full"></div>
                        </div>
                        <div className="text-white">
                            <h2 className="font-bold text-lg leading-tight">Rahul Chaube</h2>
                            <p className="text-[11px] opacity-80 font-medium">+91 96944 55322</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white font-bold backdrop-blur-sm">{t('pro_user')}</span>
                                <i className="fa-solid fa-chevron-right text-[10px] opacity-70"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Quick Actions Grid */}
                <div className="grid grid-cols-4 gap-2 p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    {[
                        { icon: 'fa-qrcode', label: t('my_qr'), action: () => navigate('my-qr') },
                        { icon: 'fa-wallet', label: t('balance'), action: () => navigate('bank') },
                        { icon: 'fa-gift', label: t('rewards'), action: () => navigate('rewards') },
                        { icon: 'fa-gear', label: t('settings'), action: () => navigate('more') }
                    ].map((item, i) => (
                        <div key={i} onClick={() => { item.action(); onClose(); }} className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                <i className={`fa-solid ${item.icon} text-sm`}></i>
                            </div>
                            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight min-h-[14px]">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* 3. Main Menu List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-white dark:bg-slate-900 relative">

                    {!showLangMenu ? (
                        <>
                            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-2">{t('personal')}</p>
                            <MenuItem icon="fa-user" label={t('profile_settings')} desc={t('edit_details')} onClick={() => navigate('more')} onClose={onClose} />
                            <MenuItem icon="fa-building-columns" label={t('bank_accounts')} desc={t('add_check_bal')} onClick={() => navigate('bank')} onClose={onClose} />
                            <MenuItem icon="fa-credit-card" label={t('cards_wallets')} desc={t('manage_cards')} onClick={() => navigate('card-category')} onClose={onClose} />

                            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">{t('security_privacy')}</p>
                            <MenuItem icon="fa-fingerprint" label={t('app_lock')} desc={t('face_id_fingerprint')} onClick={() => { }} onClose={onClose} />
                            <MenuItem icon="fa-key" label={t('change_upi_pin')} desc={t('reset_pin')} onClick={() => navigate('pin')} onClose={onClose} />

                            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">{t('app_features')}</p>
                            <MenuItem icon="fa-robot" label={t('curefit_chat')} desc={t('ask_everestq')} color="text-indigo-500" onClick={() => navigate('chat')} onClose={onClose} />

                            {/* LANGUAGE TRIGGER */}
                            <MenuItem
                                icon="fa-language"
                                label={t('change_language')}
                                desc={languages.find(l => l.code === language)?.native || 'English'}
                                onClick={() => setShowLangMenu(true)}
                                onClose={() => { }}
                                arrow={true}
                            />

                            <MenuItem icon="fa-circle-question" label={t('help_support')} desc={t('customer_care')} onClick={() => { }} onClose={onClose} />
                        </>
                    ) : (
                        <div className="animate-[fadeIn_0.2s_ease-out]">
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <button onClick={() => setShowLangMenu(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                    <i className="fa-solid fa-arrow-left"></i>
                                </button>
                                <h3 className="font-bold text-slate-800 dark:text-white">{t('change_language')}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${language === lang.code
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        <span className="text-lg font-bold">{lang.native}</span>
                                        <span className={`text-[10px] ${language === lang.code ? 'text-indigo-200' : 'text-slate-400'}`}>{lang.name}</span>
                                        {language === lang.code && <i className="fa-solid fa-check-circle text-white mt-1"></i>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Footer / Logout */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
                    <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition">
                        <i className="fa-solid fa-power-off"></i> {t('log_out')}
                    </button>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-slate-400">EasyPe v4.2.0 ({language.toUpperCase()}) • Made with ❤️</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Helper Sub-component for Menu Items
const MenuItem = ({ icon, label, desc, onClick, onClose, color = "text-slate-600 dark:text-slate-300", arrow = false }) => (
    <div
        onClick={() => { onClick(); if (!arrow) onClose(); }}
        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
    >
        <div className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
            <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-700 dark:text-white leading-tight">{label}</h4>
            <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
        </div>
        <i className={`fa-solid fa-chevron-right text-xs text-slate-300 ${arrow ? 'group-hover:translate-x-1 transition-transform' : ''}`}></i>
    </div>
);

export default Sidebar;