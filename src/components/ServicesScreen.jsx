import React, { useState, useEffect, useRef } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ServicesScreen = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('utilities'); // utilities, finance, subscriptions
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const chatEndRef = useRef(null);

    // Mock Data
    const upcomingBills = [
        { id: 1, name: 'Electricity Bill', provider: 'Tata Power', amount: 1540, due: '2 Days', icon: 'fa-lightbulb', color: 'bg-yellow-500' },
        { id: 2, name: 'Broadband', provider: 'Jio Fiber', amount: 999, due: '5 Days', icon: 'fa-wifi', color: 'bg-blue-500' },
    ];

    const subscriptions = [
        { name: 'Netflix Premium', cost: 649, date: '15th monthly', icon: 'N', color: 'bg-red-600' },
        { name: 'Spotify Duo', cost: 149, date: '21st monthly', icon: 'S', color: 'bg-green-500' },
        { name: 'YouTube Prem', cost: 129, date: '12th monthly', icon: 'Y', color: 'bg-red-500' }
    ];

    const spendingData = {
        labels: ['Elec', 'Mob', 'Wifi', 'Gas', 'Subs'],
        datasets: [{
            data: [45, 15, 20, 10, 10],
            backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#10b981'],
            borderWidth: 0,
            borderRadius: 5
        }]
    };

    // Chat Logic
    const openChat = (context = 'General') => {
        setShowChat(true);
        if (chatMessages.length === 0) {
            setChatMessages([{ type: 'bot', text: `Hi! I'm EverestQ. I can help you analyze your bills, find better plans, or track subscriptions. What do you need?` }]);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;
        const newMsg = { type: 'user', text: inputMsg };
        setChatMessages([...chatMessages, newMsg]);
        setInputMsg('');
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                type: 'bot',
                text: `I've analyzed your request about "${inputMsg}". You could save approx ₹450/month by switching your broadband plan. Shall I show you the options?`
            }]);
        }, 1500);
    };

    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages]);

    return (
        <div id="screen-services" className="screen min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors duration-300">

            {/* Header */}
            <div className="bg-slate-900 dark:bg-black text-white pt-[calc(1rem+env(safe-area-inset-top))] pb-6 rounded-b-[40px] shadow-2xl relative z-10">
                <div className="flex items-center justify-between px-6 mb-6 mt-2">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div>
                            <h2 className="font-black text-2xl tracking-tight">Services Hub</h2>
                            <p className="text-xs text-slate-400 font-medium">Manage Bills & Subs</p>
                        </div>
                    </div>
                    <button onClick={() => openChat('Help')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-indigo-500 hover:scale-110 transition shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        <i className="fa-solid fa-headset"></i>
                    </button>
                </div>

                {/* Insight / Smart Card */}
                <div className="mx-6 p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
                    <div className="bg-slate-900/90 backdrop-blur-xl rounded-[20px] p-5 relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fa-solid fa-wand-magic-sparkles text-yellow-400 text-xs"></i>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">EverestQ Insight</span>
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight w-3/4">"Electricity usage is 15% higher than last month."</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg animate-pulse">
                                <i className="fa-solid fa-bolt text-white text-lg"></i>
                            </div>
                        </div>
                        <button onClick={() => openChat('High Usage')} className="mt-4 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white transition flex items-center gap-2 w-max">
                            Analyze Usage <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        {/* Bg FX */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600 rounded-full blur-[50px] opacity-40"></div>
                    </div>
                </div>
            </div>

            <div className="px-5 -mt-4 relative z-20 space-y-6">

                {/* Upcoming Bills Horizontal Scroll */}
                <div>
                    <div className="flex justify-between items-center mb-3 ml-1">
                        <h3 className="font-bold text-slate-800 dark:text-white text-sm">Upcoming Due</h3>
                        <span className="text-[10px] text-indigo-500 font-bold">View All</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                        {upcomingBills.map((bill) => (
                            <div key={bill.id} className="min-w-[240px] bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${bill.color} flex items-center justify-center text-white shadow-lg shadow-black/20 text-lg`}>
                                        <i className={`fa-solid ${bill.icon}`}></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-white text-sm">{bill.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Due in {bill.due}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">₹{bill.amount}</p>
                                    <button className="text-[9px] font-bold text-indigo-100 bg-indigo-600 px-2 py-1 rounded shadow-md mt-1 hover:bg-indigo-700 transition">Pay Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Action Grid */}
                <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-center bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl mb-6">
                        {['utilities', 'finance', 'subscriptions'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-4 gap-y-6 gap-x-2 animate-[fadeIn_0.3s_ease-out]">
                        {activeTab === 'utilities' && [
                            { icon: 'fa-mobile-screen', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', name: 'Mobile' },
                            { icon: 'fa-satellite-dish', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', name: 'DTH' },
                            { icon: 'fa-lightbulb', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', name: 'Electric' },
                            { icon: 'fa-credit-card', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', name: 'CC Bill' },
                            { icon: 'fa-fire-flame-simple', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', name: 'Gas' },
                            { icon: 'fa-droplet', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20', name: 'Water' },
                            { icon: 'fa-car', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', name: 'Fastag' },
                            { icon: 'fa-graduation-cap', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20', name: 'Fees' },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 cursor-pointer group hover:scale-105 transition-transform">
                                <div className={`w-14 h-14 rounded-[20px] ${item.bg} ${item.color} flex items-center justify-center text-xl shadow-sm group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all`}>
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{item.name}</span>
                            </div>
                        ))}

                        {activeTab === 'finance' && [
                            { icon: 'fa-arrow-trend-up', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', name: 'IPO', action: () => navigate('investment') },
                            { icon: 'fa-calculator', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', name: 'SIP Calc', action: () => navigate('investment') },
                            { icon: 'fa-coins', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', name: 'Gold' },
                            { icon: 'fa-file-invoice-dollar', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', name: 'Tax' },
                            { icon: 'fa-hand-holding-dollar', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', name: 'Loan' },
                        ].map((item, index) => (
                            <div key={index} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer group hover:scale-105 transition-transform">
                                <div className={`w-14 h-14 rounded-[20px] ${item.bg} ${item.color} flex items-center justify-center text-xl shadow-sm`}>
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{item.name}</span>
                            </div>
                        ))}

                        {activeTab === 'subscriptions' && subscriptions.map((sub, i) => (
                            <div key={i} className="col-span-4 flex items-center justify-between p-3 rounded-2xl border border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${sub.color} flex items-center justify-center text-white font-black shadow-md`}>{sub.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{sub.name}</h4>
                                        <p className="text-[10px] text-slate-400">Next billing: {sub.date}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800 dark:text-white">₹{sub.cost}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Analysis Section Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white">Monthly Spending</h3>
                        <button onClick={() => openChat('Spending Analysis')} className="text-indigo-500 text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">Report</button>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <div className="w-32 h-32 relative">
                            <Doughnut data={spendingData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[10px] text-slate-400">Total</span>
                                <span className="font-black text-slate-800 dark:text-white">₹4.2k</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div> <span className="text-slate-600 dark:text-slate-400">Electricity (45%)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div> <span className="text-slate-600 dark:text-slate-400">Broadband (20%)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div> <span className="text-slate-600 dark:text-slate-400">Mobile (15%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Bill Button */}
                <button className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    <i className="fa-solid fa-plus mr-2"></i> Add New Bill
                </button>
            </div>

            {/* EverestQ Chat Overlay */}
            {showChat && (
                <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white dark:bg-slate-900 w-full rounded-t-[40px] h-[85vh] flex flex-col shadow-2xl animate-[slideUp_0.3s_ease-out]">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-600 rounded-t-[40px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                                    <i className="fa-solid fa-robot text-white text-xl animate-pulse"></i>
                                </div>
                                <div className="text-white">
                                    <h3 className="font-bold text-xl">EverestQ Services</h3>
                                    <p className="text-[10px] font-medium opacity-90 tracking-wide">AI BILL ANALYST</p>
                                </div>
                            </div>
                            <button onClick={() => setShowChat(false)} className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/30 transition relative z-10">
                                <i className="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-slate-900">
                            <div className="flex justify-center">
                                <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full font-bold">Today</span>
                            </div>
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${m.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputMsg}
                                    onChange={(e) => setInputMsg(e.target.value)}
                                    placeholder="Ask for savings tips..."
                                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all hover:bg-indigo-700">
                                    <i className="fa-solid fa-paper-plane text-xs"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesScreen;