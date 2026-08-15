import { useState } from 'react';
import colors from '../colors';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

// const SYMPTOMS = [
//   'Fever', 'Headache', 'Cough', 'Body pain', 'Fatigue',
//   'Chills', 'Nausea', 'Diarrhea', 'Dizziness', 'Chest pain',
//   'Difficulty breathing', 'Loss of appetite', 'Rash',
//   'Abdominal pain', 'Excessive thirst', 'Rapid heartbeat',
// ];





export default function CheckScreen({ onAnalyze, onBack, onNavigate, language = 'English' }) {
  const t = translations[language] || translations.English;
  const [symptoms, setSymptoms] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');

  //new
const SYMPTOMS = [
  { key: 'fever', label: t.symptoms.fever },
  { key: 'headache', label: t.symptoms.headache },
  { key: 'cough', label: t.symptoms.cough },
  { key: 'bodyPain', label: t.symptoms.bodyPain },
  { key: 'fatigue', label: t.symptoms.fatigue },
  { key: 'chills', label: t.symptoms.chills },
  { key: 'nausea', label: t.symptoms.nausea },
  { key: 'diarrhea', label: t.symptoms.diarrhea },
  { key: 'dizziness', label: t.symptoms.dizziness },
  { key: 'chestPain', label: t.symptoms.chestPain },
  { key: 'difficultyBreathing', label: t.symptoms.difficultyBreathing },
  { key: 'lossOfAppetite', label: t.symptoms.lossOfAppetite },
  { key: 'rash', label: t.symptoms.rash },
  { key: 'abdominalPain', label: t.symptoms.abdominalPain },
  { key: 'excessiveThirst', label: t.symptoms.excessiveThirst },
  { key: 'rapidHeartbeat', label: t.symptoms.rapidHeartbeat },
];

  const toggle = (list, setList, val) =>
    setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const Chip = ({ label, selected, onClick, activeColor }) => (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 99, cursor: 'pointer',
      border: `1.5px solid ${selected ? (activeColor || colors.primary) : colors.border}`,
      background: selected ? (activeColor ? activeColor + '15' : colors.primaryTint) : colors.surface,
      color: selected ? (activeColor || colors.primary) : colors.textSecondary,
      fontSize: 14, fontWeight: selected ? 600 : 400, fontFamily: 'inherit',
    }}>{label}</button>
  );

  const BODY_PARTS = [
    { key: 'head', label: t.head }, { key: 'chest', label: t.chest },
    { key: 'stomach', label: t.stomach }, { key: 'joint', label: t.joint },
    { key: 'throat', label: t.throat }, { key: 'skin', label: t.skin },
  ];

  const DURATIONS = [
    { key: 'Today', label: t.today },
    { key: '2-3 days', label: t.twoDays },
    { key: '1 week+', label: t.oneWeek },
  ];

  const SEVERITIES = [
    { key: 'Mild',     label: t.mild,     color: colors.primary },
    { key: 'Moderate', label: t.moderate, color: colors.warning },
    { key: 'Severe',   label: t.severe,   color: colors.danger  },
  ];

  const canSubmit = symptoms.length > 0 && duration && severity;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 100 }}>
      {/* old */}
      {/* <div style={{ background: colors.primary, padding: '48px 24px 24px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>{t.checkSymptoms}</h2>
      </div> */}
      {/* old */}


{/* new */}
<div style={{
  background: colors.primary,
  padding: '48px 24px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}}>
  <button
    onClick={onBack}
    style={{
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: 20,
      cursor: 'pointer',
      padding: 0,
      lineHeight: 1,
    }}
  >
    ←
  </button>

  <h2 style={{
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  }}>
    {t.checkSymptoms}
  </h2>
</div>
{/* new */}
      <div style={{ padding: '20px' }}>
        {/* Symptoms */}
        {/* <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>{t.whatSymptoms}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SYMPTOMS.map(s => (
              <Chip key={s} label={s} selected={symptoms.includes(s)} onClick={() => toggle(symptoms, setSymptoms, s)} />
            ))}
          </div>
       
          {symptoms.length > 0 && (
            <p style={{ fontSize: 12, color: colors.primary, fontWeight: 600, margin: '10px 0 0' }}>
              ✓ {symptoms.length} {t.selected}
            </p>
          )}

        </div> */}

        {/* Symptoms */}
<div
  style={{
    background: colors.surface,
    borderRadius: 16,
    padding: '16px',
    marginBottom: 16,
    border: `1px solid ${colors.border}`,
  }}
>
  <p
    style={{
      fontSize: 15,
      fontWeight: 600,
      color: colors.textPrimary,
      margin: '0 0 12px',
    }}
  >
    {t.whatSymptoms}
  </p>

  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {SYMPTOMS.map((s) => (
      <Chip
        key={s.key}
        label={s.label}
        selected={symptoms.includes(s.key)}
        onClick={() => toggle(symptoms, setSymptoms, s.key)}
      />
    ))}
  </div>

  {symptoms.length > 0 && (
    <p
      style={{
        fontSize: 12,
        color: colors.primary,
        fontWeight: 600,
        margin: '10px 0 0',
      }}
    >
      ✓ {symptoms.length} {t.selected}
    </p>
  )}
</div>

        {/* Body parts */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>{t.whereFeelIt}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BODY_PARTS.map(b => (
              <Chip key={b.key} label={b.label} selected={bodyParts.includes(b.key)} onClick={() => toggle(bodyParts, setBodyParts, b.key)} />
            ))}
          </div>
        </div>

        {/* Duration */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>{t.howLong}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DURATIONS.map(d => (
              <Chip key={d.key} label={d.label} selected={duration === d.key} onClick={() => setDuration(d.key)} />
            ))}
          </div>
        </div>

        {/* Severity */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 24, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>{t.severity}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {SEVERITIES.map(s => (
              <Chip key={s.key} label={s.label} selected={severity === s.key} activeColor={s.color} onClick={() => setSeverity(s.key)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
            {['#4CAF73','#8BC34A','#FFC107','#FF9800','#F44336','#D32F2F'].map((c, i) => (
              <div key={i} style={{ flex: 1, height: 6, borderRadius: 99, background: c }} />
            ))}
          </div>
        </div>

        <button onClick={() => onAnalyze({ symptoms, bodyParts, duration, severity })} disabled={!canSubmit} style={{
          width: '100%', padding: 16, borderRadius: 12, border: 'none',
          background: canSubmit ? colors.primary : colors.border,
          color: canSubmit ? '#fff' : colors.textLight,
          fontSize: 16, fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
        }}>
          {t.analyseBtn}
        </button>
      </div>

      {/* <BottomNav active="check" onNavigate={onNavigate} /> */}
      {/* new */}
      <BottomNav
  active="check"
  onNavigate={onNavigate}
  language={language}
/>
    </div>
  );
}