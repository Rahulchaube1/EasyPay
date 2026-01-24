import React, { useState } from 'react';

const RewardsScreen = ({ navigate, showToast }) => {
    const [scratched, setScratched] = useState(false);

    const revealReward = () => {
        setScratched(true);
        showToast('You won ₹15!');
    };

    return (
        <div id="screen-rewards" className="screen p-5 bg-indigo-50 min-h-full">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('home')} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-xl text-slate-800">Rewards</h2>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 text-center">
                <h3 className="text-4xl font-bold text-slate-800">₹845</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-1 shadow-sm h-32 relative overflow-hidden cursor-pointer" onClick={revealReward}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
                        <span className="text-xs font-bold text-green-600">Won ₹15</span>
                    </div>
                    <div className={`scratch-cover absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white ${scratched ? 'scratched' : ''}`}>
                        <i className="fa-solid fa-gift text-2xl mb-1"></i>
                        <span className="text-[10px] font-bold">Scratch</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsScreen;