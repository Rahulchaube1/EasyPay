import React, { useState, useEffect } from 'react';

const PinScreen = ({ amount, showToast, processSuccess }) => {
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNumClick = (num) => {
        if (pin.length < 4) {
            setPin(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (pin.length === 4) {
            setLoading(true);
            // Simulate processing delay
            setTimeout(() => {
                if (pin === "1234") { // Mock PIN check
                    processSuccess();
                } else {
                    setLoading(false);
                    setPin('');
                    showToast("Incorrect PIN. Try 1234");
                }
            }, 1500);
        }
    };

    useEffect(() => {
        if (pin.length === 4) {
            handleSubmit();
        }
    }, [pin]);

    return (
        <div id="screen-pin" className="screen min-h-screen bg-slate-900 flex flex-col items-center justify-between py-10 font-sans relative">
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-indigo-600/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 bg-pink-600/20 rounded-full blur-[80px]"></div>
            </div>

            <div className="z-10 w-full flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/5">
                    <i className="fa-solid fa-lock text-xs text-indigo-400"></i>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Secure Payment</span>
                </div>
                
                {/* Bank / Amount Info */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm font-medium mb-1">Enter UPI PIN to pay</p>
                    <h2 className="text-3xl font-bold text-white mb-2">₹{amount}</h2>
                    <p className="text-slate-500 text-xs">Paying to Rahul Chaube</p>
                </div>

                {/* PIN Dots */}
                <div className="flex gap-4 mt-10">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-indigo-500 scale-110 shadow-[0_0_10px_#6366f1]' : 'bg-slate-700/50 border border-slate-600'}`}></div>
                    ))}
                </div>
                
                {loading && (
                    <div className="mt-8 flex flex-col items-center gap-2 animate-pulse">
                        <div className="w-8 h-8 border-2 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
                        <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Processing Securely...</span>
                    </div>
                )}
            </div>

            {/* Custom Number Pad */}
            <div className="z-10 w-full px-6 max-w-sm">
                <div className="grid grid-cols-3 gap-y-6 gap-x-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button 
                            key={num}
                            onClick={() => !loading && handleNumClick(num)} 
                            className="h-16 flex items-center justify-center text-2xl font-medium text-white rounded-full hover:bg-white/10 transition active:scale-95"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="h-16"></div> {/* Empty space */}
                    <button 
                        onClick={() => !loading && handleNumClick(0)} 
                        className="h-16 flex items-center justify-center text-2xl font-medium text-white rounded-full hover:bg-white/10 transition active:scale-95"
                    >
                        0
                    </button>
                    <button 
                        onClick={() => !loading && handleDelete()} 
                        className="h-16 flex items-center justify-center text-xl text-slate-400 rounded-full hover:bg-white/10 transition active:scale-95"
                    >
                        <i className="fa-solid fa-delete-left"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PinScreen;
