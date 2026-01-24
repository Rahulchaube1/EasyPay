import React, { useState } from 'react';

const SmartBudgetScreen = ({ navigate }) => {
  const [budget, setBudget] = useState(20000);
  const [aiPlan, setAiPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAIPlan = () => {
    setLoading(true);
    setTimeout(() => {
      setAiPlan('Limit daily spend to ₹600');
      setLoading(false);
    }, 1000);
  };

  return (
    <div id="screen-smart-budget" className="screen p-5 bg-white flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('more')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="font-bold text-xl text-slate-800">Budget</h2>
      </div>
      <div className="bg-slate-900 text-white p-6 rounded-3xl mb-6 shadow-xl relative overflow-hidden">
        <p className="text-xs text-slate-400 font-bold uppercase">Monthly Limit</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">₹</span>
          <input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)} 
            className="bg-transparent text-4xl font-bold w-full outline-none" 
          />
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div id="budget-progress" className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: '62%' }}></div>
        </div>
      </div>
      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 mb-20">
        <h3 className="font-bold text-indigo-900 text-sm mb-2">AI Analysis</h3>
        {aiPlan && <div id="ai-budget-plan" className="text-xs text-slate-600 mb-2">{aiPlan}</div>}
        <button onClick={generateAIPlan} className="w-full py-2 bg-white border border-indigo-200 text-indigo-600 rounded-xl text-xs font-bold">
          {loading ? 'Analyzing...' : (aiPlan ? 'Regenerate' : 'Generate Plan')}
        </button>
      </div>
    </div>
  );
};

export default SmartBudgetScreen;