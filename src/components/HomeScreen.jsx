import React, { useState } from 'react';
import { useLanguage } from '../App';

const HomeScreen = ({ navigate, openScan, openPaySelect, fillPayment, checkBalanceInit, showToast }) => {
    const { t } = useLanguage();
    // 1. Promo / Ads Banner State
    const [activeAd, setActiveAd] = useState(0);
    const ads = [
        { id: 1, title: 'Get iPad Pro', sub: 'Win every Sunday', cta: 'Play Now', bg: 'from-pink-500 to-rose-500', img: 'fa-gift', note: 'Sponsored' },
        { id: 2, title: 'Loan in 5 mins', sub: 'Zero Paperwork', cta: 'Apply', bg: 'from-blue-600 to-indigo-600', img: 'fa-sack-dollar', note: 'Partner' },
        { id: 3, title: 'Dubai Trip', sub: 'Cashback Offer', cta: 'Book', bg: 'from-amber-400 to-orange-500', img: 'fa-plane', note: 'Deal' }
    ];

    return (
        <div id="screen-home" className="screen bg-slate-50 min-h-screen pb-32">

            {/* 1. Modern Header & Search */}
            <div className="bg-slate-900 pb-10 pt-4 px-5 rounded-b-[40px] relative z-0">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"></i>
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        className="w-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl py-3.5 pl-12 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition shadow-inner"
                    />
                    <div className="absolute right-2 top-2 p-1.5 bg-slate-700/50 rounded-lg text-slate-300">
                        <i className="fa-solid fa-qrcode"></i>
                    </div>
                </div>

                {/* KPI Cards (UPI Lite + Balance) */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    <div className="min-w-[150px] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3 text-white shadow-lg flex flex-col justify-between h-24 relative overflow-hidden group hover:scale-[1.02] transition">
                        <div className="absolute top-0 right-0 p-3 opacity-20 text-3xl"><i className="fa-solid fa-bolt"></i></div>
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{t('upi_lite')}</p>
                        <div>
                            <h4 className="font-bold text-lg">₹850</h4>
                            <p className="text-[9px] opacity-90">{t('one_tap_payment')}</p>
                        </div>
                    </div>

                    <div onClick={checkBalanceInit} className="min-w-[150px] bg-slate-800 rounded-2xl p-3 text-white shadow-lg flex flex-col justify-between h-24 relative overflow-hidden group cursor-pointer active:scale-95 transition">
                        <div className="absolute top-0 right-0 p-3 opacity-20 text-3xl"><i className="fa-solid fa-building-columns"></i></div>
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SBI Bank</p>
                            <i className="fa-solid fa-rotate text-xs text-slate-500 group-hover:animate-spin"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{t('check_bal')}</h4>
                            <p className="text-[9px] text-slate-400">.... 8832</p>
                        </div>
                    </div>

                    <div className="min-w-[120px] bg-white/10 backdrop-blur-sm border border-white/5 rounded-2xl p-3 text-white flex flex-col justify-center items-center gap-2 h-24 cursor-pointer hover:bg-white/20 transition" onClick={() => navigate('rewards')}>
                        <i className="fa-solid fa-gift text-2xl text-pink-400 animate-[bounce_2s_infinite]"></i>
                        <p className="text-[10px] font-bold">{t('rewards')}</p>
                    </div>
                </div>
            </div>

            {/* 2. Quick Actions Grid (Glassmorphism overlap) */}
            <div className="px-5 -mt-6 relative z-10">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100 grid grid-cols-4 gap-y-6">
                    {[
                        { icon: 'fa-qrcode', color: 'text-indigo-600', bg: 'bg-indigo-50', label: t('scan'), action: openScan },
                        { icon: 'fa-address-book', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', label: t('to_contact'), action: openPaySelect },
                        { icon: 'fa-building-columns', color: 'text-teal-600', bg: 'bg-teal-50', label: t('to_bank'), action: () => navigate('bank') },
                        { icon: 'fa-arrow-right-arrow-left', color: 'text-orange-600', bg: 'bg-orange-50', label: t('self'), action: () => showToast('Self Transfer') },
                        { icon: 'fa-mobile-screen', color: 'text-blue-600', bg: 'bg-blue-50', label: t('recharge'), action: () => navigate('all-services') },
                        { icon: 'fa-bolt', color: 'text-yellow-600', bg: 'bg-yellow-50', label: t('bills'), action: () => navigate('all-services') },
                        { icon: 'fa-chart-line', color: 'text-emerald-600', bg: 'bg-emerald-50', label: t('invest'), action: () => navigate('investment') },
                        { icon: 'fa-ellipsis', color: 'text-slate-500', bg: 'bg-slate-100', label: t('more'), action: () => navigate('more') },
                    ].map((item, i) => (
                        <div key={i} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
                            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition duration-300`}>
                                <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Ads & Branding Section */}
            <div className="px-5 mt-8">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">{t('for_you')}</h3>
                    <div className="flex gap-1">
                        {ads.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${activeAd === i ? 'w-4 bg-slate-800' : 'w-1.5 bg-slate-300'}`}></div>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4">
                    {ads.map((ad, i) => (
                        <div key={ad.id} className="min-w-full snap-center">
                            <div className={`bg-gradient-to-r ${ad.bg} rounded-3xl p-5 text-white relative overflow-hidden shadow-lg transform transition hover:scale-[1.01]`}>
                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-10 -translate-x-5"></div>

                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-md uppercase tracking-wide">{ad.note}</span>
                                        <h3 className="text-xl font-bold mt-1 pr-10">{ad.title}</h3>
                                        <p className="text-xs opacity-90">{ad.sub}</p>
                                        <button className="mt-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 transition">{ad.cta}</button>
                                    </div>
                                    <div className="text-5xl opacity-90 drop-shadow-md pb-4 pr-2">
                                        <i className={`fa-solid ${ad.img} animate-[tada_3s_infinite]`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. My Cards Redesign */}
            <div className="px-5 mt-8">
                <h3 className="font-bold text-slate-800 text-sm mb-4">{t('cards_wallets')}</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide px-1 pb-4">
                    {[
                        { type: 'debit', label: 'HDFC Debit', num: '**** 8821', theme: 'from-slate-800 to-black', icon: 'fa-cc-visa' },
                        { type: 'credit', label: 'Amex Platinum', num: '**** 1029', theme: 'from-indigo-600 to-blue-700', icon: 'fa-cc-amex' },
                        { type: 'prepaid', label: 'Travel Card', num: '**** 4432', theme: 'from-teal-500 to-emerald-600', icon: 'fa-wallet' },
                    ].map((card, i) => (
                        <div key={i} onClick={() => navigate('card-category', { type: card.type })} className={`min-w-[160px] h-28 rounded-3xl bg-gradient-to-br ${card.theme} p-4 text-white shadow-xl relative overflow-hidden group hover:-translate-y-1 transition duration-300 cursor-pointer`}>
                            {/* Card Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="w-8 h-5 bg-yellow-200/80 rounded shadow-sm"></div>
                                <i className={`fa-brands ${card.icon} text-2xl opacity-90`}></i>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] opacity-70 uppercase tracking-widest">{card.label}</p>
                                <p className="font-mono font-bold text-sm tracking-widest mt-1">{card.num}</p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    <div className="min-w-[60px] h-28 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 cursor-pointer hover:bg-slate-50 transition">
                        <i className="fa-solid fa-plus text-xl bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full"></i>
                        <span className="text-[9px] font-bold">Add</span>
                    </div>
                </div>
            </div>

            {/* 5. Peoples (Recent) */}
            <div className="px-5 mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Recent People</h3>
                    <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center text-indigo-500 bg-indigo-50">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">New</span>
                    </div>
                    {['Mom', 'Alex', 'Rohan', 'Sarah', 'Driver', 'Maid', 'Shop'].slice(0, 7).map((name, i) => (
                        <div key={i} onClick={() => fillPayment(name, `${name.toLowerCase()}@upi`)} className="flex flex-col items-center gap-1 cursor-pointer group">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                                className="w-14 h-14 rounded-full border-2 border-slate-100 shadow-sm group-hover:scale-110 transition bg-white"
                            />
                            <span className="text-[10px] font-medium text-slate-600">{name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Smart Suggestions (New Features) */}
            <div className="px-5 mt-8 mb-6">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Suggested for You</h3>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-slate-800">Bill Due Soon</h4>
                                <p className="text-[10px] text-slate-500">Electricity Bill ₹1,240 due in 2 days</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 bg-slate-900 text-white text-[10px] rounded-lg font-bold">Pay</button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-slate-800">Investment Tip</h4>
                                <p className="text-[10px] text-slate-500">Gold prices drop by 2%. Buy now?</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] rounded-lg font-bold" onClick={() => navigate('investment')}>View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;