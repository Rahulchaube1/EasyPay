import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const SuccessScreen = ({ navigate, amount }) => {
    // We allow a "name" prop or assume a default
    const receiverName = "Rahul Chaube"; // In a real app, pass this via props

    useEffect(() => {
        // 1. Play Success Sound
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3");
        audio.play().catch(e => console.log("Audio autoplay prevented"));

        // 2. Text-to-Speech
        const msg = new SpeechSynthesisUtterance();
        msg.text = `Payment of ${amount} rupees sent successfully to ${receiverName}`;
        msg.rate = 1;
        msg.pitch = 1;
        // Use a generic English voice if available
        window.speechSynthesis.speak(msg);

        // 3. Confetti Explosion
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

    }, [amount]);

    return (
        <div id="screen-success" className="screen h-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 relative overflow-hidden font-sans">
            
            {/* Background Decoration */}
            <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse"></div>
            
            {/* Success Card */}
            <div className="relative z-10 flex flex-col items-center animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Animated Checkmark */}
                <div className="relative mb-8">
                    <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center shadow-2xl shadow-green-500/40 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
                        <i className="fa-solid fa-check text-5xl text-white"></i>
                    </div>
                    {/* Ripple Effect */}
                    <div className="absolute top-0 left-0 w-28 h-28 rounded-full bg-green-500 animate-ping opacity-20"></div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">Payment Successful!</h2>
                
                <div className="flex flex-col items-center my-6">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">AMOUNT PAID</span>
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">₹{amount}</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700 shadow-sm mb-10 w-64">
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${receiverName}`} 
                        className="w-12 h-12 rounded-full bg-white p-0.5" 
                        alt="Receiver" 
                    />
                    <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Paid to</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{receiverName}</p>
                        <p className="text-[10px] text-slate-500">dbt_459039393</p>
                    </div>
                </div>

                <div className="flex gap-3 w-full max-w-xs px-4">
                     <button onClick={() => navigate('home')} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 transition">Close</button>
                     <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-share-nodes"></i> Share
                     </button>
                </div>

            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-8 flex items-center gap-2 opacity-50">
                <i className="fa-solid fa-lock text-xs text-slate-400"></i>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured by EasyPay</span>
            </div>

             <style>{`
                @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SuccessScreen;
