import { useState } from 'react';
import colors from '../colors';
import { HospitalIcon, StethoscopeIcon, RobotIcon } from '../components/Icons';
import translations from '../i18n';
import logo from '../assets/logo.png';

const ICONS = [HospitalIcon, StethoscopeIcon, RobotIcon];

export default function SplashScreen({ onFinish, onLogin, language = 'English' }) {
  const [current, setCurrent] = useState(0);
  const t = translations[language] || translations.English;

  const slides = [
    { title: t.slide1Title, subtitle: t.slide1Sub },
    { title: t.slide2Title, subtitle: t.slide2Sub },
    { title: t.slide3Title, subtitle: t.slide3Sub },
  ];

  const Icon = ICONS[current];

  const handleNext = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else onFinish();
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.surface, display: 'flex', flexDirection: 'column', padding: '40px 24px 48px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logo} alt="PreVita" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain' }} />
        <span style={{ fontSize: 20, fontWeight: 700, color: colors.primary }}>PreVita</span>
      </div>

      {/* Illustration */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 200, height: 200, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={90} color={colors.primary} />
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ height: 8, borderRadius: 99, width: i === current ? 24 : 8, background: i === current ? colors.warning : colors.border, transition: 'all 0.3s ease' }} />
        ))}
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 700, color: colors.textPrimary, textAlign: 'center', margin: '0 0 12px', lineHeight: 1.3 }}>
        {slides[current].title}
      </h2>
      <p style={{ fontSize: 15, color: colors.textSecondary, textAlign: 'center', margin: '0 0 40px', lineHeight: 1.6 }}>
        {slides[current].subtitle}
      </p>

      <button onClick={handleNext} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        {t.splashBtn}
      </button>
      <p style={{ textAlign: 'center', fontSize: 14, color: colors.textSecondary, margin: 0 }}>
        {t.splashLogin}{' '}
        <span onClick={onLogin} style={{ color: colors.warning, fontWeight: 600, cursor: 'pointer' }}>
          {t.splashLoginLink}
        </span>
      </p>
    </div>
  );
}