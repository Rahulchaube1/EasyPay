import React, { useState, useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

const ScanScreen = ({ navigate, showToast, fillPayment }) => {
    const [scanning, setScanning] = useState(true);
    const [cameraError, setCameraError] = useState('');
    const videoRef = useRef(null);
    // Camera access and QR scanning
    useEffect(() => {
        let stream;
        let codeReader;
        if (scanning && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then((mediaStream) => {
                    stream = mediaStream;
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    // Start QR scanning
                    codeReader = new BrowserQRCodeReader();
                    codeReader.decodeFromVideoElement(videoRef.current, (result, err) => {
                        if (result) {
                            setScanning(false);
                            showToast('QR Code Detected!');
                            // You can parse result.text for UPI or other QR data
                            // For demo, just pass the text to fillPayment
                            setTimeout(() => {
                                fillPayment(result.text);
                            }, 1000);
                        }
                    });
                })
                .catch((err) => {
                    setCameraError('Unable to access camera: ' + err.message);
                });
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (codeReader) {
                codeReader.reset();
            }
        };
    }, [scanning]);

    // Mock QR Data - in real app this comes from scanner
    const mockUPI = {
        name: 'Rahul Chaube',
        upiId: 'rahul@easypay',
        verified: true
    };

    const handleFileUpload = (e) => {
        // Simulation of reading QR from file
        const file = e.target.files[0];
        if (file) {
            setScanning(false);
            showToast('QR Code Analyzed!');
            setTimeout(() => {
                fillPayment(mockUPI.name); 
            }, 1000);
        }
    };

    return (
        <div id="screen-scan" className="screen h-full bg-slate-900 relative flex flex-col font-sans">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-between items-center z-30 bg-gradient-to-b from-black/50 to-transparent">
                 <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                     <span className="text-xs font-bold text-white flex items-center gap-2"><i className="fa-solid fa-bolt text-yellow-400"></i> EasyPay Scanner</span>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Camera Viewport */}
            <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Camera Video Feed */}
                <div className="relative w-72 h-72 rounded-3xl overflow-hidden z-20 bg-black">
                    {cameraError ? (
                        <div className="flex items-center justify-center h-full text-red-400 text-center p-4">{cameraError}</div>
                    ) : (
                        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
                    )}
                    {/* Scanner Overlay */}
                    <div className="absolute inset-0 border-[3px] border-white/30 rounded-3xl pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-[6px] border-l-[6px] border-indigo-500 rounded-tl-3xl pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-[6px] border-r-[6px] border-indigo-500 rounded-tr-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-indigo-500 rounded-bl-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[6px] border-r-[6px] border-indigo-500 rounded-br-3xl pointer-events-none"></div>
                    {/* Laser Scan Animation */}
                    <div className="absolute top-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1] animate-[scan_2s_infinite_linear] pointer-events-none"></div>
                </div>
                <div className="z-20 mt-8 space-y-2 text-center">
                    <h3 className="text-white font-bold text-lg animate-pulse">Scanning QR Code...</h3>
                    <p className="text-slate-300 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">Align QR code within the frame</p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-black/80 backdrop-blur-xl p-6 rounded-t-3xl border-t border-white/10 z-30">
                <div className="grid grid-cols-2 gap-4">
                    {/* Upload Button */}
                    <div className="relative">
                        <button className="w-full py-3 bg-white/10 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition">
                            <i className="fa-solid fa-image text-indigo-400"></i> Upload from Gallery
                        </button>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                        />
                    </div>
                    {/* Flash Toggle */}
                    <button className="w-full py-3 bg-white/10 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition">
                         <i className="fa-solid fa-bolt text-yellow-500"></i> Flash On
                    </button>
                </div>
            </div>
            
            {/* CSS Animation for scanning line */}
             <style>{`
                @keyframes scan {
                    0% { top: 10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 90%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default ScanScreen;
