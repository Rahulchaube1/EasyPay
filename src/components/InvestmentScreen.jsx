import React, { useState, useEffect, useRef } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler
);

const InvestmentScreen = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('portfolio'); // portfolio, market, sips, ipo
    const [sipVal, setSipVal] = useState(10000);
    const [sipYr, setSipYr] = useState(5);
    const [expReturn, setExpReturn] = useState(12);

    // Chat State
    const [showChat, setShowChat] = useState(false);
    const [chatContext, setChatContext] = useState('General');
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const chatEndRef = useRef(null);

    // Mock Data for "Real-time" World Markets
    const [marketData, setMarketData] = useState([
        { symbol: 'NIFTY 50', price: '22,450.30', change: '+1.2%', up: true },
        { symbol: 'SENSEX', price: '73,890.15', change: '+0.9%', up: true },
        { symbol: 'S&P 500', price: '5,140.20', change: '-0.3%', up: false },
        { symbol: 'NASDAQ', price: '16,200.50', change: '+0.5%', up: true },
        { symbol: 'GOLD', price: '₹65,200', change: '+1.5%', up: true },
        { symbol: 'BTC/USD', price: '$68,450', change: '+2.1%', up: true },
        { symbol: 'USD/INR', price: '₹82.90', change: '-0.1%', up: false },
    ]);

    // Mock Holdings
    const holdings = [
        { name: 'HDFC Bank', qty: 50, avg: 1450, ltp: 1520, pnl: '+4.8%' },
        { name: 'Reliance', qty: 25, avg: 2300, ltp: 2950, pnl: '+28.2%' },
        { name: 'Tata Motors', qty: 100, avg: 450, ltp: 980, pnl: '+117.7%' },
        { name: 'Quant Small Cap', qty: 1500, avg: 120, ltp: 185, pnl: '+54.1%' },
    ];

    // Chart Data
    const portfolioGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Portfolio Value',
            data: [12.5, 13.2, 12.8, 14.5, 15.1, 16.8], // In Lakhs
            borderColor: '#6366f1',
            backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#6366f1',
            pointRadius: 4
        }]
    };

    const allocationData = {
        labels: ['Stocks', 'Mutual Funds', 'Gold', 'Crypto', 'Cash'],
        datasets: [{
            data: [45, 30, 10, 5, 10],
            backgroundColor: ['#6366f1', '#8b5cf6', '#f59e0b', '#ef4444', '#94a3b8'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    const sipData = {
        labels: ['Invested', 'Est. Returns'],
        datasets: [{
            data: [
                sipVal * 12 * sipYr,
                (sipVal * 12 * sipYr * (Math.pow(1 + expReturn / 100, sipYr))) - (sipVal * 12 * sipYr)
            ],
            backgroundColor: ['#cbd5e1', '#6366f1'],
            borderRadius: 8,
            barThickness: 40
        }]
    };

    // Chat Functions
    const openChat = (context) => {
        setChatContext(context);
        setShowChat(true);
        if (chatMessages.length === 0) {
            setChatMessages([{ type: 'bot', text: `Hello! I'm EverestQ. I see you're interested in ${context}. Ask me for predictions, risks, or deep analysis!` }]);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;

        const newMsg = { type: 'user', text: inputMsg };
        setChatMessages([...chatMessages, newMsg]);
        setInputMsg('');

        // Simulate AI Thinking
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                type: 'bot',
                text: `Based on technical indicators (RSI > 70) and recent ${chatContext} volume, the trend is bullish. However, watch for resistance at key levels. I recommend a "Hold" strategy for now.`
            }]);
        }, 1500);
    };

    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages]);

    return (
        <div id="screen-investment" className="screen min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors duration-300">

            {/* Header / Ticker */}
            <div className="bg-slate-900 dark:bg-black text-white pt-[calc(1rem+env(safe-area-inset-top))] pb-0 sticky top-0 z-30 shadow-2xl rounded-b-[30px]">
                <div className="flex items-center gap-4 px-5 mb-4 mt-2">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="font-bold text-xl tracking-tight">Global Markets</h2>
                    <div className="ml-auto flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                        <span className="text-[10px] font-bold text-green-400">MARKET OPEN</span>
                    </div>
                </div>

                {/* Marquee Ticker */}
                <div className="overflow-hidden whitespace-nowrap py-3 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                    <div className="inline-block animate-[marquee_25s_linear_infinite]">
                        {marketData.concat(marketData).map((m, i) => (
                            <span key={i} className="mx-6 text-xs font-mono tracking-wider">
                                <span className="font-bold text-slate-300">{m.symbol}</span>
                                <span className="ml-2 font-medium">{m.price}</span>
                                <span className={`ml-2 ${m.up ? 'text-green-400' : 'text-red-400'}`}>
                                    <i className={`fa-solid fa-caret-${m.up ? 'up' : 'down'} mr-1`}></i>
                                    {m.change}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-5 space-y-6 -mt-4 relative z-20">

                {/* Portfolio Summary Card 3D */}
                <div className="rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden group transform transition hover:scale-[1.01]" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                    {/* Glass Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Total Portfolio</p>
                            <button onClick={() => openChat('Portfolio Audit')} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition backdrop-blur-sm">
                                <i className="fa-solid fa-robot text-white"></i>
                            </button>
                        </div>
                        <h1 className="text-4xl font-black mb-6 tracking-tight">₹16.84<span className="text-2xl font-medium opacity-80">Lakh</span></h1>

                        <div className="grid grid-cols-2 gap-4 bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/5">
                            <div>
                                <p className="text-[10px] text-indigo-200 uppercase font-bold">Day's P&L</p>
                                <p className="text-green-400 font-bold text-sm flex items-center gap-1">
                                    <i className="fa-solid fa-arrow-trend-up"></i> ₹12,400 (0.8%)
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-indigo-200 uppercase font-bold">XIRR</p>
                                <p className="text-white font-bold text-sm">18.4%</p>
                            </div>
                        </div>
                    </div>
                    {/* Abstract BG */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500 rounded-full blur-[60px] opacity-40 mix-blend-screen animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400 rounded-full blur-[50px] opacity-30 mix-blend-screen"></div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-x-auto scrollbar-hide">
                    {['portfolio', 'market', 'sips', 'ipo'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 min-w-[80px] py-2.5 text-xs font-bold rounded-xl capitalize transition-all duration-300 ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- PORTFOLIO VIEW --- */}
                {activeTab === 'portfolio' && (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        {/* Performance Chart */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm relative">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Growth Analysis</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">Net Worth vs Market</p>
                                </div>
                                <select className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold py-1 px-3 rounded-lg border-none outline-none">
                                    <option>6M</option>
                                    <option>1Y</option>
                                    <option>5Y</option>
                                </select>
                            </div>
                            <div className="h-56">
                                <Line data={portfolioGrowthData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
                            </div>
                        </div>

                        {/* Holdings List */}
                        <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">Your Holdings</h3>
                                <button className="text-[10px] font-bold text-indigo-500">View All</button>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                {holdings.map((h, i) => (
                                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer group" onClick={() => openChat(`stock: ${h.name}`)}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-300 group-hover:scale-110 transition shadow-sm">
                                                {h.name.substring(0, 1)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-800 dark:text-white">{h.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">EQ</span>
                                                    <span className="text-[10px] text-slate-400">{h.qty} qty</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-slate-800 dark:text-white">₹{h.ltp}</p>
                                            <p className="text-[10px] text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-md inline-block mt-1">{h.pnl}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MARKET VIEW --- */}
                {activeTab === 'market' && (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        {/* Heatmap Mockup */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Sector Heatmap</h3>
                            <div className="grid grid-cols-3 gap-2 h-40">
                                <div className="bg-green-500 rounded-xl p-2 flex flex-col justify-between text-white col-span-1 shadow-lg shadow-green-200 dark:shadow-none">
                                    <span className="text-[10px] font-bold opacity-80">BANKING</span>
                                    <span className="text-lg font-bold">+2.4%</span>
                                </div>
                                <div className="bg-green-400 rounded-xl p-2 flex flex-col justify-between text-white col-span-1">
                                    <span className="text-[10px] font-bold opacity-80">AUTO</span>
                                    <span className="text-lg font-bold">+1.8%</span>
                                </div>
                                <div className="bg-red-500 rounded-xl p-2 flex flex-col justify-between text-white col-span-1 row-span-2">
                                    <span className="text-[10px] font-bold opacity-80">IT</span>
                                    <span className="text-lg font-bold">-1.2%</span>
                                </div>
                                <div className="bg-green-600 rounded-xl p-2 flex flex-col justify-between text-white col-span-2">
                                    <span className="text-[10px] font-bold opacity-80">ENERGY</span>
                                    <span className="text-lg font-bold">+3.1%</span>
                                </div>
                            </div>
                        </div>

                        {/* EverestQ Insights Widget */}
                        <div
                            onClick={() => openChat('Market Insights')}
                            className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-indigo-900 dark:to-indigo-800 p-5 rounded-[32px] relative overflow-hidden cursor-pointer shadow-xl"
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-brain text-indigo-400 animate-pulse"></i>
                                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">EverestQ Insight</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg leading-tight w-2/3">"Bank Nifty looking strong. Keep eye on HDFC."</h3>
                                    <p className="text-slate-400 text-xs mt-2">Tap to chat with AI Analyst</p>
                                </div>
                                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                                    <i className="fa-solid fa-arrow-right text-white text-xl -rotate-45"></i>
                                </div>
                            </div>
                        </div>

                        {/* Top Movers */}
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white mb-3 ml-1">Top Movers</h3>
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                                {marketData.map((m, i) => (
                                    <div key={i} className={`min-w-[120px] p-3 rounded-2xl border flex flex-col gap-2 ${m.up ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'}`}>
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{m.symbol}</span>
                                            {m.up ? <i className="fa-solid fa-arrow-trend-up text-green-500 text-xs"></i> : <i className="fa-solid fa-arrow-trend-down text-red-500 text-xs"></i>}
                                        </div>
                                        <span className={`text-lg font-bold ${m.up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{m.change}</span>
                                        <span className="text-[10px] text-slate-400">{m.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SIP CALCULATOR --- */}
                {activeTab === 'sips' && (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm relative animate-[fadeIn_0.5s_ease-out]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Wealth Projector</h3>
                            <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                <i className="fa-solid fa-clock-rotate-left"></i>
                            </button>
                        </div>

                        <div className="h-48 mb-8 relative">
                            <Bar
                                data={sipData}
                                options={{
                                    indexAxis: 'y',
                                    plugins: { legend: { display: false } },
                                    scales: { x: { display: false }, y: { grid: { display: false }, ticks: { color: '#94a3b8' } } },
                                    maintainAspectRatio: false,
                                    responsive: true
                                }}
                            />
                        </div>

                        <div className="space-y-8">
                            {[
                                { label: 'Monthly Investment', val: sipVal, set: setSipVal, min: 1000, max: 100000, step: 500, fmt: (v) => `₹${v.toLocaleString()}` },
                                { label: 'Duration (Years)', val: sipYr, set: setSipYr, min: 1, max: 30, step: 1, fmt: (v) => `${v} Years` },
                                { label: 'Expected Return', val: expReturn, set: setExpReturn, min: 5, max: 25, step: 1, fmt: (v) => `${v}%` }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-3">
                                        <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                                        <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-lg">{item.fmt(item.val)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={item.min}
                                        max={item.max}
                                        step={item.step}
                                        value={item.val}
                                        onChange={(e) => item.set(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg accent-indigo-600 appearance-none cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-[24px] text-center shadow-lg shadow-indigo-200 dark:shadow-none text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] text-indigo-100 font-bold uppercase mb-1 tracking-widest">Projected Wealth</p>
                                <h2 className="text-3xl font-black">
                                    ₹{Math.round((sipVal * 12 * sipYr * (Math.pow(1 + expReturn / 100, sipYr)))).toLocaleString()}
                                </h2>
                                <button onClick={() => openChat('Wealth Planning')} className="mt-3 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-[10px] font-bold backdrop-blur-sm transition">
                                    Analyze with EverestQ
                                </button>
                            </div>
                            {/* Sparkles */}
                            <i className="fa-solid fa-star absolute top-4 left-4 text-yellow-300 text-xs animate-spin-slow"></i>
                            <i className="fa-solid fa-star absolute bottom-4 right-8 text-yellow-300 text-[10px] animate-pulse"></i>
                        </div>
                    </div>
                )}

                {/* --- IPO SECTION (NEW) --- */}
                {activeTab === 'ipo' && (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        {[
                            { name: "TechNova AI", dates: "24-26 Jan", price: "₹450-480", status: "Open", hot: true },
                            { name: "SolarGreen Energy", dates: "28-30 Jan", price: "₹120-135", status: "Upcoming", hot: false },
                            { name: "FinServe Bank", dates: "Closed", price: "₹890", status: "Allotted", hot: false }
                        ].map((ipo, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-[24px] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                {ipo.hot && <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl">HOT</div>}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-300 text-xl border border-slate-200 dark:border-slate-600">
                                            {ipo.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{ipo.name}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ipo.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>{ipo.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">
                                    <div>
                                        <p className="font-medium">Offer Dates</p>
                                        <p className="font-bold text-slate-800 dark:text-white">{ipo.dates}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Price Range</p>
                                        <p className="font-bold text-slate-800 dark:text-white">{ipo.price}</p>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl text-xs font-bold hover:opacity-90 transition">
                                    {ipo.status === 'Open' ? 'Apply Now' : 'View Details'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* EVEREST Q CHAT OVERLAY */}
            {showChat && (
                <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white dark:bg-slate-900 w-full rounded-t-[40px] h-[85vh] flex flex-col shadow-2xl animate-[slideUp_0.3s_ease-out]">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-600 rounded-t-[40px] text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
                                    <i className="fa-solid fa-brain animate-pulse text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">EverestQ</h3>
                                    <div className="flex items-center gap-1.5 opacity-80">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-[10px] font-medium tracking-wide">AI ANALYST ONLINE</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setShowChat(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                                <i className="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-slate-900">
                            <div className="flex justify-center">
                                <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full font-medium">Session started • Context: {chatContext}</span>
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

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputMsg}
                                    onChange={(e) => setInputMsg(e.target.value)}
                                    placeholder="Ask for predictions or analysis..."
                                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm rounded-full pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition hover:bg-indigo-700">
                                    <i className="fa-solid fa-paper-plane text-sm"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentScreen;
