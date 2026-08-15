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

  // Language
  const [language, setLanguage] = useState(
    () => localStorage.getItem('previta-language') || 'English'
  );

  // Profile picture
  const handleProfileImageUpdate = (imageUrl) => {
    setUser(prev => ({
      ...prev,
      profile_picture: imageUrl,
    }));
  };

  const [authMode, setAuthMode] = useState('signup');
  const [apiError, setApiError] = useState(null);

  const navigate = (s) => {
    setScreen(s);
  };

  // Analyze symptoms
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
      setApiError(
        'Analysis failed. Please check your connection and try again.'
      );
      setScreen('check');
    }
  };

  // Save result
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

  // Language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('previta-language', newLanguage);
  };

  // Props shared with screens
  const props = {
    language,
    onNavigate: navigate,
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >

      {/* Error message */}
      {apiError && (
        <div
          style={{
            background: '#FEE2E2',
            padding: '10px 20px',
            fontSize: 13,
            color: '#DC2626',
            borderBottom: '1px solid #FBBCBC',
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            zIndex: 999,
            boxSizing: 'border-box',
          }}
        >
          ⚠ {apiError}

          <span
            onClick={() => setApiError(null)}
            style={{
              float: 'right',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ✕
          </span>
        </div>
      )}

      {/* Splash */}
      {screen === 'splash' && (
        <SplashScreen
          onFinish={() => {
            setAuthMode('signup');
            setScreen('auth');
          }}
          onLogin={() => {
            setAuthMode('login');
            setScreen('auth');
          }}
          language={language}
        />
      )}

      {/* Authentication */}
      {screen === 'auth' && (
        <AuthScreen
          initialMode={authMode}
          onSuccess={() => setScreen('otp')}
          {...props}
        />
      )}

      {/* OTP */}
      {screen === 'otp' && (
        <OTPScreen
          onSuccess={() => setScreen('setup')}
          {...props}
        />
      )}

      {/* Setup */}
      {screen === 'setup' && (
        <SetupScreen
          onComplete={(data) => {
            setUser(data);
            setScreen('home');
          }}
          {...props}
        />
      )}

      {/* Home */}
      {screen === 'home' && (
        <HomeScreen
          user={user}
          history={history}
          {...props}
        />
      )}

      {/* Chat */}
      {screen === 'chat' && (
        <ChatScreen
          onBack={() => setScreen('home')}
          user={user}
          {...props}
        />
      )}

      {/* Check symptoms */}
      {screen === 'check' && (
        <CheckScreen
          onAnalyze={handleAnalyze}
          onBack={() => setScreen('home')}
          {...props}
        />
      )}

      {/* Analyzing */}
      {screen === 'analyzing' && (
        <AnalyzingScreen language={language} />
      )}

      {/* Results */}
      {screen === 'results' && currentResult && (
        <ResultsScreen
          result={currentResult}
          symptoms={currentSymptoms}
          onNewCheck={() => setScreen('check')}
          onSave={handleSaveResult}
          {...props}
        />
      )}

      {/* Teleconsult */}
      {screen === 'teleconsult' && (
        <TeleconsultScreen
          onBack={() => setScreen('results')}
          symptoms={currentSymptoms}
          {...props}
        />
      )}

      {/* Self Care */}
      {screen === 'selfcare' && (
        <SelfCareScreen
          onBack={() => setScreen('results')}
          symptoms={currentSymptoms}
          riskSummary={currentResult?.risk_summary}
          {...props}
        />
      )}

      {/* Nearby clinics */}
      {screen === 'nearby' && (
        <NearbyClinicScreen
          onBack={() => setScreen('results')}
          symptoms={currentSymptoms}
          riskLevel={currentResult?.risk_level}
          user={user}
          {...props}
        />
      )}

      {/* History */}
      {screen === 'history' && (
        <HistoryScreen
          history={history}
          onViewReport={(entry) => {
            setSelectedReport(entry);
            setScreen('report');
          }}
          {...props}
        />
      )}

      {/* Report */}
      {screen === 'report' && selectedReport && (
        <ReportScreen
          entry={selectedReport}
          onBack={() => setScreen('history')}
          {...props}
        />
      )}

      {/* Profile */}
      {screen === 'profile' && (
        <ProfileScreen
          user={user}
          onSignOut={() => {
            setUser(null);
            setScreen('splash');
          }}
          onLanguageChange={handleLanguageChange}
          onProfileImageUpdate={handleProfileImageUpdate}
          {...props}
        />
      )}

    </div>
  );
}