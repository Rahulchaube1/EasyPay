import React, { useState, useEffect, useRef } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DebitCardDetailsScreen = ({ navigate, showToast }) => {
    const [activeTab, setActiveTab] = useState('Payment');
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const chatEndRef = useRef(null);

    const spendData = {
        labels: ['Shopping', 'Food', 'Travel', 'Bills'],
        datasets: [{
            data: [4500, 3200, 1500, 2100],
            backgroundColor: ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'],
            borderWidth: 0,
            borderRadius: 5,
        }]
    };

    const locationData = [
        { place: 'Starbucks', amount: '₹450', loc: 'Connaught Place, Delhi', time: 'Yesterday', cat: 'food' },
        { place: 'Amazon India', amount: '₹1,299', loc: 'Online', time: '2 days ago', cat: 'shopping' },
        { place: 'Uber Trip', amount: '₹340', loc: 'Gurugram -> Noida', time: '3 days ago', cat: 'travel' }
    ];

    const openChat = () => {
        setShowChat(true);
        if (chatMessages.length === 0) {
            setChatMessages([{ type: 'bot', text: "Hi! I'm EverestQ. I can help analyze your HDFC Platinum card spending. Try asking 'Where did I spend the most?'" }]);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;
        setChatMessages([...chatMessages, { type: 'user', text: inputMsg }]);
        setInputMsg('');
        setTimeout(() => {
            setChatMessages(prev => [...prev, { type: 'bot', text: `Based on your card history, you spent ₹4,500 on Shopping this month, mostly at Amazon and Myntra. This is 10% higher than last month.` }]);
        }, 1500);
    };

    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages]);

    return (
        <div id="screen-debit-card-details" className="screen bg-slate-50 min-h-screen relative pb-28">

            {/* 1. Header Section (Dark) */}
            <div className="bg-slate-900 pt-8 pb-32 px-5 rounded-b-[40px] relative z-0">
                <div className="flex justify-between items-center mb-6 text-white">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manage Card</span>
                        <h2 className="font-bold text-lg">HDFC Bank</h2>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {/* Toggle Pills */}
                <div className="bg-slate-800 p-1 rounded-2xl flex max-w-[280px] mx-auto mb-4">
                    <button
                        onClick={() => setActiveTab('Payment')}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'Payment' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Payments
                    </button>
                    <button
                        onClick={() => setActiveTab('Deposit')}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'Deposit' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Deposit
                    </button>
                </div>
            </div>

            {/* 2. Floating Card Visualization */}
            <div className="px-5 -mt-24 relative z-10 perspective-1000">
                <div className="w-full aspect-[1.58/1] rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-900 p-6 text-white shadow-2xl relative overflow-hidden card-shine transform transition hover:scale-105 duration-500 animate-[fadeInUp_0.6s_ease-out]">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-xs font-medium opacity-80">Debit Card</p>
                            <p className="font-bold text-lg tracking-wide">HDFC BANK</p>
                        </div>
                        <i className="fa-brands fa-cc-visa text-4xl opacity-90"></i>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="space-x-1 flex">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white opacity-50"></div>)}
                        </div>
                        <div className="space-x-1 flex">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white opacity-50"></div>)}
                        </div>
                        <div className="space-x-1 flex">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white opacity-50"></div>)}
                        </div>
                        <span className="font-mono text-xl font-bold tracking-widest pl-1">4827</span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[9px] opacity-70 uppercase mb-0.5">Card Holder</p>
                            <p className="font-bold tracking-wider text-sm">JONATHAN COOPER</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] opacity-70 uppercase mb-0.5">Valid Till</p>
                            <p className="font-bold text-sm">11/28</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Transaction History */}
            <div className="px-5 mt-6">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Recent Transaction</h3>
                    <span className="text-[10px] font-bold text-indigo-600">See All</span>
                </div>

                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
                    {[
                        { name: 'Jesse Brooks', time: 'Today, 10:43 AM', amt: '-₹500', img: 'Jesse', type: 'sent' },
                        { name: 'Eric Ray', time: '12 Feb 2024', amt: '-₹1,200', img: 'Eric', type: 'sent' },
                        { name: 'Salary Corp', time: '10 Feb 2024', amt: '+₹45,000', img: 'Liliana', type: 'received' },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.img}`} className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50" />
                                <div>
                                    <p className="font-bold text-sm text-slate-800">{t.name}</p>
                                    <p className="text-[10px] text-slate-400">{t.time}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${t.type === 'received' ? 'text-green-500' : 'text-slate-800'}`}>
                                {t.amt}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Payment Analysis (Viz) */}
            <div className="px-5 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Spending Pulse</h3>
                    <button onClick={openChat} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        <i className="fa-solid fa-wand-magic-sparkles"></i> Analyze
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
                    <div className="h-44">
                        <Bar
                            data={spendData}
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false } } }}
                        />
                    </div>
                </div>
            </div>

            {/* 5. Location Stats */}
            <div className="px-5 mt-6 mb-4">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Where You Spent</h3>
                <div className="space-y-3">
                    {locationData.map((l, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${l.cat === 'food' ? 'bg-orange-500' : l.cat === 'shopping' ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                                        <i className={`fa-solid ${l.cat === 'food' ? 'fa-mug-hot' : l.cat === 'shopping' ? 'fa-bag-shopping' : 'fa-car'}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">{l.place}</h4>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                            <i className="fa-solid fa-location-dot text-[8px] text-red-400"></i> {l.loc}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800">{l.amount}</p>
                                    <p className="text-[10px] text-slate-400">{l.time}</p>
                                </div>
                            </div>
                            {/* Map Abstract BG */}
                            <div className="absolute right-0 bottom-0 opacity-10 text-6xl text-slate-400 rotate-12 translate-x-4 translate-y-4">
                                <i className="fa-solid fa-map-location-dot"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Other Services */}
            <div className="px-5 mt-6">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Other Services</h3>
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center group-hover:scale-110 transition">
                                <i className="fa-solid fa-building-columns"></i>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">Account Balance</p>
                                <p className="text-[10px] text-slate-400">Check my account balance</p>
                            </div>
                        </div>
                        <i className="fa-solid fa-arrow-right text-slate-300 group-hover:text-slate-600 transition"></i>
                    </div>

                    <div className="w-full h-px bg-slate-50"></div>

                    <div className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
                                <i className="fa-solid fa-gauge-high"></i>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">Credit Score</p>
                                <p className="text-[10px] text-slate-400">Find your updated credit score</p>
                            </div>
                        </div>
                        <i className="fa-solid fa-arrow-right text-slate-300 group-hover:text-slate-600 transition"></i>
                    </div>
                </div>
            </div>

            {/* EVEREST Q CHAT */}
            {showChat && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full rounded-t-[30px] h-2/3 flex flex-col animate-[slideUp_0.4s_ease-out]">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-600 rounded-t-[30px] text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <i className="fa-solid fa-brain animate-pulse"></i>
                                </div>
                                <h3 className="font-bold">EverestQ <span className="text-[10px] font-normal opacity-80 block">Card Analyst</span></h3>
                            </div>
                            <button onClick={() => setShowChat(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${m.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>
                        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputMsg}
                                    onChange={(e) => setInputMsg(e.target.value)}
                                    className="w-full bg-slate-100 py-3 pl-4 pr-12 rounded-full text-xs font-medium outline-none border border-transparent focus:border-indigo-200 focus:bg-white transition"
                                    placeholder="Ask about your card spends..."
                                />
                                <button className="absolute right-1 top-1 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition">
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

export default DebitCardDetailsScreen;