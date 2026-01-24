import React, { useState } from 'react';

const PermissionScreen = ({ onComplete }) => {
    const [permissions, setPermissions] = useState({
        contacts: false,
        camera: false,
        storage: false,
        bank: false
    });

    const requestPermission = (type) => {
        // In a real mobile app (React Native/Ionic), we would call navigator.permissions.query or specific cordova plugins here.
        // For web PWA, we simulate the browser prompt experience.

        let confirmMsg = "";
        switch (type) {
            case 'contacts': confirmMsg = "Allow 'EasyPay' to access your contacts to find friends?"; break;
            case 'camera': confirmMsg = "Allow 'EasyPay' to access your camera for QR scanning?"; break;
            case 'storage': confirmMsg = "Allow 'EasyPay' to access photos/media for 40GB Cloud Storage?"; break;
            case 'bank': confirmMsg = "Securely link your Primary Bank Account for Real-time transactions?"; break;
        }

        if (window.confirm(confirmMsg)) {
            setPermissions(prev => ({ ...prev, [type]: true }));
        }
    };

    const handleContinue = () => {
        if (Object.values(permissions).every(p => p)) {
            onComplete();
        } else {
            if (window.confirm("You haven't granted all permissions. Some features like 'Real Time Payments' may not work. Continue anyway?")) {
                onComplete();
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col pt-20">
            <h1 className="text-2xl font-bold mb-2">Setup Your Experience</h1>
            <p className="text-slate-400 text-sm mb-8">To provide Real-Time Payments and 40GB Cloud Backup, we need the following permissions:</p>

            <div className="space-y-4 flex-1">
                <PermissionItem
                    icon="fa-address-book"
                    title="Access Contacts"
                    desc="To send money to friends and find people nearby."
                    isGranted={permissions.contacts}
                    onGrant={() => requestPermission('contacts')}
                />
                <PermissionItem
                    icon="fa-camera"
                    title="Camera Access"
                    desc="Required for scanning QR codes and Profile verification."
                    isGranted={permissions.camera}
                    onGrant={() => requestPermission('camera')}
                />
                <PermissionItem
                    icon="fa-hard-drive"
                    title="40GB Cloud Storage"
                    desc="Backup user data, photos, and documents securely."
                    isGranted={permissions.storage}
                    onGrant={() => requestPermission('storage')}
                />
                <PermissionItem
                    icon="fa-building-columns"
                    title="Link Bank Account"
                    desc="Connect for Real-Time Money Transfers."
                    isGranted={permissions.bank}
                    onGrant={() => requestPermission('bank')}
                />
            </div>

            <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${Object.values(permissions).every(p => p) ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-900/20' : 'bg-slate-700 text-slate-400'}`}
            >
                {Object.values(permissions).every(p => p) ? "Enter EasyPay" : "Skip & Continue"}
            </button>
        </div>
    );
};

const PermissionItem = ({ icon, title, desc, isGranted, onGrant }) => (
    <div className={`p-4 rounded-xl border transition-all ${isGranted ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isGranted ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <i className={`fa-solid ${icon}`}></i>
                </div>
                <div>
                    <h3 className={`font-bold ${isGranted ? 'text-emerald-400' : 'text-white'}`}>{title}</h3>
                    <p className="text-[10px] text-slate-400 max-w-[200px] leading-tight mt-0.5">{desc}</p>
                </div>
            </div>
            <button
                onClick={onGrant}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isGranted ? 'bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
            >
                {isGranted ? <i className="fa-solid fa-check"></i> : "Allow"}
            </button>
        </div>
    </div>
);

export default PermissionScreen;
