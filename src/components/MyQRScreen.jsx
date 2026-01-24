import React from 'react';

const MyQRScreen = ({ navigate, showToast }) => {
    const copyUPI = () => {
        showToast('UPI Copied');
    };

    return (
        <div id="screen-my-qr" className="screen p-5 bg-slate-50 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-600 via-purple-600 to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="font-bold text-xl text-white">Receive Money</h2>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="glass-card bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl w-full max-w-xs border border-white/50 relative overflow-hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white mb-3">RC</div>
                            <h3 className="font-bold text-xl text-slate-800">Rahul Chaube</h3>
                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full mt-2 cursor-pointer" onClick={copyUPI}>
                                <span className="text-sm font-medium text-slate-600">rahul@easypay</span>
                                <i className="fa-regular fa-copy text-indigo-500 text-xs"></i>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-inner border border-slate-100 flex justify-center items-center mb-6">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rahul@easypay" className="w-48 h-48 mix-blend-multiply" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyQRScreen;