import React from 'react';

const LockScreen = ({ unlockApp }) => {
    return (
        <div id="screen-lock" className="screen flex flex-col items-center justify-center bg-slate-900 text-white z-[100] fixed inset-0">
            <div className="mb-8 p-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 relative cursor-pointer active:scale-95 transition" onClick={unlockApp}>
                <i className="fa-solid fa-fingerprint text-6xl text-indigo-400"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <button onClick={unlockApp} className="px-8 py-3 rounded-full border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 transition text-sm font-medium">Use PIN</button>
        </div>
    );
};

export default LockScreen;