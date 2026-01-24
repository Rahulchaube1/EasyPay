import React, { useState } from 'react';

const SplitBillScreen = ({ navigate, showToast }) => {
    const [amount, setAmount] = useState('');

    const sendSplitRequest = () => {
        showToast('Requests Sent');
        navigate('home');
    };

    return (
        <div id="screen-split-bill" className="screen p-5 bg-white flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('home')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-xl text-slate-800">Split Bill</h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl mb-6 text-center border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Total Amount</p>
                <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">₹</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="bg-transparent text-4xl font-bold text-slate-800 w-32 text-center outline-none"
                    />
                </div>
            </div>
            {amount && (
                <div id="split-breakdown" className="bg-indigo-50 rounded-2xl p-4 mb-4">
                    <div id="split-list" className="space-y-2">
                        <div className="flex justify-between text-xs"><span>Per Person</span><b>₹{(Number(amount) / 2).toFixed(0)}</b></div>
                    </div>
                </div>
            )}
            <button onClick={sendSplitRequest} className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Send Requests</button>
        </div>
    );
};

export default SplitBillScreen;