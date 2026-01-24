import React, { useState, useEffect } from 'react';

const PaymentScreen = ({ navigate, paymentDetails, initiatePin }) => {
    const [amount, setAmount] = useState('');

    useEffect(() => {
        // Reset amount when entering screen
        setAmount('');
    }, []);

    return (
        <div id="screen-pay" className="screen p-5 bg-white flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-xl text-slate-800">Payment</h2>
            </div>
            <div className="flex flex-col items-center mt-10">
                <h3 id="pay-name" className="text-2xl font-bold text-slate-800">{paymentDetails.name || 'Merchant'}</h3>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-bold text-slate-800">₹</span>
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-5xl font-bold text-slate-800 w-40 text-center outline-none"
                    />
                </div>
            </div>
            <div className="mt-auto mb-24">
                <button onClick={() => initiatePin(amount)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">Pay Securely</button>
            </div>
        </div>
    );
};

export default PaymentScreen;