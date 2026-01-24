import React, { useState, useRef } from 'react';

const MoreScreen = ({ navigate, toggleTheme, currentTheme, userProfile, setUserProfile }) => {
    const isDark = currentTheme === 'dark';
    // Fallback to local state if props are missing (for safety)
    const [localUserImage, setLocalUserImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul");
    const [localUserName, setLocalUserName] = useState("Rahul Chaube");

    const image = userProfile?.avatar || localUserImage;
    const name = userProfile?.name || localUserName;

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = reader.result;
                if (setUserProfile) {
                    setUserProfile(prev => ({ ...prev, avatar: newImage }));
                } else {
                    setLocalUserImage(newImage);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const menuItems = [
        {
            title: 'Financial Tools',
            items: [
                { icon: 'fa-piggy-bank', color: 'text-pink-500', label: 'My Savings (Emergency)', action: () => navigate('mysaving') },
                { icon: 'fa-building-columns', color: 'text-blue-600', label: 'Linked Bank Accounts', action: () => navigate('bank') },
            ]
        },
        {
            title: 'Account & Security',
            items: [
                { icon: 'fa-user-shield', color: 'text-indigo-500', label: 'Profile Settings', action: () => { } },
                { icon: 'fa-fingerprint', color: 'text-emerald-500', label: 'Biometric Login', action: () => { }, toggle: true, defaultState: true },
                { icon: 'fa-lock', color: 'text-rose-500', label: 'Change PIN', action: () => navigate('pin') },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { icon: 'fa-bell', color: 'text-amber-500', label: 'Notifications', action: () => { }, toggle: true, defaultState: true },
                { icon: 'fa-language', color: 'text-blue-500', label: 'Language', sub: 'English' },
                // Theme Toggle built-in separately, but could be here. I'll make a special card for it.
            ]
        },
        {
            title: 'Advanced',
            items: [
                { icon: 'fa-file-invoice-dollar', color: 'text-teal-500', label: 'Scheduled Payments', action: () => { } },
                { icon: 'fa-chart-pie', color: 'text-purple-500', label: 'Data Export', action: () => { } },
                { icon: 'fa-users-gear', color: 'text-cyan-500', label: 'Manage Beneficiaries', action: () => { } }
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: 'fa-headset', color: 'text-slate-500', label: 'Help Center', action: () => { } },
                { icon: 'fa-circle-info', color: 'text-slate-500', label: 'About EasyPe', sub: 'v2.4.0' }
            ]
        }
    ];

    return (
        <div id="screen-more" className="screen min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors duration-300">

            {/* Header / Profile Card */}
            <div className="pt-6 px-5 mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="font-bold text-2xl text-slate-800 dark:text-white">Settings</h2>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-10 -translate-x-5"></div>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                            <img src={image} className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/10 object-cover" alt="Profile" />
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <i className="fa-solid fa-camera text-white text-lg"></i>
                            </div>
                            <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-indigo-700 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{name}</h3>
                            <p className="text-indigo-100 text-xs">+91 98765 43210</p>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-medium backdrop-blur-sm">PRO Member</span>
                                <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-medium text-emerald-100 backdrop-blur-sm">Verified</span>
                            </div>
                        </div>

                        {/* QR Code Action */}
                        <button onClick={() => navigate('my-qr')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition shadow-lg border border-white/10">
                            <i className="fa-solid fa-qrcode text-white"></i>
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                        <button onClick={() => fileInputRef.current.click()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Special Feature: Theme Switcher Card */}
            <div className="px-5 mb-6">
                <div onClick={toggleTheme} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between cursor-pointer group hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-orange-500/10 text-orange-500'}`}>
                            <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'} animate-[spin_10s_linear_infinite_paused] group-hover:animate-spin`}></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">App Appearance</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</p>
                        </div>
                    </div>
                    <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 relative ${isDark ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            </div>

            {/* Menu List */}
            <div className="px-5 space-y-6">
                {menuItems.map((section, titleIdx) => (
                    <div key={titleIdx}>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 ml-1">{section.title}</h3>
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            {section.items.map((item, idx) => (
                                <div key={idx} onClick={item.action} className={`p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-700/50 transition-colors ${idx !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-700/50' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-9 h-9 rounded-full ${item.color.replace('text-', 'bg-')}/10 flex items-center justify-center ${item.color}`}>
                                            <i className={`fa-solid ${item.icon}`}></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200">{item.label}</h4>
                                            {item.sub && <p className="text-[10px] text-slate-400">{item.sub}</p>}
                                        </div>
                                    </div>

                                    {item.toggle ? (
                                        <div className={`w-10 h-6 rounded-full p-1 relative ${item.defaultState ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition ${item.defaultState ? 'translate-x-4' : ''}`}></div>
                                        </div>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right text-xs text-slate-300 dark:text-slate-600"></i>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="w-full py-4 text-rose-500 font-bold text-sm bg-rose-50 dark:bg-rose-900/10 rounded-2xl hover:bg-rose-100 dark:hover:bg-rose-900/20 transition mb-6">
                    Log Out
                </button>

                <div className="flex flex-col items-center gap-2 pb-6 opacity-30">
                    <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">EP</div>
                    <p className="text-[10px] font-bold text-slate-500">EasyPe Secure • Made for India</p>
                </div>
            </div>

        </div>
    );
};

export default MoreScreen;