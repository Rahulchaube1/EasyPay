import React, { useState } from 'react';

const NotificationScreen = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    // Sample Data with 'read' status and 'date' grouping logic
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'payment_received', title: 'Payment Received', desc: 'Received ₹5,000 from Rahul Chaube.', time: '2m ago', icon: 'fa-arrow-down', color: 'text-green-500', bg: 'bg-green-50', amount: '+₹5,000', category: 'transaction', read: false, group: 'Today' },
        { id: 2, type: 'critical', title: 'Low Balance Alert', desc: 'Your account balance is below ₹500.', time: '30m ago', icon: 'fa-triangle-exclamation', color: 'text-red-600', bg: 'bg-red-50', category: 'system', read: false, group: 'Today', pinned: true },
        { id: 3, type: 'offer', title: '50% Cashback', desc: 'Get 50% cashback on your next Zomato order.', time: '1h ago', icon: 'fa-percent', color: 'text-orange-500', bg: 'bg-orange-50', category: 'offers', read: true, group: 'Today' },
        { id: 4, type: 'security', title: 'New Login Detected', desc: 'New login from Windows PC in Mumbai.', time: '3h ago', icon: 'fa-shield-halved', color: 'text-indigo-500', bg: 'bg-indigo-50', category: 'security', read: true, group: 'Yesterday' },
        { id: 5, type: 'payment_sent', title: 'Payment Sent', desc: 'Paid ₹240 to Starbucks Coffee.', time: '5h ago', icon: 'fa-arrow-up', color: 'text-slate-800', bg: 'bg-slate-100', amount: '-₹240', category: 'transaction', read: true, group: 'Yesterday' },
        { id: 6, type: 'bill', title: 'Electricity Bill Due', desc: 'Your electricity bill of ₹1,200 is due tomorrow.', time: '1d ago', icon: 'fa-bolt', color: 'text-yellow-600', bg: 'bg-yellow-50', category: 'system', read: true, group: 'Earlier' },
        { id: 7, type: 'investment', title: 'Stock Alert', desc: 'HDFC Bank stock is up by 2.5% today.', time: '2d ago', icon: 'fa-arrow-trend-up', color: 'text-emerald-600', bg: 'bg-emerald-50', category: 'transaction', read: true, group: 'Earlier' }
    ]);

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'transaction', label: 'Money' },
        { id: 'offers', label: 'Offers' },
        { id: 'security', label: 'Security' }
    ];

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    // Filter Logic
    const filteredList = notifications.filter(n => {
        const matchesTab = activeTab === 'all' || n.category === activeTab;
        const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Group by Date (Today, Yesterday, Earlier)
    const groupedNotifications = {
        'Pinned': filteredList.filter(n => n.pinned),
        'Today': filteredList.filter(n => n.group === 'Today' && !n.pinned),
        'Yesterday': filteredList.filter(n => n.group === 'Yesterday' && !n.pinned),
        'Earlier': filteredList.filter(n => n.group === 'Earlier' && !n.pinned),
    };

    return (
        <div id="screen-notification" className="screen bg-slate-50 dark:bg-slate-900 min-h-screen pb-10 flex flex-col">
            
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-2 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="font-bold text-lg text-slate-800 dark:text-white">Notifications</h2>
                    <div className="flex gap-2">
                        <button onClick={() => setShowSettings(!showSettings)} className={`w-10 h-10 rounded-full flex items-center justify-center transition ${showSettings ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <button onClick={markAllRead} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition group relative">
                            <i className="fa-solid fa-check-double"></i>
                             <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Mark all read</span>
                        </button>
                    </div>
                </div>

                {/* Settings Panel (Collapsible) */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSettings ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3">
                         <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded-xl">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-bell text-indigo-500"></i>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-200">Push</span>
                            </div>
                            <div className="w-8 h-4 bg-indigo-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                         </div>
                         <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded-xl">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-envelope text-blue-500"></i>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-200">Email</span>
                            </div>
                            <div className="w-8 h-4 bg-slate-300 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div></div>
                         </div>
                         <button onClick={clearAll} className="col-span-2 bg-red-50 text-red-600 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition">
                            <i className="fa-solid fa-trash-can"></i> Clear All Notifications
                         </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-3">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input 
                        type="text" 
                        placeholder="Search alerts..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-medium text-slate-700 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none transition"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                activeTab === tab.id 
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                
                {/* 1. Analytics Graph Card (Visual Appeal) */}
                {activeTab === 'all' && !searchTerm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden shrink-0 animate-[fadeIn_0.5s]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ACTIVITY</p>
                                <h3 className="text-2xl font-bold mt-1">{filteredList.length} Alerts</h3>
                                <p className="text-xs text-slate-400">This week</p>
                            </div>
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <i className="fa-solid fa-chart-simple text-indigo-400"></i>
                            </div>
                        </div>
                        {/* Fake Chart Bars */}
                        <div className="flex items-end justify-between gap-2 h-16 px-2">
                            {[40, 70, 30, 85, 50, 60, 90].map((h, i) => (
                                <div key={i} className="w-full bg-white/10 rounded-t-sm relative group">
                                    <div 
                                        style={{ height: `${h}%` }} 
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-500 mt-2 font-mono uppercase">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                )}

                {/* 2. Notification List Grouped */}
                {Object.entries(groupedNotifications).map(([group, list]) => (
                    list.length > 0 && (
                        <div key={group} className="space-y-3">
                            <h3 className={`font-bold text-xs uppercase tracking-wider px-1 flex items-center gap-2 ${group === 'Pinned' ? 'text-indigo-500' : 'text-slate-400'}`}>
                                {group === 'Pinned' && <i className="fa-solid fa-thumbtack"></i>}
                                {group}
                            </h3>
                            
                            {list.map((item) => (
                                <div key={item.id} className={`bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border ${item.read ? 'border-slate-100 dark:border-slate-700' : 'border-indigo-100 dark:border-indigo-900 bg-indigo-50/10'} flex gap-4 animate-[fadeIn_0.3s_ease-out] relative group overflow-hidden transition-all hover:scale-[1.01]`}>
                                    
                                    {!item.read && <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full shadow-sm"></div>}

                                    <div className={`w-12 h-12 rounded-xl ${item.bg} dark:bg-slate-700/50 flex items-center justify-center shrink-0`}>
                                        <i className={`fa-solid ${item.icon} ${item.color} text-lg`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start pr-4">
                                            <h4 className={`font-bold truncate pr-2 ${item.read ? 'text-slate-700 dark:text-slate-200' : 'text-slate-900 dark:text-white'}`}>{item.title}</h4>
                                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                                        
                                        {/* Action Buttons based on type */}
                                        {item.type === 'offer' && (
                                            <button className="mt-3 text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition flex items-center gap-1">
                                                Claim Offer <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        )}
                                        {item.type === 'bill' && (
                                            <button className="mt-3 text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition flex items-center gap-1">
                                                Pay Now <i className="fa-solid fa-bolt text-yellow-500"></i>
                                            </button>
                                        )}
                                    </div>
                                    {item.amount && (
                                        <div className={`text-xs font-bold self-start mt-1 ${item.amount.startsWith('+') ? 'text-green-600' : 'text-slate-800 dark:text-white'}`}>
                                            {item.amount}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ))}
                
                {filteredList.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-bell-slash text-3xl text-slate-300"></i>
                        </div>
                        <h4 className="font-bold text-slate-500">No notifications found</h4>
                        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NotificationScreen;
