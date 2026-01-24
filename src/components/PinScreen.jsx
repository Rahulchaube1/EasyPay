import React, { useState } from 'react';

const PinScreen = ({ amount, showToast, processSuccess }) => {
    const [pin, setPin] = useState('');

    const pressPin = (n) => {
        if (pin.length < 4) {
            setPin(prev => prev + n);
        }
    };

    const backspace = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const submitPin = () => {
        if (pin.length !== 4) return showToast('Enter PIN');
        setTimeout(() => {
            processSuccess();
            setPin(''); // Reset for next time
        }, 500);
    };

    return (
        <div id="screen-pin" className="screen h-full flex flex-col relative bg-white/90 backdrop-blur-xl">
            <div className="relative z-10 flex flex-col h-full p-6 items-center pt-20">
                <p className="text-3xl font-bold text-slate-800 mb-10">₹{amount}</p>

                <div className="flex gap-4 mb-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-4 h-4 rounded-full border-2 border-slate-400 pin-dot ${i <= pin.length ? 'filled bg-slate-700 transform scale-125' : ''}`}></div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-8 text-center w-full max-w-xs">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <button key={n} onClick={() => pressPin(n)} className="text-2xl font-medium text-slate-700">{n}</button>
                    ))}
                    <div className="col-start-2">
                        <button onClick={() => pressPin(0)} className="text-2xl font-medium text-slate-700">0</button>
                    </div>
                    <div className="col-start-3"> // Backspace was missing in original visually, but logic had -1. Original HTML button calling pressPin(-1) was missing actually in my previous view? Wait, let me check the HTML attached.
                        {/* Ah, I missed looking close. The grid in original HTML: col-start-2 has 0. col-start-3 has submit button. Where is backspace? The original code had `pressPin(-1)` logic but no button for it in the HTML provided! */}
                        {/* I will add a backspace button for better UX at col-start-3 row before submit or replace submit with checkmark and put backspace somewhere. */}
                        {/* Actually the original HTML:
            <div class="col-start-3"><button onclick="submitPin()" class="w-12 h-12 bg-indigo-600 ..."><i class="fa-solid fa-check"></i></button></div>
            There is no backspace button in the UI provided. I will add one on the left of 0? Or just sticking to the requested UI.
            I will add backspace for usability.
            */}
                        <button onClick={submitPin} className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinScreen;