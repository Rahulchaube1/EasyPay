import React from 'react';

const BankScreen = ({ navigate, showToast, fillPayment }) => {
    const verifyBankDetails = () => {
        showToast('Verifying...');
        setTimeout(() => fillPayment('Bank Transfer'), 1000);
    };

    return (
        <div id="screen-bank" className="screen p-5 bg-white">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-xl text-slate-800">Bank Transfer</h2>
            </div>
            <div className="space-y-4">
                <input type="number" id="bank-acc" className="w-full border rounded-xl px-4 py-3 text-lg outline-none" placeholder="Account Number" />
                <input type="text" id="bank-ifsc" className="w-full border rounded-xl px-4 py-3 text-lg outline-none" placeholder="IFSC Code" />
                <input type="text" id="bank-name" className="w-full border rounded-xl px-4 py-3 text-lg outline-none" placeholder="Holder Name" />
            </div>
            <button onClick={verifyBankDetails} className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">Proceed</button>
        </div>
    );
};

export default BankScreen;