import React, { useState, useEffect } from 'react';

const PaymentScreen = ({ navigate, paymentDetails, initiatePin }) => {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        setAmount('');
    }, []);

    return (
        <div id="screen-pay" className="screen min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
            
            {/* Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between sticky top-0 z-30">
                <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition hover:bg-slate-200">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Paying To</span>
                    <h2 className="font-bold text-slate-800 dark:text-white">{paymentDetails.name || 'Merchant'}</h2>
                </div>
                <div className="w-10 text-center">
                    <i className="fa-solid fa-circle-question text-slate-300"></i>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center p-6 mt-6">
                
                {/* User Avatar */}
                <div className="relative mb-6">
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${paymentDetails.name}`} 
                        className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-lg"
                        alt="Receiver" 
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-shield text-[10px] text-white"></i>
                    </div>
                </div>

                {/* Amount Input */}
                <div className="flex flex-col items-center relative w-full mb-8">
                     <div className="flex items-center justify-center gap-1 group">
                        <span className={`text-5xl font-extrabold transition-colors ${amount ? 'text-slate-800 dark:text-white' : 'text-slate-300'}`}>₹</span>
                        <input
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-6xl font-extrabold text-slate-800 dark:text-white w-full max-w-[200px] text-center outline-none placeholder-slate-300 caret-indigo-500"
                            autoFocus
                        />
                     </div>
                     <p className="text-xs font-medium text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        Banking Name: {paymentDetails.name?.toUpperCase()}
                     </p>
                </div>

                {/* Note Message */}
                <div className="w-full max-w-xs mb-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-message"></i>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Add a note (optional)" 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)}
                            className="bg-transparent text-sm font-medium w-full text-slate-700 dark:text-gray-200 outline-none placeholder-slate-400"
                        />
                    </div>
                </div>

            </div>

            {/* Pay Button */}
            <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-8">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <img src="https://img.icons8.com/color/48/bank-building.png" className="w-6 h-6" alt="Bank" />
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Debiting from</p>
                            <p className="text-xs font-bold text-slate-800 dark:text-white">HDFC Bank  4590</p>
                        </div>
                    </div>
                    <i className="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
                </div>
                <button 
                    onClick={() => amount > 0 && initiatePin(amount, paymentDetails.name)} 
                    disabled={!amount}
                    className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 text-lg ${amount ? 'bg-indigo-600 text-white hover:scale-[1.02] shadow-indigo-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                    Pay ₹{amount || '0'}
                </button>
            </div>
        </div>
    );
};

export default PaymentScreen;
