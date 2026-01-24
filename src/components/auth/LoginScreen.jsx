import React, { useState } from 'react';
import { getUserProfile } from '../../services/SecureCloud';
import { useLanguage } from '../../App';

const LoginScreen = ({ navigate, onLoginSuccess }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ identifier: '', password: '' }); // identifier = email or phone
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            // Fetch from "Local Cloud"
            const user = await getUserProfile();

            // Simulate network delay
            setTimeout(() => {
                setIsLoading(false);
                if (user && (user.email === formData.identifier || user.phone === formData.identifier) && user.password === formData.password) {
                    onLoginSuccess(user);
                } else {
                    alert("Invalid Credentials or No Local Cloud Account Found");
                }
            }, 1500);
        } catch (error) {
            console.error("Cloud Error", error);
            setIsLoading(false);
            alert("Error connecting to Local Cloud");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px]"></div>

            <div className="w-full max-w-sm z-10 glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
                    <p className="text-sm text-slate-400">Login to access your 40GB Secure Storage</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-400 ml-1">EMAIL OR PHONE</label>
                        <input
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Enter email or phone"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 ml-1">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-lg shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Login Securely"}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">Don't have a specific cloud account?</p>
                    <button onClick={() => navigate('signup')} className="text-purple-400 font-bold hover:text-purple-300 transition-colors">Create 40GB Account</button>
                    <div className="mt-4">
                        <button onClick={() => navigate('home')} className="text-slate-500 text-xs hover:text-white transition-colors">Continue as Guest (Mock Data)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
