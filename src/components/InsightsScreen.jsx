import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line, Doughnut, Radar, Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Filler
);

const InsightsScreen = ({ navigate, showToast }) => {
    const [period, setPeriod] = useState('Month');
    const [timeScale, setTimeScale] = useState('Daily');
    const [chatExpanded, setChatExpanded] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hello Rahul! I'm EverestQ. My deep learning models have analyzed 14,021 data points from your finances. Ask me about your 'Coffee Addiction' or 'Predicted Savings'." }
    ]);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, chatExpanded]);

    // --- CHART DATA GENERATORS ---
    const getChartData = (p) => {
        // Advanced granular time mapping
        let labels = [];
        let multiplier = 100;

        if (p === 'Min') { labels = Array.from({ length: 10 }, (_, i) => `${i * 5}m ago`); multiplier = 1; }
        else if (p === 'Hr') { labels = ['00', '15', '30', '45']; multiplier = 5; }
        else if (p === 'Day') { labels = ['Morning', 'Noon', 'Evening', 'Night']; multiplier = 20; }
        else if (p === 'Week') { labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; multiplier = 150; }
        else if (p === 'Month') { labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']; multiplier = 800; }
        else if (p === '6M') { labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; multiplier = 2500; }
        else if (p === 'Year') { labels = ['Q1', 'Q2', 'Q3', 'Q4']; multiplier = 10000; }
        else { labels = ['2023', '2024', '2025']; multiplier = 50000; }

        return {
            labels,
            datasets: [
                {
                    label: 'Income Flow',
                    data: labels.map(() => Math.floor(Math.random() * 50 * multiplier) + 50 * multiplier),
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, '#10b981');
                        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
                        return gradient;
                    },
                    borderColor: '#10b981',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Total Spend',
                    data: labels.map(() => Math.floor(Math.random() * 40 * multiplier) + 20 * multiplier),
                    backgroundColor: 'transparent',
                    borderColor: '#f43f5e',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                }
            ]
        };
    };

    const stackedBarData = {
        labels: ['Food', 'Shop', 'Bills', 'Uber', 'Sub', 'Rent'],
        datasets: [
            {
                label: 'Essential',
                data: [2000, 0, 5000, 0, 0, 15000],
                backgroundColor: '#6366f1',
            },
            {
                label: 'Discretionary',
                data: [1500, 3000, 0, 1200, 500, 0],
                backgroundColor: '#8b5cf6',
            },
        ],
    };

    const radarData = {
        labels: ['Liquidity', 'Solvency', 'Savings Rate', 'Debt Ratio', 'ROI', 'Consistency'],
        datasets: [{
            label: 'Financial Health Score',
            data: [85, 90, 65, 95, 70, 80],
            backgroundColor: 'rgba(244, 63, 94, 0.2)',
            borderColor: '#f43f5e',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#f43f5e',
            pointRadius: 4,
            fill: true
        }]
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setChatInput('');

        // Mock Real-time Advanced Analysis
        setTimeout(() => {
            let reply = "Deep scanning your ecosystem... ";
            const lowMsg = userMsg.toLowerCase();

            if (lowMsg.includes('predict')) reply = `🔮 AI Prediction: Based on your last 6 months of data (processed 450 txns), if you maintain current spending, you will hit ₹10L Savings by Nov 2026. Your 'Food' spend is the biggest variable (-15% efficiency).`;
            else if (lowMsg.includes('save') || lowMsg.includes('saving')) reply = "💰 Optimization Opportunity: I found 3 recurring subscriptions (Netflix, Spotify, Adobe) totaling ₹1,800/mo that you haven't used in 48 hours. Canceling these increases yearly wealth by ₹21,600.";
            else if (lowMsg.includes('compare')) reply = "📊 Benchmarking: You spend 22% less on dining out than the average user in 'Bangalore Tech Sector', but 40% more on Electronics. I suggest a 2-month gadget freeze.";
            else reply = `🤖 System Insight: Analyzing ${period} timeline. Cash flow velocity is stable. Detected a spending spike on weekends (Saturday avg ₹4.5k vs Weekday avg ₹800). Would you like me to set a 'Weekend Lock' on your card?`;

            setMessages(prev => [...prev, { type: 'bot', text: reply }]);
        }, 1200);
    };

    return (
        <div id="screen-insights" className="screen bg-slate-50 min-h-screen pb-32">

            {/* 1. Ultra Modern Header */}
            <div className="bg-slate-900 pt-8 pb-32 px-5 rounded-b-[50px] relative z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-y-20 -translate-x-20"></div>

                <div className="flex justify-between items-center mb-8 relative z-10 text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('home')} className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div>
                            <h2 className="font-bold text-xl">Insights Pro</h2>
                            <p className="text-[10px] text-indigo-300 font-medium tracking-wide">POWERED BY EVEREST Q</p>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-slow">
                        <i className="fa-solid fa-bolt text-white"></i>
                    </button>
                </div>

                {/* Micro-Time Navigation */}
                <div className="relative z-10 overflow-x-auto scrollbar-hide mb-6">
                    <div className="flex space-x-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md w-max mx-auto">
                        {['Min', 'Hr', 'Day', 'Week', 'Month', '6M', 'Year', 'All'].map(t => (
                            <button
                                key={t}
                                className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${period === t ? 'bg-white text-indigo-900 shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}
                                onClick={() => setPeriod(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hero Stat */}
                <div className="text-center relative z-10 mb-[-40px]">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold mb-2">
                        <i className="fa-solid fa-arrow-trend-up mr-1"></i> +12.4% vs Last {period}
                    </span>
                    <h1 className="text-4xl font-bold text-white mb-1">₹4,25,920</h1>
                    <p className="text-xs text-slate-400">Total Net Flow</p>
                </div>
            </div>

            {/* 2. Main Chart Card */}
            <div className="px-5 -mt-24 relative z-10">
                <div className="bg-white rounded-[30px] p-2 shadow-2xl border border-white/50">
                    <div className="bg-slate-50 rounded-[25px] p-4 h-64 border border-slate-100 relative">
                        {/* Custom Tooltip Overlay Mock */}
                        <div className="absolute top-4 right-4 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-lg shadow-lg z-10 opacity-0 animate-fade-in">
                            Peaks at 9:00 PM
                        </div>
                        <Line
                            data={getChartData(period)}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#94a3b8' } },
                                    y: { display: false }
                                },
                                animation: { duration: 800 }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 3. Smart Calculators & Tools */}
            <div className="px-5 mt-6 grid grid-cols-4 gap-3">
                {[
                    { icon: 'fa-calculator', color: 'text-indigo-600', bg: 'bg-indigo-50', label: 'Budget' },
                    { icon: 'fa-piggy-bank', color: 'text-pink-600', bg: 'bg-pink-50', label: 'Save' },
                    { icon: 'fa-chart-pie', color: 'text-orange-600', bg: 'bg-orange-50', label: 'Tax' },
                    { icon: 'fa-wand-magic-sparkles', color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Predict' },
                ].map((tool, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => showToast(`${tool.label} tool activated`)}>
                        <div className={`w-14 h-14 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center text-xl shadow-sm border border-white group-active:scale-90 transition-transform`}>
                            <i className={`fa-solid ${tool.icon}`}></i>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{tool.label}</span>
                    </div>
                ))}
            </div>

            {/* 4. Deep Dive Analytics Grid */}
            <div className="px-5 mt-8 space-y-6">

                {/* Spending DNA */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">Spending DNA</h3>
                            <p className="text-[10px] text-slate-400">Essential vs Discretionary</p>
                        </div>
                        <button className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg font-bold text-slate-600">Details</button>
                    </div>
                    <div className="h-40">
                        <Bar
                            data={stackedBarData}
                            options={{
                                maintainAspectRatio: false,
                                scales: { x: { grid: { display: false } }, y: { display: false, stacked: true }, x: { stacked: true, grid: { display: false } } },
                                plugins: { legend: { display: false } },
                                borderRadius: 5
                            }}
                        />
                    </div>
                </div>

                {/* Financial Health Radar */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-3xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-sm">Vital Signs</h3>
                            <p className="text-[10px] text-slate-400">Holistic Financial Health</p>
                        </div>
                        <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs font-bold border border-emerald-500/20">
                            92/100
                        </div>
                    </div>
                    <div className="h-48 relative z-10">
                        <Radar
                            data={radarData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } }, // Removed legend
                                scales: {
                                    r: {
                                        ticks: { showLabelBackdrop: false, color: 'rgba(255,255,255,0.5)', font: { size: 8 } },
                                        grid: { color: 'rgba(255,255,255,0.1)' },
                                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                                        pointLabels: { color: '#cbd5e1', font: { size: 10, weight: 'bold' } }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* 4.1. AI Insight Cards (NEW) */}
                <div className="pt-2">
                    <h3 className="font-bold text-slate-800 text-sm mb-3">Smart Insights & Savings</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {/* Insight Card 1 */}
                        <div className="min-w-[260px] bg-gradient-to-br from-indigo-50 to-white p-4 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full rounded-tr-lg"></div>
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <i className="fa-solid fa-lightbulb"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">Optimization</p>
                                    <h4 className="font-bold text-slate-800 text-sm">Reduce Dining Out</h4>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                You spent <span className="font-bold text-rose-500">₹4,200</span> on weekends. Cutting this by 15% saves you ₹630/mo.
                            </p>
                            <button className="w-full py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-bold shadow-md active:scale-95 transition">
                                Set 'Weekend Limit'
                            </button>
                        </div>

                        {/* Insight Card 2 */}
                        <div className="min-w-[260px] bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <i className="fa-solid fa-piggy-bank"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Savings Opportunity</p>
                                    <h4 className="font-bold text-slate-800 text-sm">Recurring Leaks</h4>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                Detected unused sub: <span className="font-bold text-slate-700">Adobe CC (₹1,600)</span>. Not used in 28 days.
                            </p>
                            <button className="w-full py-2 rounded-xl bg-white border border-emerald-200 text-emerald-700 text-[10px] font-bold shadow-sm active:scale-95 transition">
                                Cancel Subscription
                            </button>
                        </div>
                        {/* Insight Card 3 */}
                        <div className="min-w-[260px] bg-gradient-to-br from-orange-50 to-white p-4 rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wide">High Spend Alert</p>
                                    <h4 className="font-bold text-slate-800 text-sm">Electronics Spike</h4>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                Electronics spend is <span className="font-bold text-slate-700">200%</span> higher than your avg. Avoid impulsive tech buys.
                            </p>
                            <button className="w-full py-2 rounded-xl bg-white border border-orange-200 text-orange-700 text-[10px] font-bold shadow-sm active:scale-95 transition">
                                analyze Habits
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4.2. Budget Forecasting (NEW) */}
                <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">
                        <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="font-bold text-sm mb-1">End of Month Forecast</h3>
                                <p className="text-[10px] text-slate-400">Based on current trajectory</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-emerald-400">₹14,500</p>
                                <p className="text-[10px] text-emerald-200/60 uppercase font-bold">Projected Savings</p>
                            </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-slate-300">Safe to Spend</span>
                                    <span className="font-bold">65%</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-slate-300">Predicted Bills</span>
                                    <span className="font-bold text-orange-400">₹8,200 Pending</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-[30%] bg-gradient-to-r from-orange-500 to-orange-300"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                            <button className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-bold transition flex items-center justify-center gap-2">
                                <i className="fa-solid fa-eye"></i> See Full Analysis
                            </button>
                            <button className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold transition flex items-center justify-center gap-2">
                                <i className="fa-solid fa-sliders"></i> Adjust Plan
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* 5. EverestQ Contextual Chat Overlay */}
            <div className="px-5 mt-8 mb-4">
                <div className={`bg-white rounded-[30px] border border-indigo-100 shadow-xl overflow-hidden transition-all duration-500 ${chatExpanded ? 'h-[500px] fixed inset-x-4 bottom-4 z-50 mb-0' : 'h-16 relative'}`}>

                    {/* Chat Header (Always Visible) */}
                    <div
                        onClick={() => setChatExpanded(!chatExpanded)}
                        className="h-16 bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                                <i className="fa-solid fa-brain text-white text-xs"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Ask EverestQ</h3>
                                {!chatExpanded && <p className="text-[10px] text-indigo-100">Tap to analyze your data...</p>}
                            </div>
                        </div>
                        <i className={`fa-solid fa-chevron-up text-white transition-transform duration-300 ${chatExpanded ? 'rotate-180' : ''}`}></i>
                    </div>

                    {/* Chat Body */}
                    {chatExpanded && (
                        <div className="flex flex-col h-[calc(100%-64px)] bg-slate-50">
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {m.type === 'bot' && <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-[10px] shrink-0">🤖</div>}
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${m.type === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef}></div>
                            </div>
                            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ask: 'Am I spending too much on weekends?'"
                                        className="w-full bg-slate-100 text-slate-800 text-xs py-3 pl-4 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                    />
                                    <button className="absolute right-1 top-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition">
                                        <i className="fa-solid fa-arrow-up text-xs"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default InsightsScreen;

