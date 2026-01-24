import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import InsightsScreen from './components/InsightsScreen';
import ServicesScreen from './components/ServicesScreen';
import CardCategoryScreen from './components/CardCategoryScreen';
import DebitCardDetailsScreen from './components/DebitCardDetailsScreen';
import InvestmentScreen from './components/InvestmentScreen';
import ChatScreen from './components/ChatScreen';
import HistoryScreen from './components/HistoryScreen';
import SmartBudgetScreen from './components/SmartBudgetScreen';
import RewardsScreen from './components/RewardsScreen';
import MoreScreen from './components/MoreScreen';
import PaymentScreen from './components/PaymentScreen';
import PinScreen from './components/PinScreen';
import SuccessScreen from './components/SuccessScreen';
import ScanScreen from './components/ScanScreen';
import BankScreen from './components/BankScreen';
import MyQRScreen from './components/MyQRScreen';
import SplitBillScreen from './components/SplitBillScreen';
import NotificationScreen from './components/NotificationScreen';
import MySavingScreen from './components/MySavingScreen';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import PermissionScreen from './components/auth/PermissionScreen';
import { getUserProfile } from './services/SecureCloud';

// Translation Data
import { translations } from './data/translations';

// Implementation of Translations Context
export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [screen, setScreen] = useState('signup'); // Default to signup for new users
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [voiceActive, setVoiceActive] = useState(false);
  const [theme, setTheme] = useState('light');

  // Language State
  const [language, setLanguage] = useState('en');

  // Helper to translate
  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  // User Profile State (Shared between Header and Settings)
  const [userProfile, setUserProfile] = useState({
    name: "Guest User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
  });

  useEffect(() => {
    // Check "Local Cloud" for existing user
    const checkUser = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          setUserProfile(user);
          setScreen('lock'); // User exists, go to lock
        }
      } catch (e) {
        console.error("Cloud Error", e);
      }
    };
    checkUser();
  }, []);

  const handleLoginSuccess = (user) => {
    if (user) setUserProfile(user);
    setScreen('permission');
  };

  const activeAuthParams = {}; // To pass params if needed
  const [paymentDetails, setPaymentDetails] = useState({ name: '', amount: '' });
  const [navParams, setNavParams] = useState({});

  const navigate = (screenName, params = {}) => {
    setNavParams(params);
    setScreen(screenName);
    // Reset sidebar if navigating
    setSidebarOpen(false);
  };

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: '', show: false }), 3000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const activateVoice = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setVoiceActive(false);
      showToast('Listening...');
    }, 2000);
  };

  const closeVoice = () => setVoiceActive(false);

  const fillPayment = (name, upiId) => {
    setPaymentDetails({ ...paymentDetails, name });
    navigate('pay');
  };

  const initiatePin = (amount) => {
    if (!amount) return showToast('Enter Amount');
    setPaymentDetails({ ...paymentDetails, amount });
    navigate('pin');
  };

  const processSuccess = () => {
    navigate('success');
  };

  // Logic from original script
  const checkBalanceInit = () => {
    setPaymentDetails({ name: 'Balance Check', amount: 'Check' });
    navigate('pin');
  };

  const openScan = () => {
    navigate('scan');
  };

  const openPaySelect = () => {
    navigate('home');
    showToast('Select contact');
  };

  const unlockApp = () => navigate('home');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={`relative w-full h-[100dvh] bg-slate-50 dark:bg-slate-900 dark:text-white sm:max-w-md sm:h-[95vh] sm:rounded-[40px] sm:ring-8 sm:ring-black/5 shadow-2xl overflow-hidden flex flex-col transition-colors duration-300`}>
        {/* Toast */}
        {toast.show && (
          <div id="toast" className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-xl text-sm transition-all duration-300 z-[80] whitespace-nowrap flex items-center gap-2" style={{ opacity: 1, top: '100px' }}>
            <i className="fa-solid fa-circle-info text-indigo-400"></i>
            <span>{toast.msg}</span>
          </div>
        )}

        {/* Voice Overlay */}
        {voiceActive && (
          <div id="voice-overlay" className="absolute inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mb-6 animate-[pulse-ring_2s_infinite]">
              <i className="fa-solid fa-microphone text-3xl"></i>
            </div>
            <p className="text-xl font-medium">Listening...</p>
            <button onClick={closeVoice} className="mt-8 px-6 py-2 border border-white/30 rounded-full text-sm">Cancel</button>
          </div>
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} navigate={navigate} />

        {/* Screens that have header */}
        {!['lock', 'scan', 'pin', 'success', 'my-qr', 'pay', 'bank', 'notification', 'chat', 'login', 'signup', 'permission'].includes(screen) && (
          <Header navigate={navigate} toggleMenu={() => setSidebarOpen(!sidebarOpen)} activateVoice={activateVoice} userProfile={userProfile} />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto no-scrollbar relative bg-slate-50 dark:bg-slate-900 ${['lock', 'scan', 'pin', 'success', 'login', 'signup', 'permission'].includes(screen) ? '' : 'pb-28 pt-24'} transition-colors duration-300`}>
          {screen === 'signup' && <SignupScreen navigate={navigate} onLoginSuccess={() => setScreen('permission')} />}
          {screen === 'login' && <LoginScreen navigate={navigate} onLoginSuccess={handleLoginSuccess} />}
          {screen === 'permission' && <PermissionScreen onComplete={() => setScreen('home')} />}

          {screen === 'lock' && <LockScreen unlockApp={unlockApp} />}
          {screen === 'home' && <HomeScreen navigate={navigate} openScan={openScan} openPaySelect={openPaySelect} fillPayment={fillPayment} checkBalanceInit={checkBalanceInit} showToast={showToast} />}
          {screen === 'notification' && <NotificationScreen navigate={navigate} />}
          {screen === 'insights' && <InsightsScreen navigate={navigate} showToast={showToast} />}
          {screen === 'all-services' && <ServicesScreen navigate={navigate} />}
          {screen === 'card-category' && <CardCategoryScreen navigate={navigate} categoryType={navParams.type} />}
          {screen === 'debit-card-details' && <DebitCardDetailsScreen navigate={navigate} showToast={showToast} />}
          {screen === 'investment' && <InvestmentScreen navigate={navigate} />}
          {screen === 'chat' && <ChatScreen navigate={navigate} />}
          {screen === 'history' && <HistoryScreen navigate={navigate} />}
          {screen === 'smart-budget' && <SmartBudgetScreen navigate={navigate} />}
          {screen === 'rewards' && <RewardsScreen navigate={navigate} showToast={showToast} />}
          {screen === 'more' && <MoreScreen navigate={navigate} toggleTheme={toggleTheme} currentTheme={theme} userProfile={userProfile} setUserProfile={setUserProfile} />}
          {screen === 'split-bill' && <SplitBillScreen navigate={navigate} showToast={showToast} />}
          {screen === 'mysaving' && <MySavingScreen navigate={navigate} />}

          {/* Payment Flow */}
          {screen === 'pay' && <PaymentScreen navigate={navigate} paymentDetails={paymentDetails} initiatePin={initiatePin} />}
          {screen === 'pin' && <PinScreen amount={paymentDetails.amount} showToast={showToast} processSuccess={processSuccess} />}
          {screen === 'success' && <SuccessScreen navigate={navigate} amount={paymentDetails.amount} />}
          {screen === 'scan' && <ScanScreen navigate={navigate} showToast={showToast} fillPayment={fillPayment} />}
          {screen === 'bank' && <BankScreen navigate={navigate} showToast={showToast} fillPayment={fillPayment} />}
          {screen === 'my-qr' && <MyQRScreen navigate={navigate} showToast={showToast} />}
        </main>

        {/* Navbar - hidden on certain screens */}
        {/* Logic moved to Navbar component or controlled here? Navbar component controls its own visibility class, but we can also just conditionally render it. */}
        {/* The original code had the navbar present but translated down. Let's keep it rendered for transition effects if we wanted, but simple conditional rendering is React-way. However, for animation like slideDown, keeping it and adding class is better. */}
        <Navbar activeScreen={screen} navigate={navigate} />

      </div>
    </LanguageContext.Provider>
  );
}

export default App;
