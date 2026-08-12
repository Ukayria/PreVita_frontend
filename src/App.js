import { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import OTPScreen from './screens/OTPScreen';
import SetupScreen from './screens/SetupScreen';
import HomeScreen from './screens/HomeScreen';
import CheckScreen from './screens/CheckScreen';
import AnalyzingScreen from './screens/AnalyzingScreen';
import ResultsScreen from './screens/ResultsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import TeleconsultScreen from './screens/TeleconsultScreen';
import SelfCareScreen from './screens/SelfCareScreen';
import NearbyClinicScreen from './screens/NearbyClinicScreen';
import { checkSymptoms } from './services/api';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [currentSymptoms, setCurrentSymptoms] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
//old
 // const [language, setLanguage] = useState('English');
//old

//new
const [language, setLanguage] = useState(
  () => localStorage.getItem('previta-language') || 'English'
);
//new
  const [authMode, setAuthMode] = useState('signup');
  const [apiError, setApiError] = useState(null);

  const navigate = (s) => setScreen(s);

  const handleAnalyze = async (payload) => {
    setCurrentSymptoms(payload.symptoms);
    setScreen('analyzing');
    setApiError(null);
    try {
      const result = await checkSymptoms({
        user_id: user?.email || 'guest',
        age_range: '18-30',
        gender: user?.sex || 'Female',
        symptoms: payload.symptoms,
        duration: payload.duration,
        severity: payload.severity,
        language: language,
      });
      setCurrentResult(result);
      setScreen('results');
    } catch (e) {
      setApiError('Analysis failed. Please check your connection and try again.');
      setScreen('check');
    }
  };

  const handleSaveResult = () => {
    if (!currentResult) return;
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      symptoms: currentSymptoms,
      result: currentResult,
    };
    setHistory(prev => [entry, ...prev]);
  };


  //new
  const handleLanguageChange = (newLanguage) => {
  setLanguage(newLanguage);
  localStorage.setItem('previta-language', newLanguage);
};
  //new

  const props = { language, onNavigate: navigate };

  return (
    //old
    // <div style={{
    //   maxWidth: 430, margin: '0 auto', minHeight: '100vh',
    //   background: '#F5F5F5', position: 'relative',
    //   fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // }}>
    //old

    //new
    <div style={{
  width: '100%',
  minHeight: '100vh',
  background: '#F5F5F5',
  position: 'relative',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}}>
{/* new */}
      {apiError && (
        <div style={{
          background: '#FEE2E2', padding: '10px 20px', fontSize: 13,
          color: '#DC2626', borderBottom: '1px solid #FBBCBC',
          position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430, zIndex: 999, boxSizing: 'border-box',
        }}>
          ⚠ {apiError}
          <span onClick={() => setApiError(null)} style={{ float: 'right', cursor: 'pointer', fontWeight: 700 }}>✕</span>
        </div>
      )}

      {screen === 'splash' && (
        <SplashScreen
          onFinish={() => { setAuthMode('signup'); setScreen('auth'); }}
          onLogin={() => { setAuthMode('login'); setScreen('auth'); }}
          language={language}
        />
      )}

      {screen === 'auth' && (
        <AuthScreen initialMode={authMode} onSuccess={() => setScreen('otp')} {...props} />
      )}

      {screen === 'otp' && (
        <OTPScreen onSuccess={() => setScreen('setup')} {...props} />
      )}

      {screen === 'setup' && (
        <SetupScreen onComplete={(data) => { setUser(data); setScreen('home'); }} {...props} />
      )}

      {screen === 'home' && (
        <HomeScreen user={user} history={history} {...props} />
      )}

      {screen === 'chat' && (
        <ChatScreen onBack={() => setScreen('home')} user={user} {...props} />
      )}

      {screen === 'check' && (
        <CheckScreen onAnalyze={handleAnalyze} onBack={() => setScreen('home')} {...props} />
      )}

      {screen === 'analyzing' && <AnalyzingScreen language={language} />}

      {screen === 'results' && currentResult && (
        <ResultsScreen
          result={currentResult} symptoms={currentSymptoms}
          onNewCheck={() => setScreen('check')}
          onSave={handleSaveResult} {...props}
        />
      )}

      {screen === 'teleconsult' && (
        <TeleconsultScreen onBack={() => setScreen('results')} symptoms={currentSymptoms} {...props} />
      )}

      {screen === 'selfcare' && (
        <SelfCareScreen onBack={() => setScreen('results')} symptoms={currentSymptoms}
          riskSummary={currentResult?.risk_summary} {...props} />
      )}

      {screen === 'nearby' && (
        <NearbyClinicScreen onBack={() => setScreen('results')} symptoms={currentSymptoms}
          riskLevel={currentResult?.risk_level} user={user} {...props} />
      )}

      {screen === 'history' && (
        <HistoryScreen history={history}
          onViewReport={(entry) => { setSelectedReport(entry); setScreen('report'); }}
          {...props}
        />
      )}

      {screen === 'report' && selectedReport && (
        <ReportScreen entry={selectedReport} onBack={() => setScreen('history')} {...props} />
      )}

      {screen === 'profile' && (
        <ProfileScreen user={user}
          onSignOut={() => { setUser(null); setScreen('splash'); }}
          // old
          // onLanguageChange={setLanguage} {...props}
          // 
          onLanguageChange={handleLanguageChange} {...props}
        />
      )}
    </div>
  );
}