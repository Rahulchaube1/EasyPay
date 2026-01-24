import React, { useEffect, useState } from 'react';

const SuccessScreen = ({ navigate, amount }) => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        // Navigate to success, play sound (optional)
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3");
        audio.play().catch(e => console.error("Audio play failed", e));

        // Create bubbles
        const newBubbles = [];
        for (let i = 0; i < 20; i++) {
            newBubbles.push({
                id: i,
                size: Math.random() * 40 + 10,
                left: Math.random() * 100,
                animationDelay: Math.random() * 0.5
            });
        }
        setBubbles(newBubbles);
    }, []);

    return (
        <div id="screen-success" className="screen h-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
            <div id="bubble-container" className="absolute inset-0 pointer-events-none z-0">
                {bubbles.map(b => (
                    <div key={b.id} className="bubble" style={{
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        left: `${b.left}%`,
                        animationDelay: `${b.animationDelay}s`
                    }}></div>
                ))}
            </div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce mb-4">
                    <i className="fa-solid fa-check text-4xl text-green-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800" id="success-msg">Payment Successful!</h2>
                <p className="text-4xl font-bold text-slate-800 mt-2" id="success-amount">₹{amount || 500}</p>
                <button onClick={() => navigate('home')} className="mt-12 px-10 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg">Done</button>
            </div>
        </div>
    );
};

export default SuccessScreen;