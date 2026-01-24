import React, { useEffect } from 'react';

const ScanScreen = ({ navigate, showToast, fillPayment }) => {
    useEffect(() => {
        // Simulate query detection
        const timer = setTimeout(() => {
            showToast('QR Detected');
            fillPayment('Store');
            // The App component will handle navigation to payment after this
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="screen-scan" className="screen h-full bg-black relative flex flex-col">
            <div className="absolute top-5 left-5 z-20">
                <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center relative flex-1">
                <div className="relative w-64 h-64 border-2 border-white/30 rounded-3xl overflow-hidden z-10">
                    <div className="absolute w-full h-1 bg-green-400 shadow-[0_0_15px_#4ade80] animate-[scan_2s_infinite_linear]"></div>
                </div>
                <p className="text-white mt-8 z-10 font-medium">Scanning...</p>
            </div>
        </div>
    );
};

export default ScanScreen;