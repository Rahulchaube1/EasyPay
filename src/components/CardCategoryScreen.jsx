import React from 'react';

const CardCategoryScreen = ({ navigate, categoryType }) => {
    const getCards = () => {
        let cardsData = [{ name: 'Generic Card', num: '0000', bg: 'from-gray-500 to-gray-700', icon: 'fa-credit-card' }];
        if (categoryType === 'credit') {
            cardsData = [{ name: 'Visa Infinite', num: '9988', bg: 'from-slate-800 to-black', icon: 'fa-cc-visa' }];
        }
        // Add logic for other types if needed
        return cardsData;
    };

    const cards = getCards();
    const title = categoryType === 'credit' ? 'Credit Cards' : 'Cards';

    return (
        <div id="screen-card-category" className="screen p-5 bg-slate-50">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('home')} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="font-bold text-xl text-slate-800" id="card-category-title">{title}</h2>
            </div>
            <div id="cards-container" className="space-y-6 pb-20">
                {cards.map((c, index) => (
                    <div key={index} className={`w-full h-48 rounded-2xl bg-gradient-to-br ${c.bg} p-6 text-white shadow-xl relative overflow-hidden card-shine transform transition hover:scale-[1.02] cursor-pointer`} onClick={() => navigate('debit-card-details')}>
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <i className={`fa-brands ${c.icon} text-7xl`}></i>
                        </div>
                        <div className="flex justify-between mb-8">
                            <span className="text-xs font-medium tracking-widest uppercase opacity-80">{c.name}</span>
                            <i className="fa-solid fa-wifi text-xl"></i>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-8 bg-yellow-400 rounded-md opacity-80"></div>
                            <p className="text-xl font-mono tracking-widest text-shadow">**** **** **** {c.num}</p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] opacity-60 uppercase">Holder</span>
                                <span className="text-xs font-bold tracking-wide">RAHUL CHAUBE</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardCategoryScreen;