import colors from '../colors';
import { CheckIcon, HistoryIcon, ProfileIcon } from '../components/Icons';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const ALL_TIPS = [
  'Drink at least 8 glasses of water daily to support kidney function.',
  'Get 7–8 hours of sleep — your body heals while you rest.',
  'Wash your hands frequently — it prevents 80% of common infections.',
  'Check your blood pressure regularly, even if you feel fine.',
  'Reduce salt intake to lower your risk of hypertension.',
  'Use mosquito nets and repellents every night to prevent malaria.',
  'Eat iron-rich foods like beans and leafy greens to prevent anaemia.',
  'Any fever lasting more than 3 days needs professional attention.',
  'Limit sugar intake — diabetes rates are rising across Africa.',
  'Do routine malaria and typhoid tests, even without symptoms.',
  'Talk to someone you trust about how you feel — mental health matters.',
  'Visit a clinic at least once a year for a routine check-up.',
  'Complete your full course of antibiotics — never stop early.',
  'Eat breakfast — it stabilises blood sugar and improves focus.',
  'Breathe fresh air — avoid poorly ventilated spaces.',
];

function getDailyTip() {
  const seed = new Date().getDay() + new Date().getDate();
  return ALL_TIPS[seed % ALL_TIPS.length];
}

export default function HomeScreen({ user, onNavigate, language = 'English', history = [] }) {
  const t = translations[language] || translations.English;
  const name = user?.fullName?.split(' ')[0] || 'there';
  const tip = getDailyTip();
  const recent = history.slice(0, 2);

  const riskColor = {
    Low: colors.primary,
    Medium: '#8B5E00',
    High: colors.danger,
  };

  const quickActions = [
    { label: t.symptomCheck,  screen: 'check',   bg: '#E8F5EE', color: colors.primary, Icon: CheckIcon   },
    { label: t.medications,   screen: 'home',    bg: '#FEF3D9', color: '#8B5E00',      emoji: '💊'       },
    { label: t.healthHistory, screen: 'history', bg: '#E3F2FD', color: '#1565C0',      Icon: HistoryIcon },
    { label: t.findCare,      screen: 'nearby',  bg: '#FDE8E8', color: colors.danger,  emoji: '🏥'       },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: colors.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <ProfileIcon size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                {t.hi}, {name}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>{t.howFeeling}</p>
            </div>
          </div>
          <button onClick={() => {}} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>

        {/* Start Chat card */}
        <div onClick={() => onNavigate('chat')} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 16px', marginTop: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div>
            <p style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 3px' }}>{t.notFeeling}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0 }}>{t.tapToDescribe}</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ color: colors.primary, fontSize: 13, fontWeight: 700 }}>{t.startChat}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Quick Actions */}
        <p style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, margin: '0 0 14px' }}>{t.quickActions}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {quickActions.map(({ label, screen, bg, color, Icon, emoji }) => (
            <div key={label} onClick={() => onNavigate(screen)} style={{ background: bg, borderRadius: 16, padding: '18px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon ? <Icon size={22} color={color} /> : <span style={{ fontSize: 20 }}>{emoji}</span>}
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Consultations */}
        <p style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, margin: '0 0 12px' }}>{t.recentConsultations}</p>
        <div style={{ background: colors.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}`, marginBottom: 20 }}>
          {recent.length === 0 ? (
            <div style={{ padding: '20px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: colors.textLight, margin: 0 }}>{t.noRecent}</p>
            </div>
          ) : (
            recent.map((entry, i) => (
              <div key={entry.id} onClick={() => onNavigate('history')} style={{ padding: '14px 16px', cursor: 'pointer', borderBottom: i < recent.length - 1 ? `1px solid ${colors.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 3px' }}>
                    {entry.symptoms?.slice(0, 2).join(', ')}
                  </p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
                    {new Date(entry.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })} · {entry.result?.risk_level} risk
                  </p>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: (riskColor[entry.result?.risk_level] || colors.primary) + '20', color: riskColor[entry.result?.risk_level] || colors.primary }}>
                  {entry.result?.risk_level}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Health tip */}
        <p style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, margin: '0 0 12px' }}>{t.healthTip}</p>
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>💡</span>
          </div>
          <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{tip}</p>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
