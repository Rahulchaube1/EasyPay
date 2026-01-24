import React, { useState, useEffect } from 'react';

const MySavingScreen = ({ navigate }) => {
    const [balance, setBalance] = useState(125); // Simulated existing balance
    const [dailyAmount, setDailyAmount] = useState(5);
    const [autoSave, setAutoSave] = useState(true);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (amount > 0 && amount <= balance) {
            setBalance(prev => prev - amount);
            setShowWithdrawModal(false);
            setWithdrawAmount('');
            alert(`Withdrawal of ₹${amount} successful! Transferred to your bank.`);
        } else {
            alert("Invalid amount or insufficient funds.");
        }
    };

    return (
        <div id="screen-mysaving" className="screen bg-slate-50 dark:bg-slate-900 min-h-screen pb-10 flex flex-col font-sans">
            
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
                <button onClick={() => navigate('more')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition hover:bg-slate-200">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-lg text-slate-800 dark:text-white">Emergency Fund</h2>
                <div className="w-10"></div>
            </div>

            <div className="p-5 space-y-6 flex-1 overflow-y-auto">

                {/* Main Card */}
                <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
                    
                    <div className="flex items-center gap-2 mb-1 opacity-90">
                        <i className="fa-solid fa-piggy-bank"></i>
                        <span className="text-sm font-medium tracking-wide">TOTAL SAVINGS</span>
                    </div>
                    <div className="text-4xl font-extrabold mb-4">₹{balance.toFixed(2)}</div>
                    
                    <div className="flex gap-3">
                         <button onClick={() => setShowWithdrawModal(true)} className="flex-1 bg-white text-rose-600 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-rose-50 transition active:scale-95 flex items-center justify-center gap-2">
                            <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
                         </button>
                         <button className="px-4 bg-white/20 rounded-xl font-bold text-sm backdrop-blur-sm hover:bg-white/30 transition">
                            <i className="fa-solid fa-plus"></i>
                         </button>
                    </div>
                </div>

                {/* Auto-Save Settings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <i className="fa-solid fa-rotate"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white">Daily Auto-Save</h3>
                                <p className="text-xs text-slate-500">Deducts from Primary Bank</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(!autoSave)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    {autoSave && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl animate-[fadeIn_0.3s]">
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Saving Amount (₹)</label>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setDailyAmount(Math.max(1, dailyAmount - 1))} className="w-8 h-8 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">-</button>
                                <input 
                                    type="number" 
                                    value={dailyAmount} 
                                    onChange={(e) => setDailyAmount(Number(e.target.value))}
                                    className="flex-1 bg-white dark:bg-slate-600 border-none rounded-lg py-1.5 text-center font-bold text-slate-800 dark:text-white focus:ring-0"
                                />
                                <button onClick={() => setDailyAmount(dailyAmount + 1)} className="w-8 h-8 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">+</button>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 text-center">
                                <i className="fa-solid fa-circle-info mr-1"></i>
                                ₹{dailyAmount} will be saved automatically every day at 9:00 AM.
                            </p>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <i className="fa-solid fa-shield-cat text-blue-500 text-2xl mb-2"></i>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Emergency</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-1">Funds are locked but available instantly for emergencies.</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-800">
                        <i className="fa-solid fa-landmark text-purple-500 text-2xl mb-2"></i>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Bank Linked</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-1">Money moves securely from your linked bank account.</p>
                    </div>
                </div>

            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s]">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-[slideUp_0.3s]">
                        <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-white">Withdraw Funds</h3>
                        <p className="text-xs text-slate-500 mb-4">Enter amount to transfer back to your bank.</p>
                        
                        <div className="relative mb-6">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₹</span>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-700 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-800 dark:text-white border-none focus:ring-2 focus:ring-rose-500 outline-none"
                                autoFocus
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowWithdrawModal(false)} className="py-3 rounded-xl font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition">Cancel</button>
                            <button onClick={handleWithdraw} className="py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-lg shadow-rose-500/30">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MySavingScreen;
