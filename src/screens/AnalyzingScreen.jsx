import { useEffect, useState } from 'react';
import colors from '../colors';
import translations from '../i18n';

export default function AnalyzingScreen({ language = 'English' }) {
  const t = translations[language] || translations.English;
  const steps = [t.step1, t.step2, t.step3, t.step4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(p => (p < steps.length - 1 ? p + 1 : p));
    }, 1000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div style={{ minHeight: '100vh', background: colors.surface, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      `}</style>

      <div style={{ width: 90, height: 90, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, animation: 'pulse 2s ease-in-out infinite' }}>
        <div style={{ width: 48, height: 48, border: `4px solid ${colors.primary}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px', textAlign: 'center' }}>
        {t.analyzingTitle}
      </h2>
      <p style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', margin: '0 0 12px', lineHeight: 1.6 }}>
        {t.analyzingDesc}
      </p>
      <p style={{ fontSize: 13, color: colors.textLight, marginBottom: 40 }}>{t.analyzingNote}</p>

      <div style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: i < current ? colors.primary : i === current ? colors.primaryTint : colors.background,
              color: i < current ? '#fff' : i === current ? colors.primary : colors.textLight,
              border: `2px solid ${i <= current ? colors.primary : colors.border}`,
              transition: 'all 0.4s ease',
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 14, fontWeight: i === current ? 600 : 400, color: i <= current ? colors.textPrimary : colors.textLight, transition: 'all 0.3s' }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}