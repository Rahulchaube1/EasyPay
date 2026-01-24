import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    Filler
);

const HistoryScreen = ({ navigate }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'map', 'analytics'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    // Mock Data
    const transactions = [
        { id: 1, title: 'Starbucks Coffee', type: 'expense', amount: 350, date: 'Today, 10:30 AM', location: 'Connaught Place, Delhi', lat: 30, long: 40, category: 'Food', icon: 'fa-mug-hot', color: 'text-orange-500', bg: 'bg-orange-100' },
        { id: 2, title: 'Uber Ride', type: 'expense', amount: 420, date: 'Today, 08:15 AM', location: 'Gurugram -> Noida', lat: 60, long: 20, category: 'Travel', icon: 'fa-car', color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 3, title: 'Salary Credited', type: 'income', amount: 85000, date: 'Yesterday, 6:00 PM', location: 'Bangalore HQ', lat: 10, long: 60, category: 'Salary', icon: 'fa-building', color: 'text-green-600', bg: 'bg-green-100' },
        { id: 4, title: 'Amazon Purchase', type: 'expense', amount: 2499, date: 'Yesterday, 2:30 PM', location: 'Mumbai Warehouse', lat: 45, long: 70, category: 'Shopping', icon: 'fa-bag-shopping', color: 'text-purple-500', bg: 'bg-purple-100' },
        { id: 5, title: 'Netflix Subscription', type: 'expense', amount: 649, date: '22 Jan, 09:00 AM', location: 'Automated Debit', lat: 80, long: 80, category: 'Bills', icon: 'fa-film', color: 'text-red-500', bg: 'bg-red-100' },
        { id: 6, title: 'Grocery Mart', type: 'expense', amount: 1540, date: '21 Jan, 07:45 PM', location: 'Sector 18, Noida', lat: 25, long: 30, category: 'Food', icon: 'fa-basket-shopping', color: 'text-emerald-500', bg: 'bg-emerald-100' },
    ];

    const filteredTransactions = transactions.filter(t => 
        (filterType === 'All' || t.type === (filterType === 'Income' ? 'income' : 'expense')) &&
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Chart Data
    const lineData = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            label: 'Spend',
            data: [1200, 1900, 300, 500, 200, 3000, 1500],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const doughnutData = {
        labels: ['Food', 'Travel', 'Shop', 'Bills'],
        datasets: [{
            data: [35, 20, 30, 15],
            backgroundColor: ['#f43f5e', '#3b82f6', '#a855f7', '#10b981'],
            borderWidth: 0,
        }]
    };

    return (
        <div id="screen-history" className="screen bg-slate-50 min-h-screen pb-28">
            
            {/* 1. Branding / Ads Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 pt-6 pb-12 px-5 rounded-b-[40px] relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>

                <div className="flex justify-between items-center mb-6 relative z-10 text-white">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="font-bold text-lg">Transaction History</h2>
                    <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <i className="fa-solid fa-cloud-arrow-down"></i>
                    </button>
                </div>

                {/* Ad Content */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 flex items-center justify-between shadow-lg relative z-10 animate-pulse-slow border border-white/10">
                    <div>
                        <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider mb-1">Sponsored</p>
                        <h3 className="font-bold text-white text-sm">Get 5% Cashback on Travel</h3>
                        <p className="text-[10px] text-white/80">Use code TRAVEL2024 on your next trip.</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-md">
                        <i className="fa-solid fa-plane-departure"></i>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-6 relative z-10">
                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input 
                            type="text" 
                            placeholder="Search payments, dates, locations..." 
                            className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white/20 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 2. View Toggle & Filters */}
            <div className="px-5 -mt-6 relative z-20">
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex justify-between items-center">
                    <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
                        {['list', 'map', 'analytics'].map(mode => (
                            <button 
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${viewMode === mode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <i className={`fa-solid ${mode === 'list' ? 'fa-list' : mode === 'map' ? 'fa-map-location-dot' : 'fa-chart-pie'} mr-2`}></i>
                                {mode}
                            </button>
                        ))}
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition">
                         <i className="fa-solid fa-filter"></i>
                    </button>
                </div>
            </div>

            {/* 3. Content Area */}
            <div className="mt-6 px-5 pb-24">
                
                {viewMode === 'list' && (
                    <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
                        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['All', 'Income', 'Expense', 'Pending'].map(f => (
                                <button 
                                    key={f} 
                                    onClick={() => setFilterType(f)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold border whitespace-nowrap transition-all ${filterType === f ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {filteredTransactions.map((t) => (
                            <div key={t.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group active:scale-[0.98] transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl ${t.bg} ${t.color} flex items-center justify-center text-lg shadow-sm group-hover:rotate-12 transition-transform`}>
                                        <i className={`fa-solid ${t.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm">{t.title}</h3>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                            <i className="fa-regular fa-clock"></i> {t.date}
                                        </p>
                                        <p className="text-[10px] text-indigo-500 font-medium flex items-center gap-1 mt-0.5">
                                            <i className="fa-solid fa-location-dot"></i> {t.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-slate-800'}`}>
                                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                    </p>
                                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Success</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'map' && (
                     <div className="animate-[fadeIn_0.5s_ease-out]">
                        <div className="bg-slate-200 w-full aspect-[4/5] rounded-3xl relative overflow-hidden shadow-inner border-4 border-white mb-4">
                            {/* Abstract Map Design */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            
                            {/* Roads Abstract */}
                            <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-white/40 skew-x-12 blur-[1px]"></div>
                            <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/40 -rotate-12 blur-[1px]"></div>

                            {/* Pins */}
                            {transactions.map((t, i) => (
                                <div 
                                    key={t.id}
                                    className="absolute group cursor-pointer"
                                    style={{ top: `${t.lat}%`, left: `${t.long}%` }}
                                >
                                    <div className={`w-3 h-3 rounded-full ${t.type === 'income' ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_15px_rgba(0,0,0,0.2)] animate-ping absolute`}></div>
                                    <div className={`relative z-10 w-8 h-8 rounded-full bg-white border-2 ${t.type === 'income' ? 'border-green-500' : 'border-red-500'} flex items-center justify-center text-xs shadow-lg transform transition group-hover:scale-125 group-hover:-translate-y-2`}>
                                        <i className={`fa-solid ${t.icon} ${t.color}`}></i>
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-xl z-20">
                                        {t.title} <br/> <span className="font-bold">₹{t.amount}</span>
                                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                    </div>
                                </div>
                            ))}

                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-lg">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Your Footprint</p>
                                <h3 className="text-xs font-bold text-slate-800">New Delhi Region</h3>
                            </div>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                            <i className="fa-solid fa-map-location-dot text-indigo-600 text-xl mt-1"></i>
                            <div>
                                <h4 className="font-bold text-indigo-900 text-sm">Location Intelligence</h4>
                                <p className="text-[10px] text-indigo-700/80 leading-relaxed mt-1">
                                    You spend frequently in <span className="font-bold">Connaught Place</span> and <span className="font-bold">Noida Sector 18</span>. We found 3 offers near you!
                                </p>
                            </div>
                        </div>
                     </div>
                )}

                {viewMode === 'analytics' && (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 text-sm">Spending Trend</h3>
                                <select className="bg-slate-100 text-[10px] font-bold rounded-lg px-2 py-1 outline-none text-slate-600">
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                            <div className="h-40">
                                <Line 
                                    data={lineData} 
                                    options={{ 
                                        responsive: true, 
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } }, 
                                        scales: { 
                                            x: { grid: { display: false }, ticks: { font: { size: 10 } } }, 
                                            y: { display: false } 
                                        } 
                                    }} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-slate-800 text-xs mb-3 self-start">By Category</h3>
                                <div className="h-24 w-24 relative">
                                    <Doughnut 
                                        data={doughnutData} 
                                        options={{ cutout: '70%', plugins: { legend: { display: false } } }} 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-[8px] text-slate-400 font-bold uppercase">Top</span>
                                        <span className="text-xs font-bold text-slate-800">Food</span>
                                    </div>
                                </div>
                             </div>

                             <div className="space-y-3">
                                <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100">
                                    <p className="text-[10px] text-orange-600 font-bold uppercase mb-1">Highest Spend</p>
                                    <h3 className="font-bold text-slate-800 text-sm">Starbucks</h3>
                                    <p className="text-[10px] text-slate-500">₹350 • Yesterday</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-2xl border border-green-100">
                                    <p className="text-[10px] text-green-600 font-bold uppercase mb-1">Total Savings</p>
                                    <h3 className="font-bold text-slate-800 text-sm">₹1,240</h3>
                                    <p className="text-[10px] text-slate-500">From offers & rewards</p>
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default HistoryScreen;