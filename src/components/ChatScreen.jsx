import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../App';

const ChatScreen = ({ navigate }) => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            type: 'ai', 
            text: 'chat_welcome', // Key for translation
            isTranslatable: true 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatHistoryRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTo({
                top: chatHistoryRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    // Quick Suggestions
    const suggestions = [
        { id: 'spend', label: 'suggestion_spend', icon: 'fa-chart-pie' },
        { id: 'save', label: 'suggestion_save', icon: 'fa-piggy-bank' },
        { id: 'invest', label: 'suggestion_invest', icon: 'fa-arrow-trend-up' },
        { id: 'credit', label: 'suggestion_credit', icon: 'fa-gauge-high' },
    ];

    const simulateResponse = (promptType) => {
        setIsTyping(true);
        setTimeout(() => {
            let responseMsg = { id: Date.now(), type: 'ai', text: '', widget: null };
            
            // Mock AI Logic
            switch(promptType) {
                case 'spend':
                    responseMsg.text = "Here is your spending analysis for this month. You've spent slightly more on food.";
                    responseMsg.widget = 'spending_chart';
                    break;
                case 'credit':
                    responseMsg.text = "I checked your credit report. Your score is looking great!";
                    responseMsg.widget = 'credit_score';
                    break;
                case 'invest':
                    responseMsg.text = "Based on your risk profile, here are some trending funds:";
                    responseMsg.widget = 'invest_list';
                    break;
                default:
                    responseMsg.text = "I can help you with that. Let's look at your financial data.";
            }

            setMessages(prev => [...prev, responseMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = (text) => {
        const msgText = text || input;
        if (!msgText.trim()) return;

        // User Message
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: msgText }]);
        setInput('');

        // AI Response Trigger
        if (text) {
             // If triggered via suggestion
             const type = suggestions.find(s => t(s.label) === text)?.id || 'general';
             simulateResponse(type);
        } else {
            simulateResponse('general');
        }
    };

    return (
        <div id="screen-chat" className="screen bg-slate-50 dark:bg-slate-900 flex flex-col h-full relative overflow-hidden">
            
            {/* 1. Header (Glassmorphism) */}
            <div className="absolute top-0 left-0 w-full z-20 px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('home')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <i className="fa-solid fa-robot text-lg animate-[pulse_3s_infinite]"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white leading-tight">EverestQ <span className="text-[9px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded font-black align-top">AI</span></h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-[10px] text-slate-500 font-medium">Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                </button>
            </div>

            {/* 2. Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-36 pt-24 space-y-6" ref={chatHistoryRef}>
                
                <div className="text-center py-4 opacity-50">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t('today') || 'TODAY'}</p>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
                        {msg.type === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs mr-2 mt-2 shrink-0">
                                <i className="fa-solid fa-robot"></i>
                            </div>
                        )}
                        
                        <div className={`max-w-[80%] space-y-2`}>
                            <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                msg.type === 'user' 
                                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-tr-sm' 
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm'
                            }`}>
                                {msg.isTranslatable ? t(msg.text) : msg.text}
                            </div>

                            {/* Widgets (Rich UI) */}
                            {msg.widget === 'spending_chart' && (
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm animate-[fadeIn_0.5s_ease-out]">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Total Spent</p>
                                            <h4 className="text-xl font-bold text-slate-800 dark:text-white">₹24,500</h4>
                                        </div>
                                        <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                                            <i className="fa-solid fa-arrow-trend-up"></i> 12%
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[60%] bg-indigo-500 rounded-full"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>Start: 1st Jan</span>
                                            <span>Target: ₹30k</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded font-bold"> Food: 40%</span>
                                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold"> Shop: 25%</span>
                                    </div>
                                </div>
                            )}

                             {msg.widget === 'credit_score' && (
                                <div className="bg-slate-900 p-4 rounded-2xl shadow-lg shadow-indigo-500/10 text-white animate-[fadeIn_0.5s_ease-out] w-64">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-slate-400">CREDIT SCORE</span>
                                        <i className="fa-solid fa-shield-halved text-green-400"></i>
                                    </div>
                                    <div className="text-center relative py-2">
                                        <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">785</h2>
                                        <p className="text-xs font-bold text-green-400 mt-1">EXCELLENT</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-[10px] text-slate-400">
                                        <span>On time: 100%</span>
                                        <span>Util: 12%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-[fadeIn_0.2s]">
                         <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-xs mr-2 mt-2">
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm flex gap-1 items-center h-10 w-16 justify-center">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Input Footer */}
            <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-20 pb-[env(safe-area-inset-bottom)]">
                
                {/* Suggestions Scroll */}
                <div className="overflow-x-auto scrollbar-hide flex gap-2 p-3 bg-slate-50/50 dark:bg-slate-800/50">
                    {suggestions.map((s) => (
                        <button 
                            key={s.id} 
                            onClick={() => handleSend(t(s.label))}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-200 shadow-sm hover:border-indigo-500 hover:text-indigo-600 transition whitespace-nowrap"
                        >
                            <i className={`fa-solid ${s.icon} text-indigo-500`}></i>
                            {t(s.label)}
                        </button>
                    ))}
                </div>

                {/* Input Bar */}
                <div className="p-3 flex items-end gap-2 text-slate-800 dark:text-white">
                    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition">
                        <i className="fa-solid fa-microphone"></i>
                    </button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 px-4 py-2.5 min-h-[44px] border border-transparent focus-within:border-indigo-500 transition-colors">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            // onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder={t('ask_placeholder') || 'Ask anything...'}
                            className="flex-1 bg-transparent text-sm outline-none resize-none max-h-24 py-1 text-slate-800 dark:text-white placeholder-slate-400"
                            rows={1}
                        />
                        <button className="text-slate-400 hover:text-slate-600">
                            <i className="fa-solid fa-paperclip"></i>
                        </button>
                    </div>
                    <button 
                        onClick={() => handleSend(null)}
                        disabled={!input.trim()}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all transform ${
                            input.trim() 
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 scale-100' 
                            : 'bg-slate-300 dark:bg-slate-700 scale-95 opacity-70 cursor-not-allowed'
                        }`}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ChatScreen;
