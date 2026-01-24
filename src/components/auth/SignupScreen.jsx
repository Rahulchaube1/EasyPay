import React, { useState } from 'react';
import { saveUserProfile } from '../../services/SecureCloud';
import { useLanguage } from '../../App';

const SignupScreen = ({ navigate, onLoginSuccess }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setIsLoading(true);
        try {
            // Save to "Local Cloud"
            await saveUserProfile({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password, // In real app, hash this!
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
                joinedAt: new Date().toISOString()
            });

            // Simulate network delay for "Real Time Backend" feel
            setTimeout(() => {
                setIsLoading(false);
                onLoginSuccess(); // Move to Permissions
            }, 2000);
        } catch (error) {
            console.error("Cloud Error", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px]"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[100px]"></div>

            <div className="w-full max-w-sm z-10 glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">EasyPay Cloud</h1>
                    <p className="text-sm text-slate-400 mt-2">Create your secure 40GB Local Cloud Account</p>
                </div>

                <div className="space-y-4">
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1">FULL NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1">PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-lg shadow-lg shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                            >
                                Continue <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1">CREATE PASSWORD</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1">CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                onClick={handleSignup}
                                disabled={isLoading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-lg shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-95 transition-all mt-6 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Create Secure Account"}
                            </button>
                            <button onClick={() => setStep(1)} className="w-full text-slate-400 text-sm py-2">Back</button>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">Already have an account?</p>
                    <button onClick={() => navigate('login')} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Log In Securely</button>
                    <div className="mt-4">
                        <button onClick={() => navigate('home')} className="text-slate-500 text-xs hover:text-white transition-colors">Continue as Guest (Mock Data)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;
