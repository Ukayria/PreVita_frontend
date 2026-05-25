import { useState } from 'react';
import colors from '../colors';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const TIPS_DATA = {
  Hydration: {
    icon: '💧',
    title: 'Drink water regularly',
    category: 'Hydration',
    short: '8-10 glasses per day. Warm water and teas help with congestion and fever.',
    description: 'Staying hydrated helps your body fight infection, regulate temperature, and flush out toxins.',
    steps: [
      'Start your morning with a full glass of warm water before any food',
      'Drink a glass every 1-2 hours throughout the day, set a reminder',
      'Add lemon or ginger to warm water to help with congestion and sore throat',
      'Avoid cold drinks, alcohol, and excess caffeine while sick, they dehydrate you',
    ],
    escalate: 'If you cannot keep fluids down for more than 6 hours or feel extremely dizzy, contact a doctor immediately.',
  },
  Rest: {
    icon: '😴',
    title: 'Eat light, warm meal',
    category: 'Rest',
    short: 'Soup, Pap and soft foods are easy to digest and keep energy up when appetite is low.',
    description: 'Your body needs energy from food even when you feel weak. Light meals are easier to digest.',
    steps: [
      'Eat small portions every 3-4 hours instead of large meals',
      'Try pap, oatmeal, or light soup with vegetables',
      'Avoid spicy, fried, or heavy foods that strain your digestive system',
      'Add protein like eggs or beans to help your body recover faster',
    ],
    escalate: 'If you cannot eat for more than 24 hours, seek medical attention.',
  },
  Nutrition: {
    icon: '🛏️',
    title: 'Rest and avoid exertion',
    category: 'Nutrition',
    short: 'Get at least 8 hours of sleep. Avoid strenuous activity until your fever breaks.',
    description: 'Rest allows your immune system to focus on fighting infection. Overexertion can worsen symptoms.',
    steps: [
      'Aim for at least 8-9 hours of sleep each night',
      'Avoid heavy physical work, exercise, or long commutes',
      'Keep your room cool and well-ventilated for better sleep quality',
      'Use a light blanket — heavy sweating can dehydrate you further',
    ],
    escalate: 'If fever persists beyond 3 days despite rest, visit a healthcare facility.',
  },
};

export default function SelfCareScreen({ onBack, onNavigate, language = 'English', symptoms = [], riskSummary = '' }) {
  const t = translations[language] || translations.English;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTip, setSelectedTip] = useState(null);
  const [done, setDone] = useState({});

  const categories = [t.all, t.hydration, t.rest, t.nutrition, t.medication];
  const tips = Object.values(TIPS_DATA);

  if (selectedTip) {
    const tip = TIPS_DATA[selectedTip];
    return (
      <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
        <div style={{ background: colors.primary, padding: '48px 20px 20px' }}>
          <button onClick={() => setSelectedTip(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>
            {tip.title === 'Drink water regularly' ? t.hydration + ' guide' : tip.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>Self-care · {symptoms.join(', ')}</p>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ background: colors.surface, borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: `1px solid ${colors.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{tip.icon}</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.primary, margin: '0 0 2px' }}>{tip.title}</p>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>Category: {tip.category}</p>
            </div>
          </div>

          <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 20 }}>{tip.description}</p>

          <p style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.howToDoIt}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {tip.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: colors.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}
          </div>

          <div style={{ background: colors.dangerTint, borderRadius: 12, padding: '14px 16px', marginBottom: 24, border: `1px solid ${colors.danger}33` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.danger, margin: '0 0 6px' }}>{t.whenToEscalate}</p>
            <p style={{ fontSize: 13, color: '#5C1010', margin: 0, lineHeight: 1.6 }}>{tip.escalate}</p>
          </div>

          <button onClick={() => { setDone(p => ({ ...p, [selectedTip]: true })); setSelectedTip(null); }} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12 }}>
            {t.markDone}
          </button>
          <button style={{ width: '100%', padding: 14, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.surface, color: colors.textPrimary, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {t.setReminder}
          </button>
        </div>
        <BottomNav active="check" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      <div style={{ background: colors.primary, padding: '48px 20px 20px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{t.selfCareTitle}</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>{t.basedOn} · {symptoms.join(', ')}</p>
      </div>

      <div style={{ padding: '20px' }}>
        {riskSummary && (
          <div style={{ background: colors.primaryTint, borderRadius: 12, padding: '12px 16px', marginBottom: 20, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.primary, margin: '0 0 4px' }}>Monitor and rest</p>
            <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{riskSummary}</p>
          </div>
        )}

        <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>{t.filterBy}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              padding: '7px 14px', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit',
              background: selectedCategory === cat ? colors.primary : colors.surface,
              color: selectedCategory === cat ? '#fff' : colors.textSecondary,
              border: `1.5px solid ${selectedCategory === cat ? colors.primary : colors.border}`,
              fontSize: 13, fontWeight: selectedCategory === cat ? 600 : 400,
            }}>{cat}</button>
          ))}
        </div>

        <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.recommendedForYou}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {tips.map((tip, i) => (
            <div key={i} onClick={() => setSelectedTip(Object.keys(TIPS_DATA)[i])} style={{
              background: colors.surface, borderRadius: 14, padding: '14px 16px',
              border: `1px solid ${done[Object.keys(TIPS_DATA)[i]] ? colors.primary : colors.border}`,
              cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{tip.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 4px' }}>{tip.title}</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.5 }}>{tip.short}</p>
              </div>
              {done[Object.keys(TIPS_DATA)[i]] && <span style={{ color: colors.primary, fontSize: 16 }}>✓</span>}
            </div>
          ))}
        </div>

        <button onClick={() => onNavigate('teleconsult')} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          {t.continueBtn}
        </button>
      </div>
      <BottomNav active="check" onNavigate={onNavigate} />
    </div>
  );
}